package com.project.myapp.repository;

import com.project.myapp.domain.Startups;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Startups entity.
 */
@Repository
public interface StartupsRepository extends JpaRepository<Startups, Long> {
    Optional<Startups> findByCorreoElectronico(String correoElectronico);

    @Transactional
    @Modifying
    @Query("UPDATE Startups C SET C.estado = ?2 WHERE C.id = ?1")
    void updateStartupsEstado(Long id, String estado);
}
