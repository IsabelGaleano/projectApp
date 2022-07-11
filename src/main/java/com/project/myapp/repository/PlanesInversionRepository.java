package com.project.myapp.repository;

import com.project.myapp.domain.PlanesInversion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PlanesInversion entity.
 */
@Repository
public interface PlanesInversionRepository extends JpaRepository<PlanesInversion, Long> {
    default Optional<PlanesInversion> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<PlanesInversion> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<PlanesInversion> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct planesInversion from PlanesInversion planesInversion left join fetch planesInversion.idStartup",
        countQuery = "select count(distinct planesInversion) from PlanesInversion planesInversion"
    )
    Page<PlanesInversion> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct planesInversion from PlanesInversion planesInversion left join fetch planesInversion.idStartup")
    List<PlanesInversion> findAllWithToOneRelationships();

    @Query(
        "select planesInversion from PlanesInversion planesInversion left join fetch planesInversion.idStartup where planesInversion.id =:id"
    )
    Optional<PlanesInversion> findOneWithToOneRelationships(@Param("id") Long id);
}
