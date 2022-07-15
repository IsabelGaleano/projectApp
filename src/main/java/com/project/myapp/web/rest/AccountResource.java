package com.project.myapp.web.rest;

import com.project.myapp.domain.*;
import com.project.myapp.domain.Startups;
import com.project.myapp.domain.User;
import com.project.myapp.repository.CodigosRepository;
import com.project.myapp.repository.MonederosRepository;
import com.project.myapp.repository.StartupsRepository;
import com.project.myapp.repository.UserRepository;
import com.project.myapp.repository.UsuariosRepository;
import com.project.myapp.security.SecurityUtils;
import com.project.myapp.sendgrid.SendEmail;
import com.project.myapp.service.UserService;
import com.project.myapp.service.dto.AdminUserDTO;
import com.project.myapp.service.dto.PasswordChangeDTO;
import com.project.myapp.web.rest.errors.*;
import com.project.myapp.web.rest.vm.KeyAndPasswordVM;
import com.project.myapp.web.rest.vm.ManagedUserVM;
import java.text.DecimalFormat;
import java.time.ZonedDateTime;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {

        private AccountResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;
    private final StartupsRepository startupsRepository;

    private final UsuariosRepository usuariosRepository;

    private final CodigosRepository codigosRepository;

    private final MonederosRepository monederosRepository;

    private final UserService userService;

    public AccountResource(
        UserRepository userRepository,
        UserService userService,
        UsuariosRepository usuariosRepository,
        CodigosRepository codigosRepository,
        MonederosRepository monederosRepository,
        StartupsRepository startupsRepository
    ) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.usuariosRepository = usuariosRepository;
        this.codigosRepository = codigosRepository;
        this.monederosRepository = monederosRepository;
        this.startupsRepository = startupsRepository;
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
        SendEmail sendEmail = new SendEmail();
        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        Monederos monedero = new Monederos("USUARIO", 0.0, "Activo");
        Monederos monederoCreado = monederosRepository.save(monedero);
        Usuarios usuario = new Usuarios(
            " ",
            user.getLogin(),
            " ",
            " ",
            user.getEmail(),
            " ",
            " ",
            ZonedDateTime.now(),
            " ",
            " ",
            " ",
            "UsuarioFinal",
            managedUserVM.getPassword(),
            "Pendiente",
            monederoCreado,
            new RolesUsuarios(3L)
        );
        String codigo = generateOTP();
        Codigos codigoDTO = new Codigos(codigo, "Activo", usuario);
        sendEmail.correoVerificacionUsuario(Integer.parseInt(codigo), usuario.getCorreoElectronico());
        usuariosRepository.save(usuario);
        codigosRepository.save(codigoDTO);
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/registerStartup")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccountStartup(@Valid @RequestBody ManagedUserVM managedUserVM) {
        if (isPasswordLengthInvalid(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerStartup(managedUserVM, managedUserVM.getPassword());
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(managedUserVM.getEmail());
        if (startups.isEmpty()) {
            Startups startupsSave = new Startups();
            startupsSave.setCorreoElectronico(managedUserVM.getEmail());
            startupsSave.setNombreCorto(managedUserVM.getLogin());
            startupsRepository.save(startupsSave);
        }
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be activated.
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this activation key");
        }
    }

    /**
     * {@code GET  /authenticate} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    public AdminUserDTO getAccount() {
        return userService
            .getUserWithAuthorities()
            .map(AdminUserDTO::new)
            .orElseThrow(() -> new AccountResourceException("User could not be found"));
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {
        String userLogin = SecurityUtils
            .getCurrentUserLogin()
            .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getLogin().equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(
            userDTO.getFirstName(),
            userDTO.getLastName(),
            userDTO.getEmail(),
            userDTO.getLangKey(),
            userDTO.getImageUrl()
        );
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
        Optional<User> user = userService.requestPasswordReset(mail);
        if (user.isPresent()) {} else {
            // Pretend the request has been successful to prevent checking which emails really exist
            // but log that an invalid attempt has been made
            log.warn("Password reset requested for non existing mail");
        }
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this reset key");
        }
    }

    private static boolean isPasswordLengthInvalid(String password) {
        return (
            StringUtils.isEmpty(password) ||
            password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH ||
            password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH
        );
    }

    public String generateOTP() {
        return new DecimalFormat("000000").format(new Random().nextInt(999999));
    }
}
