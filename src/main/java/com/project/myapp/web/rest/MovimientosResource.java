package com.project.myapp.web.rest;

import com.project.myapp.domain.Monederos;
import com.project.myapp.domain.Movimientos;
import com.project.myapp.repository.MovimientosRepository;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Movimientos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MovimientosResource {

    private final Logger log = LoggerFactory.getLogger(MovimientosResource.class);

    private static final String ENTITY_NAME = "movimientos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientosRepository movimientosRepository;

    public MovimientosResource(MovimientosRepository movimientosRepository) {
        this.movimientosRepository = movimientosRepository;
    }

    /**
     * {@code POST  /movimientos} : Create a new movimientos.
     *
     * @param movimientos the movimientos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientos, or with status {@code 400 (Bad Request)} if the movimientos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimientos")
    public ResponseEntity<Movimientos> createMovimientos(@Valid @RequestBody Movimientos movimientos) throws URISyntaxException {
        log.debug("REST request to save Movimientos : {}", movimientos);
        if (movimientos.getId() != null) {
            throw new BadRequestAlertException("A new movimientos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Movimientos result = movimientosRepository.save(movimientos);
        return ResponseEntity
            .created(new URI("/api/movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimientos/:id} : Updates an existing movimientos.
     *
     * @param id the id of the movimientos to save.
     * @param movimientos the movimientos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientos,
     * or with status {@code 400 (Bad Request)} if the movimientos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimientos/{id}")
    public ResponseEntity<Movimientos> updateMovimientos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Movimientos movimientos
    ) throws URISyntaxException {
        log.debug("REST request to update Movimientos : {}, {}", id, movimientos);
        if (movimientos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Movimientos result = movimientosRepository.save(movimientos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, movimientos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /movimientos/:id} : Partial updates given fields of an existing movimientos, field will ignore if it is null
     *
     * @param id the id of the movimientos to save.
     * @param movimientos the movimientos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientos,
     * or with status {@code 400 (Bad Request)} if the movimientos is not valid,
     * or with status {@code 404 (Not Found)} if the movimientos is not found,
     * or with status {@code 500 (Internal Server Error)} if the movimientos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/movimientos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Movimientos> partialUpdateMovimientos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Movimientos movimientos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Movimientos partially : {}, {}", id, movimientos);
        if (movimientos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Movimientos> result = movimientosRepository
            .findById(movimientos.getId())
            .map(existingMovimientos -> {
                if (movimientos.getFecha() != null) {
                    existingMovimientos.setFecha(movimientos.getFecha());
                }
                if (movimientos.getMonto() != null) {
                    existingMovimientos.setMonto(movimientos.getMonto());
                }
                if (movimientos.getTipo() != null) {
                    existingMovimientos.setTipo(movimientos.getTipo());
                }
                if (movimientos.getDescripcion() != null) {
                    existingMovimientos.setDescripcion(movimientos.getDescripcion());
                }
                if (movimientos.getEstado() != null) {
                    existingMovimientos.setEstado(movimientos.getEstado());
                }

                return existingMovimientos;
            })
            .map(movimientosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, movimientos.getId().toString())
        );
    }

    /**
     * {@code GET  /movimientos} : get all the movimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientos in body.
     */
    @GetMapping("/movimientos")
    public List<Movimientos> getAllMovimientos() {
        log.debug("REST request to get all Movimientos");
        return movimientosRepository.findAll();
    }

    /**
     * {@code GET  /movimientos/:id} : get the "id" movimientos.
     *
     * @param id the id of the movimientos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimientos/{id}")
    public ResponseEntity<Movimientos> getMovimientos(@PathVariable Long id) {
        log.debug("REST request to get Movimientos : {}", id);
        Optional<Movimientos> movimientos = movimientosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(movimientos);
    }

    @GetMapping("/movimientosByIdUsuario/{id}")
    public List<Movimientos> getMovimientosByIdUsuario(@PathVariable Monederos id) {
        log.debug("REST request to get Movimientos : {}", id);
        return movimientosRepository.findMovimientosByIdMonedero(id);
    }

    /**
     * {@code DELETE  /movimientos/:id} : delete the "id" movimientos.
     *
     * @param id the id of the movimientos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimientos/{id}")
    public ResponseEntity<Void> deleteMovimientos(@PathVariable Long id) {
        log.debug("REST request to delete Movimientos : {}", id);
        movimientosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
