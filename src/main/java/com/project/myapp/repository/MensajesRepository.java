package com.project.myapp.repository;

import com.project.myapp.domain.Mensajes;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Mensajes entity.
 */
@Repository
public interface MensajesRepository extends JpaRepository<Mensajes, Long> {
    default Optional<Mensajes> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Mensajes> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Mensajes> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct mensajes from Mensajes mensajes left join fetch mensajes.idStartup left join fetch mensajes.idUsuario",
        countQuery = "select count(distinct mensajes) from Mensajes mensajes"
    )
    Page<Mensajes> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct mensajes from Mensajes mensajes left join fetch mensajes.idStartup left join fetch mensajes.idUsuario")
    List<Mensajes> findAllWithToOneRelationships();

    @Query(
        "select mensajes from Mensajes mensajes left join fetch mensajes.idStartup left join fetch mensajes.idUsuario where mensajes.id =:id"
    )
    Optional<Mensajes> findOneWithToOneRelationships(@Param("id") Long id);
}
