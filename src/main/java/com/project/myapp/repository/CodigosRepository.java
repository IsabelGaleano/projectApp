package com.project.myapp.repository;

import com.project.myapp.domain.Codigos;
import com.project.myapp.domain.Usuarios;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Codigos entity.
 */
@Repository
public interface CodigosRepository extends JpaRepository<Codigos, Long> {
    default Optional<Codigos> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Codigos> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Codigos> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    public List<Codigos> findCodigosByIdUsuario(Usuarios usuario);

    @Query(
        value = "select distinct codigos from Codigos codigos left join fetch codigos.idStartup left join fetch codigos.idUsuario",
        countQuery = "select count(distinct codigos) from Codigos codigos"
    )
    Page<Codigos> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct codigos from Codigos codigos left join fetch codigos.idStartup left join fetch codigos.idUsuario")
    List<Codigos> findAllWithToOneRelationships();

    @Query("select codigos from Codigos codigos left join fetch codigos.idStartup left join fetch codigos.idUsuario where codigos.id =:id")
    Optional<Codigos> findOneWithToOneRelationships(@Param("id") Long id);
}
