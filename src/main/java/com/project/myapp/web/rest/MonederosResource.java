package com.project.myapp.web.rest;

import com.project.myapp.domain.Monederos;
import com.project.myapp.repository.MonederosRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Monederos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MonederosResource {

    private final Logger log = LoggerFactory.getLogger(MonederosResource.class);

    private static final String ENTITY_NAME = "monederos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MonederosRepository monederosRepository;

    public MonederosResource(MonederosRepository monederosRepository) {
        this.monederosRepository = monederosRepository;
    }

    /**
     * {@code POST  /monederos} : Create a new monederos.
     *
     * @param monederos the monederos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new monederos, or with status {@code 400 (Bad Request)} if the monederos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/monederos")
    public ResponseEntity<Monederos> createMonederos(@Valid @RequestBody Monederos monederos) throws URISyntaxException {
        log.debug("REST request to save Monederos : {}", monederos);
        if (monederos.getId() != null) {
            throw new BadRequestAlertException("A new monederos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Monederos result = monederosRepository.save(monederos);
        return ResponseEntity
            .created(new URI("/api/monederos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /monederos/:id} : Updates an existing monederos.
     *
     * @param id the id of the monederos to save.
     * @param monederos the monederos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monederos,
     * or with status {@code 400 (Bad Request)} if the monederos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the monederos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/monederos/{id}")
    public ResponseEntity<Monederos> updateMonederos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Monederos monederos
    ) throws URISyntaxException {
        log.debug("REST request to update Monederos : {}, {}", id, monederos);
        if (monederos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, monederos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!monederosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Monederos result = monederosRepository.save(monederos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monederos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /monederos/:id} : Partial updates given fields of an existing monederos, field will ignore if it is null
     *
     * @param id the id of the monederos to save.
     * @param monederos the monederos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monederos,
     * or with status {@code 400 (Bad Request)} if the monederos is not valid,
     * or with status {@code 404 (Not Found)} if the monederos is not found,
     * or with status {@code 500 (Internal Server Error)} if the monederos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/monederos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Monederos> partialUpdateMonederos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Monederos monederos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Monederos partially : {}, {}", id, monederos);
        if (monederos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, monederos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!monederosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Monederos> result = monederosRepository
            .findById(monederos.getId())
            .map(existingMonederos -> {
                if (monederos.getTipo() != null) {
                    existingMonederos.setTipo(monederos.getTipo());
                }
                if (monederos.getSaldo() != null) {
                    existingMonederos.setSaldo(monederos.getSaldo());
                }
                if (monederos.getEstado() != null) {
                    existingMonederos.setEstado(monederos.getEstado());
                }

                return existingMonederos;
            })
            .map(monederosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monederos.getId().toString())
        );
    }

    /**
     * {@code GET  /monederos} : get all the monederos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of monederos in body.
     */
    @GetMapping("/monederos")
    public List<Monederos> getAllMonederos() {
        log.debug("REST request to get all Monederos");
        return monederosRepository.findAll();
    }

    /**
     * {@code GET  /monederos/:id} : get the "id" monederos.
     *
     * @param id the id of the monederos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the monederos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/monederos/{id}")
    public ResponseEntity<Monederos> getMonederos(@PathVariable Long id) {
        log.debug("REST request to get Monederos : {}", id);
        Optional<Monederos> monederos = monederosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(monederos);
    }

    /**
     * {@code DELETE  /monederos/:id} : delete the "id" monederos.
     *
     * @param id the id of the monederos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/monederos/{id}")
    public ResponseEntity<Void> deleteMonederos(@PathVariable Long id) {
        log.debug("REST request to delete Monederos : {}", id);
        monederosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
