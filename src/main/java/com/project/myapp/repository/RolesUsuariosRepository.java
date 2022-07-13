package com.project.myapp.repository;

import com.project.myapp.domain.RolesUsuarios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RolesUsuarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolesUsuariosRepository extends JpaRepository<RolesUsuarios, Long> {}
