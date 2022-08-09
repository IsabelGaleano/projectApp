package com.project.myapp.repository;

import com.project.myapp.domain.Reuniones;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Reuniones entity.
 */
@Repository
public interface ReunionesRepository extends JpaRepository<Reuniones, Long> {
    default Optional<Reuniones> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Reuniones> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Reuniones> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct reuniones from Reuniones reuniones left join fetch reuniones.idStartup left join fetch reuniones.idUsuario",
        countQuery = "select count(distinct reuniones) from Reuniones reuniones"
    )
    Page<Reuniones> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct reuniones from Reuniones reuniones left join fetch reuniones.idStartup left join fetch reuniones.idUsuario")
    List<Reuniones> findAllWithToOneRelationships();

    @Query(
        "select reuniones from Reuniones reuniones left join fetch reuniones.idStartup left join fetch reuniones.idUsuario where reuniones.id =:id"
    )
    Optional<Reuniones> findOneWithToOneRelationships(@Param("id") Long id);

    @Query("SELECT R FROM Reuniones R WHERE R.idUsuario.id = ?1")
    List<Reuniones> GetByUsuarioId(Long idUsuario);

    @Transactional
    @Modifying
    @Query("UPDATE Reuniones R SET R.estado = ?2 WHERE R.id = ?1")
    void actualizarEstadoReunion(Long idReunion, String estado);

    @Transactional
    @Modifying
    @Query("UPDATE Reuniones R SET R.estado = ?2, R.fechaReunion = R.fechaSolicitada WHERE R.id = ?1")
    void aceptarReunion(Long idReunion, String estado);
}
