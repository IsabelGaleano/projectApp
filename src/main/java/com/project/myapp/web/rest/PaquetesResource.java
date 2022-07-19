package com.project.myapp.web.rest;

import com.project.myapp.domain.Paquetes;
import com.project.myapp.domain.Startups;
import com.project.myapp.repository.PaquetesRepository;
import com.project.myapp.repository.StartupsRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Paquetes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaquetesResource {

    private final Logger log = LoggerFactory.getLogger(PaquetesResource.class);

    private static final String ENTITY_NAME = "paquetes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaquetesRepository paquetesRepository;
    private final StartupsRepository startupsRepository;

    public PaquetesResource(PaquetesRepository paquetesRepository, StartupsRepository startupsRepository) {
        this.paquetesRepository = paquetesRepository;
        this.startupsRepository = startupsRepository;
    }

    /**
     * {@code POST  /paquetes} : Create a new paquetes.
     *
     * @param paquetes the paquetes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paquetes, or with status {@code 400 (Bad Request)} if the paquetes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paquetes")
    public ResponseEntity<Paquetes> createPaquetes(@Valid @RequestBody Paquetes paquetes) throws URISyntaxException {
        log.debug("REST request to save Paquetes : {}", paquetes);
        if (paquetes.getId() != null) {
            throw new BadRequestAlertException("A new paquetes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Paquetes result = paquetesRepository.save(paquetes);
        return ResponseEntity
            .created(new URI("/api/paquetes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paquetes/:id} : Updates an existing paquetes.
     *
     * @param id the id of the paquetes to save.
     * @param paquetes the paquetes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paquetes,
     * or with status {@code 400 (Bad Request)} if the paquetes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paquetes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paquetes/{id}")
    public ResponseEntity<Paquetes> updatePaquetes(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Paquetes paquetes
    ) throws URISyntaxException {
        log.debug("REST request to update Paquetes : {}, {}", id, paquetes);
        if (paquetes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paquetes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paquetesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Paquetes result = paquetesRepository.save(paquetes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paquetes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /paquetes/:id} : Partial updates given fields of an existing paquetes, field will ignore if it is null
     *
     * @param id the id of the paquetes to save.
     * @param paquetes the paquetes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paquetes,
     * or with status {@code 400 (Bad Request)} if the paquetes is not valid,
     * or with status {@code 404 (Not Found)} if the paquetes is not found,
     * or with status {@code 500 (Internal Server Error)} if the paquetes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/paquetes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Paquetes> partialUpdatePaquetes(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Paquetes paquetes
    ) throws URISyntaxException {
        log.debug("REST request to partial update Paquetes partially : {}, {}", id, paquetes);
        if (paquetes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paquetes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paquetesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Paquetes> result = paquetesRepository
            .findById(paquetes.getId())
            .map(existingPaquetes -> {
                if (paquetes.getNombre() != null) {
                    existingPaquetes.setNombre(paquetes.getNombre());
                }
                if (paquetes.getMonto() != null) {
                    existingPaquetes.setMonto(paquetes.getMonto());
                }
                if (paquetes.getDescripcion() != null) {
                    existingPaquetes.setDescripcion(paquetes.getDescripcion());
                }
                if (paquetes.getDimensiones() != null) {
                    existingPaquetes.setDimensiones(paquetes.getDimensiones());
                }
                if (paquetes.getEstado() != null) {
                    existingPaquetes.setEstado(paquetes.getEstado());
                }

                return existingPaquetes;
            })
            .map(paquetesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paquetes.getId().toString())
        );
    }

    /**
     * {@code GET  /paquetes} : get all the paquetes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paquetes in body.
     */
    @GetMapping("/paquetes")
    public List<Paquetes> getAllPaquetes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Paquetes");
        return paquetesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /paquetes/:id} : get the "id" paquetes.
     *
     * @param id the id of the paquetes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paquetes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paquetes/{id}")
    public ResponseEntity<Paquetes> getPaquetes(@PathVariable Long id) {
        log.debug("REST request to get Paquetes : {}", id);
        Optional<Paquetes> paquetes = paquetesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(paquetes);
    }

    @GetMapping("/paquetes/paquetesStartups/{correo}")
    public List<Paquetes> getPaquetesByStartup(@PathVariable String correo) {
        log.debug("REST request to get Paquetes : {}", correo);
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(correo);
        List<Paquetes> paquetes = paquetesRepository.findAllByIdStartup(startups.get());
        return paquetes;
    }

    /**
     * {@code DELETE  /paquetes/:id} : delete the "id" paquetes.
     *
     * @param id the id of the paquetes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paquetes/{id}")
    public ResponseEntity<Void> deletePaquetes(@PathVariable Long id) {
        log.debug("REST request to delete Paquetes : {}", id);
        paquetesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
