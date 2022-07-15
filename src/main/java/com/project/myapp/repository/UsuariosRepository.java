package com.project.myapp.repository;

import com.project.myapp.domain.Usuarios;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Usuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    // public abstract  java.util.Optional<T> findById(ID id);

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
}
