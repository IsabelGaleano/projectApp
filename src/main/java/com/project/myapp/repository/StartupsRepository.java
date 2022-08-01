package com.project.myapp.repository;

import com.project.myapp.domain.Startups;
import java.util.List;
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

    Startups findStartupsByCorreoElectronico(String correoElectronico);

    List<Startups> findStartupsByNombreCortoContains(String nombre);

    @Transactional
    @Modifying
    @Query("UPDATE Startups C SET C.estado = ?2 WHERE C.id = ?1")
    void updateStartupsEstado(Long id, String estado);

    // // @Query("SELECT S FROM Startups S LEFT JOIN Categorias C ON S.idCategoria = C.id AND S.estado = 'Activo'")
    // @Query("SELECT S FROM Startups S JOIN Categorias C ON S.idCategoria = C.id AND S.estado = 'Activo'")
    // List findAllWithCategories();
    @Query("SELECT S FROM Startups S WHERE S.estado = 'Activo'")
    List findAllWithCategories();

    @Query("SELECT COUNT(S.id) FROM Startups S JOIN Categorias C ON S.idCategoria = C.id WHERE C.categoria = ?1 AND S.estado = 'Activo'")
    int countStartupsByCategory(String categoria);

    @Query("SELECT S FROM Startups S LEFT JOIN Categorias C ON S.idCategoria = C.id WHERE C.categoria = ?1 AND S.estado = 'Activo'")
    List startupsPorCategoria(String categoria);
}
