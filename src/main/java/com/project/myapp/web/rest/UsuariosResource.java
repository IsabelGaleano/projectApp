package com.project.myapp.web.rest;

import com.project.myapp.domain.User;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.UserRepository;
import com.project.myapp.repository.UsuariosRepository;
import com.project.myapp.security.AuthoritiesConstants;
import com.project.myapp.sendgrid.SendEmail;
import com.project.myapp.service.UserService;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.project.myapp.web.rest.errors.UserNotFoundedError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Usuarios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UsuariosResource {

    private final Logger log = LoggerFactory.getLogger(UsuariosResource.class);

    private static final String ENTITY_NAME = "usuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuariosRepository usuariosRepository;

    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;

    private UserService userService;

    public UsuariosResource(UsuariosRepository usuariosRepository, PasswordEncoder passwordEncoder, UserRepository userRepository, UserService userService) {
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /usuarios} : Create a new usuarios.
     *
     * @param usuarios the usuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuarios, or with status {@code 400 (Bad Request)} if the usuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuarios")
    public ResponseEntity<Usuarios> createUsuarios(@Valid @RequestBody Usuarios usuarios) throws URISyntaxException {
        log.debug("REST request to save Usuarios : {}", usuarios);
        if (usuarios.getId() != null) {
            throw new BadRequestAlertException("A new usuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Usuarios result = usuariosRepository.save(usuarios);
        return ResponseEntity
            .created(new URI("/api/usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuarios/:id} : Updates an existing usuarios.
     *
     * @param id the id of the usuarios to save.
     * @param usuarios the usuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarios,
     * or with status {@code 400 (Bad Request)} if the usuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuarios> updateUsuarios(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Usuarios usuarios
    ) throws URISyntaxException {
        log.debug("REST request to update Usuarios : {}, {}", id, usuarios);
        if (usuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuariosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Usuarios result = usuariosRepository.save(usuarios);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /usuarios/:id} : Partial updates given fields of an existing usuarios, field will ignore if it is null
     *
     * @param id the id of the usuarios to save.
     * @param usuarios the usuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarios,
     * or with status {@code 400 (Bad Request)} if the usuarios is not valid,
     * or with status {@code 404 (Not Found)} if the usuarios is not found,
     * or with status {@code 500 (Internal Server Error)} if the usuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/usuarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Usuarios> partialUpdateUsuarios(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Usuarios usuarios
    ) throws URISyntaxException {
        log.debug("REST request to partial update Usuarios partially : {}, {}", id, usuarios);
        if (usuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuariosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Usuarios> result = usuariosRepository
            .findById(usuarios.getId())
            .map(existingUsuarios -> {
                if (usuarios.getNombre() != null) {
                    existingUsuarios.setNombre(usuarios.getNombre());
                }
                if (usuarios.getCedula() != null) {
                    existingUsuarios.setCedula(usuarios.getCedula());
                }
                if (usuarios.getPrimerApellido() != null) {
                    existingUsuarios.setPrimerApellido(usuarios.getPrimerApellido());
                }
                if (usuarios.getSegundoApellido() != null) {
                    existingUsuarios.setSegundoApellido(usuarios.getSegundoApellido());
                }
                if (usuarios.getCorreoElectronico() != null) {
                    existingUsuarios.setCorreoElectronico(usuarios.getCorreoElectronico());
                }
                if (usuarios.getGenero() != null) {
                    existingUsuarios.setGenero(usuarios.getGenero());
                }
                if (usuarios.getTelefono() != null) {
                    existingUsuarios.setTelefono(usuarios.getTelefono());
                }
                if (usuarios.getFechaNacimiento() != null) {
                    existingUsuarios.setFechaNacimiento(usuarios.getFechaNacimiento());
                }
                if (usuarios.getLatitudDireccion() != null) {
                    existingUsuarios.setLatitudDireccion(usuarios.getLatitudDireccion());
                }
                if (usuarios.getLongitudDireccion() != null) {
                    existingUsuarios.setLongitudDireccion(usuarios.getLongitudDireccion());
                }
                if (usuarios.getImagenURL() != null) {
                    existingUsuarios.setImagenURL(usuarios.getImagenURL());
                }
                if (usuarios.getTipoUsuarioFinal() != null) {
                    existingUsuarios.setTipoUsuarioFinal(usuarios.getTipoUsuarioFinal());
                }
                if (usuarios.getContrasennia() != null) {
                    existingUsuarios.setContrasennia(usuarios.getContrasennia());
                }
                if (usuarios.getEstado() != null) {
                    existingUsuarios.setEstado(usuarios.getEstado());
                }

                return existingUsuarios;
            })
            .map(usuariosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuarios.getId().toString())
        );
    }

    /**
     * {@code GET  /usuarios} : get all the usuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarios in body.
     */
    @GetMapping("/usuarios")
    public List<Usuarios> getAllUsuarios() {
        log.debug("REST request to get all Usuarios");
        return usuariosRepository.findAll();
    }

    /**
     * {@code GET  /usuarios/:id} : get the "id" usuarios.
     *
     * @param id the id of the usuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuarios> getUsuarios(@PathVariable Long id) {
        log.debug("REST request to get Usuarios : {}", id);
        Optional<Usuarios> usuarios = usuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuarios);
    }

    @GetMapping("/usuariosByCorreo/{correo}")
    public ResponseEntity<Usuarios> getUsuariosByCorrreo(@PathVariable String correo) {
        log.debug("REST request to get Usuarios : {}", correo);
        Optional<Usuarios> usuarios = usuariosRepository.getUsuariosByCorreoElectronico(correo);
        return ResponseUtil.wrapOrNotFound(usuarios);
    }

    /**
     * {@code DELETE  /usuarios/:id} : delete the "id" usuarios.
     *
     * @param id the id of the usuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuarios(@PathVariable Long id) {
        log.debug("REST request to delete Usuarios : {}", id);
        usuariosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/usuarios/resetPassword")
    public User resetPassword(@Valid @RequestBody Usuarios userToUpdate) {
        User finalUpdatedUser = new User();
        String encryptedPassword = passwordEncoder.encode(userToUpdate.getContrasennia());
        if (userRepository.findOneByEmailIgnoreCase(userToUpdate.getCorreoElectronico()).isPresent()) {
            finalUpdatedUser = userRepository.findOneByEmail(userToUpdate.getCorreoElectronico());
            finalUpdatedUser.setPassword(encryptedPassword);
            userRepository.save(finalUpdatedUser);
            userService.clearUserCaches(finalUpdatedUser);
            return finalUpdatedUser;
        }
        else {
            throw new UserNotFoundedError();
        }
    }


}
