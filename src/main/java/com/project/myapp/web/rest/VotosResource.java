package com.project.myapp.web.rest;

import com.project.myapp.domain.Votos;
import com.project.myapp.repository.VotosRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Votos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VotosResource {

    private final Logger log = LoggerFactory.getLogger(VotosResource.class);

    private static final String ENTITY_NAME = "votos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VotosRepository votosRepository;

    public VotosResource(VotosRepository votosRepository) {
        this.votosRepository = votosRepository;
    }

    /**
     * {@code POST  /votos} : Create a new votos.
     *
     * @param votos the votos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new votos, or with status {@code 400 (Bad Request)} if the votos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/votos")
    public ResponseEntity<Votos> createVotos(@Valid @RequestBody Votos votos) throws URISyntaxException {
        log.debug("REST request to save Votos : {}", votos);
        if (votos.getId() != null) {
            throw new BadRequestAlertException("A new votos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Votos result = votosRepository.save(votos);
        return ResponseEntity
            .created(new URI("/api/votos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /votos/:id} : Updates an existing votos.
     *
     * @param id the id of the votos to save.
     * @param votos the votos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated votos,
     * or with status {@code 400 (Bad Request)} if the votos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the votos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/votos/{id}")
    public ResponseEntity<Votos> updateVotos(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Votos votos)
        throws URISyntaxException {
        log.debug("REST request to update Votos : {}, {}", id, votos);
        if (votos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, votos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!votosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Votos result = votosRepository.save(votos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, votos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /votos/:id} : Partial updates given fields of an existing votos, field will ignore if it is null
     *
     * @param id the id of the votos to save.
     * @param votos the votos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated votos,
     * or with status {@code 400 (Bad Request)} if the votos is not valid,
     * or with status {@code 404 (Not Found)} if the votos is not found,
     * or with status {@code 500 (Internal Server Error)} if the votos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/votos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Votos> partialUpdateVotos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Votos votos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Votos partially : {}, {}", id, votos);
        if (votos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, votos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!votosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Votos> result = votosRepository
            .findById(votos.getId())
            .map(existingVotos -> {
                if (votos.getVotos() != null) {
                    existingVotos.setVotos(votos.getVotos());
                }
                if (votos.getEstado() != null) {
                    existingVotos.setEstado(votos.getEstado());
                }
                if (votos.getFecha() != null) {
                    existingVotos.setFecha(votos.getFecha());
                }

                return existingVotos;
            })
            .map(votosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, votos.getId().toString())
        );
    }

    /**
     * {@code GET  /votos} : get all the votos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of votos in body.
     */
    @GetMapping("/votos")
    public List<Votos> getAllVotos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Votos");
        return votosRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /votos/:id} : get the "id" votos.
     *
     * @param id the id of the votos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the votos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/votos/{id}")
    public ResponseEntity<Votos> getVotos(@PathVariable Long id) {
        log.debug("REST request to get Votos : {}", id);
        Optional<Votos> votos = votosRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(votos);
    }

    /**
     * {@code DELETE  /votos/:id} : delete the "id" votos.
     *
     * @param id the id of the votos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/votos/{id}")
    public ResponseEntity<Void> deleteVotos(@PathVariable Long id) {
        log.debug("REST request to delete Votos : {}", id);
        votosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
