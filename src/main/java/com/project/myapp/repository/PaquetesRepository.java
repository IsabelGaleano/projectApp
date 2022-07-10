package com.project.myapp.repository;

import com.project.myapp.domain.Paquetes;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Paquetes entity.
 */
@Repository
public interface PaquetesRepository extends JpaRepository<Paquetes, Long> {
    default Optional<Paquetes> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Paquetes> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Paquetes> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct paquetes from Paquetes paquetes left join fetch paquetes.idStartup",
        countQuery = "select count(distinct paquetes) from Paquetes paquetes"
    )
    Page<Paquetes> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct paquetes from Paquetes paquetes left join fetch paquetes.idStartup")
    List<Paquetes> findAllWithToOneRelationships();

    @Query("select paquetes from Paquetes paquetes left join fetch paquetes.idStartup where paquetes.id =:id")
    Optional<Paquetes> findOneWithToOneRelationships(@Param("id") Long id);
}
