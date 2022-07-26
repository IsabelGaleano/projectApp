package com.project.myapp.repository;

import com.project.myapp.domain.DonacionesPaquetes;
import com.project.myapp.domain.PlanesInversion;
import com.project.myapp.domain.Startups;
import com.project.myapp.domain.Usuarios;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DonacionesPaquetes entity.
 */
@Repository
public interface DonacionesPaquetesRepository extends JpaRepository<DonacionesPaquetes, Long> {
    List<DonacionesPaquetes> findDonacionesPaquetesByIdStartup(Optional<Startups> idStartup);

    List<DonacionesPaquetes> findDonacionesPaquetesByIdUsuario(Optional<Usuarios> idUsuario);

    default Optional<DonacionesPaquetes> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<DonacionesPaquetes> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<DonacionesPaquetes> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct donacionesPaquetes from DonacionesPaquetes donacionesPaquetes left join fetch donacionesPaquetes.idStartup left join fetch donacionesPaquetes.idUsuario",
        countQuery = "select count(distinct donacionesPaquetes) from DonacionesPaquetes donacionesPaquetes"
    )
    Page<DonacionesPaquetes> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct donacionesPaquetes from DonacionesPaquetes donacionesPaquetes left join fetch donacionesPaquetes.idStartup left join fetch donacionesPaquetes.idUsuario"
    )
    List<DonacionesPaquetes> findAllWithToOneRelationships();

    @Query(
        "select donacionesPaquetes from DonacionesPaquetes donacionesPaquetes left join fetch donacionesPaquetes.idStartup left join fetch donacionesPaquetes.idUsuario where donacionesPaquetes.id =:id"
    )
    Optional<DonacionesPaquetes> findOneWithToOneRelationships(@Param("id") Long id);
}
