package com.project.myapp.repository;

import com.project.myapp.domain.Codigos;
import com.project.myapp.domain.Usuarios;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Usuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    public Optional<Usuarios> getUsuariosByCorreoElectronico(String correo);

    Usuarios findOneBycorreoElectronicoIgnoreCase(String correoElectronico);

    @Query("SELECT C FROM Usuarios C WHERE C.correoElectronico LIKE %?1%")
    Optional<Usuarios> findByCorreoElectronico(String correoElectronico);

    @Transactional
    @Modifying
    @Query("UPDATE Usuarios C SET C.contrasennia=?1 WHERE C.correoElectronico LIKE ?2")
    void updateContrasenniaUsuarios(String nuevaContrasennia, String correoElectronico);

    // @Transactional
    // @Modifying(flushAutomatically = true)
    // @Query("UPDATE User a SET a.activeStatus=?1 WHERE a.username=?2")
    // int setUserActiveStatusFlag(int activeStatus,String username);

    //     @Query("update User u set u.firstname = ?1 where u.lastname = ?2")
    // int setFixedFirstnameFor(String firstname, String lastname);

    @Transactional
    @Modifying
    @Query("UPDATE Usuarios C SET C.estado = ?2 WHERE C.correoElectronico LIKE ?1")
    void updateUserActivated(String email, String activated);

    @Transactional
    @Modifying
    @Query("UPDATE Usuarios U SET U.imagenURL = ?2 WHERE U.correoElectronico LIKE ?1")
    int updateImagenURL(String correoUsuario, String imagenURL);

    @Query(value = "SELECT C FROM Usuarios C WHERE C.nombre LIKE %?1% OR C.primerApellido LIKE %?1% OR C.segundoApellido LIKE %?1%")
    List<Usuarios> findText(String nombre);
}
