package com.project.myapp.repository;

import com.project.myapp.domain.DonacionesPaquetes;
import com.project.myapp.domain.Rastreador;
import java.util.List;
import javax.validation.constraints.Size;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Rastreador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RastreadorRepository extends JpaRepository<Rastreador, Long> {
    public List<Rastreador> findAllByIdDonacionPaquete(DonacionesPaquetes donacionesPaquetes);

    public List<Rastreador> findAllByIdDonacionPaqueteAndEstado(DonacionesPaquetes idDonacionPaquete, String estado);
}
