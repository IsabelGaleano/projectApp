package com.project.myapp.repository;

import com.project.myapp.domain.Usuarios;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Usuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    public Optional<Usuarios> getUsuariosByCorreoElectronico(String correo);
}
