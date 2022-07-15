package com.project.myapp.service;

import com.project.myapp.domain.Authority;
import com.project.myapp.domain.User;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.AuthorityRepository;
import com.project.myapp.repository.UserRepository;
import com.project.myapp.repository.UsuariosRepository;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.security.RandomUtil;

@Service
@Transactional
public class UsuariosService {

    private final Logger log = LoggerFactory.getLogger(UsuariosService.class);

    private final UsuariosRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthorityRepository authorityRepository;

    private final CacheManager cacheManager;

    public UsuariosService(
        UsuariosRepository usuariosRepository,
        PasswordEncoder passwordEncoder,
        AuthorityRepository authorityRepository,
        CacheManager cacheManager
    ) {
        this.usuarioRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.cacheManager = cacheManager;
    }

    public Usuarios createUsuarioFinal(Usuarios usuarioP) {
        Usuarios usuario = new Usuarios();
        usuario.setNombre(usuario.getNombre());
        usuario.setCedula(usuarioP.getCedula());
        usuario.setPrimerApellido(usuarioP.getPrimerApellido());
        usuario.setSegundoApellido(usuarioP.getSegundoApellido());
        usuario.setCorreoElectronico(usuarioP.getCorreoElectronico());
        usuario.setGenero(usuarioP.getGenero());
        usuario.setTelefono(usuarioP.getTelefono());
        usuario.setFechaNacimiento(usuarioP.getFechaNacimiento());
        usuario.setLatitudDireccion(usuarioP.getLongitudDireccion());
        usuario.setLongitudDireccion(usuarioP.getLongitudDireccion());
        usuario.setImagenURL(usuarioP.getImagenURL());
        usuario.setTipoUsuarioFinal(usuarioP.getTipoUsuarioFinal());
        //        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        //        usuario.setContrasennia(encryptedPassword);
        usuario.setContrasennia(usuarioP.getContrasennia());
        usuario.setEstado(usuarioP.getEstado());
        usuario.setIdMonedero(usuarioP.getIdMonedero());
        usuario.setIdRol(usuarioP.getIdRol());
        usuarioRepository.save(usuario);
        log.debug("Created Information for User: {}", usuario);
        return usuario;
    }
}
