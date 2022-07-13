package com.project.myapp.repository;

import com.project.myapp.domain.Documentos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Documentos entity.
 */
@Repository
public interface DocumentosRepository extends JpaRepository<Documentos, Long> {
    default Optional<Documentos> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Documentos> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Documentos> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct documentos from Documentos documentos left join fetch documentos.idStartup left join fetch documentos.idUsuario",
        countQuery = "select count(distinct documentos) from Documentos documentos"
    )
    Page<Documentos> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct documentos from Documentos documentos left join fetch documentos.idStartup left join fetch documentos.idUsuario"
    )
    List<Documentos> findAllWithToOneRelationships();

    @Query(
        "select documentos from Documentos documentos left join fetch documentos.idStartup left join fetch documentos.idUsuario where documentos.id =:id"
    )
    Optional<Documentos> findOneWithToOneRelationships(@Param("id") Long id);
}
