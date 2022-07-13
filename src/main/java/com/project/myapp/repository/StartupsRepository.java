package com.project.myapp.repository;

import com.project.myapp.domain.Startups;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Startups entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StartupsRepository extends JpaRepository<Startups, Long> {}