package com.project.myapp.repository;

import com.project.myapp.domain.Categorias;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Categorias entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriasRepository extends JpaRepository<Categorias, Long> {}
