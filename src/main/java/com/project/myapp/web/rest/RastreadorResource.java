package com.project.myapp.web.rest;

import com.project.myapp.domain.DonacionesPaquetes;
import com.project.myapp.domain.Rastreador;
import com.project.myapp.repository.RastreadorRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Rastreador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RastreadorResource {

    private final Logger log = LoggerFactory.getLogger(RastreadorResource.class);

    private static final String ENTITY_NAME = "rastreador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RastreadorRepository rastreadorRepository;

    public RastreadorResource(RastreadorRepository rastreadorRepository) {
        this.rastreadorRepository = rastreadorRepository;
    }

    /**
     * {@code POST  /rastreadors} : Create a new rastreador.
     *
     * @param rastreador the rastreador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rastreador, or with status {@code 400 (Bad Request)} if the rastreador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rastreadors")
    public ResponseEntity<Rastreador> createRastreador(@Valid @RequestBody Rastreador rastreador) throws URISyntaxException {
        log.debug("REST request to save Rastreador : {}", rastreador);
        if (rastreador.getId() != null) {
            throw new BadRequestAlertException("A new rastreador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rastreador result = rastreadorRepository.save(rastreador);
        return ResponseEntity
            .created(new URI("/api/rastreadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rastreadors/:id} : Updates an existing rastreador.
     *
     * @param id the id of the rastreador to save.
     * @param rastreador the rastreador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rastreador,
     * or with status {@code 400 (Bad Request)} if the rastreador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rastreador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rastreadors/{id}")
    public ResponseEntity<Rastreador> updateRastreador(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Rastreador rastreador
    ) throws URISyntaxException {
        log.debug("REST request to update Rastreador : {}, {}", id, rastreador);
        if (rastreador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rastreador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rastreadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Rastreador result = rastreadorRepository.save(rastreador);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rastreador.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rastreadors/:id} : Partial updates given fields of an existing rastreador, field will ignore if it is null
     *
     * @param id the id of the rastreador to save.
     * @param rastreador the rastreador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rastreador,
     * or with status {@code 400 (Bad Request)} if the rastreador is not valid,
     * or with status {@code 404 (Not Found)} if the rastreador is not found,
     * or with status {@code 500 (Internal Server Error)} if the rastreador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rastreadors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Rastreador> partialUpdateRastreador(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Rastreador rastreador
    ) throws URISyntaxException {
        log.debug("REST request to partial update Rastreador partially : {}, {}", id, rastreador);
        if (rastreador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rastreador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rastreadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Rastreador> result = rastreadorRepository
            .findById(rastreador.getId())
            .map(existingRastreador -> {
                if (rastreador.getDescripcion() != null) {
                    existingRastreador.setDescripcion(rastreador.getDescripcion());
                }
                if (rastreador.getLatitud() != null) {
                    existingRastreador.setLatitud(rastreador.getLatitud());
                }
                if (rastreador.getLongitud() != null) {
                    existingRastreador.setLongitud(rastreador.getLongitud());
                }
                if (rastreador.getFecha() != null) {
                    existingRastreador.setFecha(rastreador.getFecha());
                }
                if (rastreador.getEstado() != null) {
                    existingRastreador.setEstado(rastreador.getEstado());
                }

                return existingRastreador;
            })
            .map(rastreadorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rastreador.getId().toString())
        );
    }

    /**
     * {@code GET  /rastreadors} : get all the rastreadors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rastreadors in body.
     */
    @GetMapping("/rastreadors")
    public List<Rastreador> getAllRastreadors() {
        log.debug("REST request to get all Rastreadors");
        return rastreadorRepository.findAll();
    }

    /**
     * {@code GET  /rastreadors/:id} : get the "id" rastreador.
     *
     * @param id the id of the rastreador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rastreador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rastreadors/{id}")
    public ResponseEntity<Rastreador> getRastreador(@PathVariable Long id) {
        log.debug("REST request to get Rastreador : {}", id);
        Optional<Rastreador> rastreador = rastreadorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rastreador);
    }

    @PostMapping("/rastreadors/findByDonacionPaquete")
    public List<Rastreador> getAllRastreadorsByDonacion(@Valid @RequestBody DonacionesPaquetes donacionesPaquetes) {
        log.debug("REST request to get all Rastreadors");
        return rastreadorRepository.findAllByIdDonacionPaquete(donacionesPaquetes);
    }

    /**
     * {@code DELETE  /rastreadors/:id} : delete the "id" rastreador.
     *
     * @param id the id of the rastreador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rastreadors/{id}")
    public ResponseEntity<Void> deleteRastreador(@PathVariable Long id) {
        log.debug("REST request to delete Rastreador : {}", id);
        rastreadorRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
