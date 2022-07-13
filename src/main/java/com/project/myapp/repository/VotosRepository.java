package com.project.myapp.repository;

import com.project.myapp.domain.Votos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Votos entity.
 */
@Repository
public interface VotosRepository extends JpaRepository<Votos, Long> {
    default Optional<Votos> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Votos> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Votos> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct votos from Votos votos left join fetch votos.idStartup left join fetch votos.idUsuario",
        countQuery = "select count(distinct votos) from Votos votos"
    )
    Page<Votos> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct votos from Votos votos left join fetch votos.idStartup left join fetch votos.idUsuario")
    List<Votos> findAllWithToOneRelationships();

    @Query("select votos from Votos votos left join fetch votos.idStartup left join fetch votos.idUsuario where votos.id =:id")
    Optional<Votos> findOneWithToOneRelationships(@Param("id") Long id);
}
