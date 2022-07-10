package com.project.myapp.repository;

import com.project.myapp.domain.Rastreador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Rastreador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RastreadorRepository extends JpaRepository<Rastreador, Long> {}
