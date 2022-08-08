package com.project.myapp.repository;

import com.project.myapp.domain.Monederos;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Monederos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonederosRepository extends JpaRepository<Monederos, Long> {
    List<Monederos> findAllByTipo(String tipo);
}
