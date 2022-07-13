package com.project.myapp.repository;

import com.project.myapp.domain.Facturas;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Facturas entity.
 */
@Repository
public interface FacturasRepository extends JpaRepository<Facturas, Long> {
    default Optional<Facturas> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Facturas> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Facturas> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct facturas from Facturas facturas left join fetch facturas.idStartup left join fetch facturas.idUsuario",
        countQuery = "select count(distinct facturas) from Facturas facturas"
    )
    Page<Facturas> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct facturas from Facturas facturas left join fetch facturas.idStartup left join fetch facturas.idUsuario")
    List<Facturas> findAllWithToOneRelationships();

    @Query(
        "select facturas from Facturas facturas left join fetch facturas.idStartup left join fetch facturas.idUsuario where facturas.id =:id"
    )
    Optional<Facturas> findOneWithToOneRelationships(@Param("id") Long id);
}
