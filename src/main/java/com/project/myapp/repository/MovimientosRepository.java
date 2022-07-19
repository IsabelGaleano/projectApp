package com.project.myapp.repository;

import com.project.myapp.domain.Monederos;
import com.project.myapp.domain.Movimientos;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Movimientos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientosRepository extends JpaRepository<Movimientos, Long> {
    public List<Movimientos> findMovimientosByIdMonedero(Monederos monederos);
}
