package com.project.myapp.repository;

import com.project.myapp.domain.Reuniones;
import java.util.List;
import java.util.Optional;
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
}
