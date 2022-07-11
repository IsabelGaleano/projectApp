package com.project.myapp.repository;

import com.project.myapp.domain.Comentarios;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Comentarios entity.
 */
@Repository
public interface ComentariosRepository extends JpaRepository<Comentarios, Long> {
    default Optional<Comentarios> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Comentarios> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Comentarios> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct comentarios from Comentarios comentarios left join fetch comentarios.idStartup left join fetch comentarios.idUsuario",
        countQuery = "select count(distinct comentarios) from Comentarios comentarios"
    )
    Page<Comentarios> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct comentarios from Comentarios comentarios left join fetch comentarios.idStartup left join fetch comentarios.idUsuario"
    )
    List<Comentarios> findAllWithToOneRelationships();

    @Query(
        "select comentarios from Comentarios comentarios left join fetch comentarios.idStartup left join fetch comentarios.idUsuario where comentarios.id =:id"
    )
    Optional<Comentarios> findOneWithToOneRelationships(@Param("id") Long id);
}
