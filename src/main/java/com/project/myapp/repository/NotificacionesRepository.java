package com.project.myapp.repository;

import com.project.myapp.domain.Notificaciones;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Notificaciones entity.
 */
@Repository
public interface NotificacionesRepository extends JpaRepository<Notificaciones, Long> {
    default Optional<Notificaciones> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Notificaciones> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Notificaciones> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct notificaciones from Notificaciones notificaciones left join fetch notificaciones.idStartup left join fetch notificaciones.idUsuario",
        countQuery = "select count(distinct notificaciones) from Notificaciones notificaciones"
    )
    Page<Notificaciones> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct notificaciones from Notificaciones notificaciones left join fetch notificaciones.idStartup left join fetch notificaciones.idUsuario"
    )
    List<Notificaciones> findAllWithToOneRelationships();

    @Query(
        "select notificaciones from Notificaciones notificaciones left join fetch notificaciones.idStartup left join fetch notificaciones.idUsuario where notificaciones.id =:id"
    )
    Optional<Notificaciones> findOneWithToOneRelationships(@Param("id") Long id);
}
