package com.project.myapp.web.rest;

import com.project.myapp.domain.PlanesInversion;
import com.project.myapp.domain.Startups;
import com.project.myapp.repository.PlanesInversionRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.PlanesInversion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanesInversionResource {

    private final Logger log = LoggerFactory.getLogger(PlanesInversionResource.class);

    private static final String ENTITY_NAME = "planesInversion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanesInversionRepository planesInversionRepository;

    private final StartupsRepository startupsRepository;

    public PlanesInversionResource(PlanesInversionRepository planesInversionRepository, StartupsRepository startupsRepository) {
        this.planesInversionRepository = planesInversionRepository;
        this.startupsRepository = startupsRepository;
    }

    /**
     * {@code POST  /planes-inversions} : Create a new planesInversion.
     *
     * @param planesInversion the planesInversion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planesInversion, or with status {@code 400 (Bad Request)} if the planesInversion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planes-inversions")
    public ResponseEntity<PlanesInversion> createPlanesInversion(@Valid @RequestBody PlanesInversion planesInversion)
        throws URISyntaxException {
        log.debug("REST request to save PlanesInversion : {}", planesInversion);
        if (planesInversion.getId() != null) {
            throw new BadRequestAlertException("A new planesInversion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanesInversion result = planesInversionRepository.save(planesInversion);
        return ResponseEntity
            .created(new URI("/api/planes-inversions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/planes-inversions-registro/{correo}")
    public ResponseEntity<PlanesInversion> registrarPlanesInversion(
        @PathVariable String correo,
        @RequestBody PlanesInversion planesInversion
    ) throws URISyntaxException {
        Optional<Startups> startup = startupsRepository.findByCorreoElectronico(correo);
        if (startup.isPresent()) {
            planesInversion.setIdStartup(startup.get());
            planesInversion.setEstado("Activo");
            log.debug("REST request to save PlanesInversion : {}", planesInversion);
            if (planesInversion.getId() != null) {
                throw new BadRequestAlertException("A new planesInversion cannot already have an ID", ENTITY_NAME, "idexists");
            }
        }
        PlanesInversion result = planesInversionRepository.save(planesInversion);
        return ResponseEntity
            .created(new URI("/api/planes-inversions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planes-inversions/:id} : Updates an existing planesInversion.
     *
     * @param id the id of the planesInversion to save.
     * @param planesInversion the planesInversion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesInversion,
     * or with status {@code 400 (Bad Request)} if the planesInversion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planesInversion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planes-inversions/{id}")
    public ResponseEntity<PlanesInversion> updatePlanesInversion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PlanesInversion planesInversion
    ) throws URISyntaxException {
        log.debug("REST request to update PlanesInversion : {}, {}", id, planesInversion);
        if (planesInversion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planesInversion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planesInversionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PlanesInversion result = planesInversionRepository.save(planesInversion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planesInversion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /planes-inversions/:id} : Partial updates given fields of an existing planesInversion, field will ignore if it is null
     *
     * @param id the id of the planesInversion to save.
     * @param planesInversion the planesInversion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesInversion,
     * or with status {@code 400 (Bad Request)} if the planesInversion is not valid,
     * or with status {@code 404 (Not Found)} if the planesInversion is not found,
     * or with status {@code 500 (Internal Server Error)} if the planesInversion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/planes-inversions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlanesInversion> partialUpdatePlanesInversion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PlanesInversion planesInversion
    ) throws URISyntaxException {
        log.debug("REST request to partial update PlanesInversion partially : {}, {}", id, planesInversion);
        if (planesInversion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planesInversion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planesInversionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlanesInversion> result = planesInversionRepository
            .findById(planesInversion.getId())
            .map(existingPlanesInversion -> {
                if (planesInversion.getNombre() != null) {
                    existingPlanesInversion.setNombre(planesInversion.getNombre());
                }
                if (planesInversion.getMonto() != null) {
                    existingPlanesInversion.setMonto(planesInversion.getMonto());
                }
                if (planesInversion.getDescripcion() != null) {
                    existingPlanesInversion.setDescripcion(planesInversion.getDescripcion());
                }
                if (planesInversion.getBeneficios() != null) {
                    existingPlanesInversion.setBeneficios(planesInversion.getBeneficios());
                }
                if (planesInversion.getPorcentajeEmpresarial() != null) {
                    existingPlanesInversion.setPorcentajeEmpresarial(planesInversion.getPorcentajeEmpresarial());
                }
                if (planesInversion.getEstado() != null) {
                    existingPlanesInversion.setEstado(planesInversion.getEstado());
                }

                return existingPlanesInversion;
            })
            .map(planesInversionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planesInversion.getId().toString())
        );
    }

    /**
     * {@code GET  /planes-inversions} : get all the planesInversions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planesInversions in body.
     */
    @GetMapping("/planes-inversions")
    public List<PlanesInversion> getAllPlanesInversions(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PlanesInversions");
        return planesInversionRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /planes-inversions/:id} : get the "id" planesInversion.
     *
     * @param id the id of the planesInversion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planesInversion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planes-inversions/{id}")
    public ResponseEntity<PlanesInversion> getPlanesInversion(@PathVariable Long id) {
        log.debug("REST request to get PlanesInversion : {}", id);
        Optional<PlanesInversion> planesInversion = planesInversionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(planesInversion);
    }

    @GetMapping("/planes-inversionsByCorreo/{correo}")
    public List<PlanesInversion> getPlanesInversionByIdStartup(@PathVariable String correo) {
        Optional<Startups> startup = startupsRepository.findByCorreoElectronico(correo);
        return planesInversionRepository.findPlanesInversionByIdStartup(startup);
    }

    /**
     * {@code DELETE  /planes-inversions/:id} : delete the "id" planesInversion.
     *
     * @param id the id of the planesInversion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planes-inversions/{id}")
    public ResponseEntity<Void> deletePlanesInversion(@PathVariable Long id) {
        log.debug("REST request to delete PlanesInversion : {}", id);
        planesInversionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
