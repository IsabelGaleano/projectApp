package com.project.myapp.repository;

import com.project.myapp.domain.Inscripciones;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Inscripciones entity.
 */
@Repository
public interface InscripcionesRepository extends JpaRepository<Inscripciones, Long> {
    default Optional<Inscripciones> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Inscripciones> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Inscripciones> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripciones from Inscripciones inscripciones left join fetch inscripciones.idStartup",
        countQuery = "select count(distinct inscripciones) from Inscripciones inscripciones"
    )
    Page<Inscripciones> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct inscripciones from Inscripciones inscripciones left join fetch inscripciones.idStartup")
    List<Inscripciones> findAllWithToOneRelationships();

    @Query("select inscripciones from Inscripciones inscripciones left join fetch inscripciones.idStartup where inscripciones.id =:id")
    Optional<Inscripciones> findOneWithToOneRelationships(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Inscripciones C SET C.estado = ?2 WHERE C.id = ?1")
    void updateInscripcionesEstado(Long id, String estado);
}
