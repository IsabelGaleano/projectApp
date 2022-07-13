package com.project.myapp.web.rest;

import com.project.myapp.domain.Mensajes;
import com.project.myapp.repository.MensajesRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Mensajes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MensajesResource {

    private final Logger log = LoggerFactory.getLogger(MensajesResource.class);

    private static final String ENTITY_NAME = "mensajes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MensajesRepository mensajesRepository;

    public MensajesResource(MensajesRepository mensajesRepository) {
        this.mensajesRepository = mensajesRepository;
    }

    /**
     * {@code POST  /mensajes} : Create a new mensajes.
     *
     * @param mensajes the mensajes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mensajes, or with status {@code 400 (Bad Request)} if the mensajes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mensajes")
    public ResponseEntity<Mensajes> createMensajes(@Valid @RequestBody Mensajes mensajes) throws URISyntaxException {
        log.debug("REST request to save Mensajes : {}", mensajes);
        if (mensajes.getId() != null) {
            throw new BadRequestAlertException("A new mensajes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mensajes result = mensajesRepository.save(mensajes);
        return ResponseEntity
            .created(new URI("/api/mensajes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mensajes/:id} : Updates an existing mensajes.
     *
     * @param id the id of the mensajes to save.
     * @param mensajes the mensajes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mensajes,
     * or with status {@code 400 (Bad Request)} if the mensajes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mensajes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mensajes/{id}")
    public ResponseEntity<Mensajes> updateMensajes(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Mensajes mensajes
    ) throws URISyntaxException {
        log.debug("REST request to update Mensajes : {}, {}", id, mensajes);
        if (mensajes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mensajes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mensajesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Mensajes result = mensajesRepository.save(mensajes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mensajes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mensajes/:id} : Partial updates given fields of an existing mensajes, field will ignore if it is null
     *
     * @param id the id of the mensajes to save.
     * @param mensajes the mensajes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mensajes,
     * or with status {@code 400 (Bad Request)} if the mensajes is not valid,
     * or with status {@code 404 (Not Found)} if the mensajes is not found,
     * or with status {@code 500 (Internal Server Error)} if the mensajes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/mensajes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Mensajes> partialUpdateMensajes(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Mensajes mensajes
    ) throws URISyntaxException {
        log.debug("REST request to partial update Mensajes partially : {}, {}", id, mensajes);
        if (mensajes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mensajes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mensajesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Mensajes> result = mensajesRepository
            .findById(mensajes.getId())
            .map(existingMensajes -> {
                if (mensajes.getMensaje() != null) {
                    existingMensajes.setMensaje(mensajes.getMensaje());
                }
                if (mensajes.getFecha() != null) {
                    existingMensajes.setFecha(mensajes.getFecha());
                }
                if (mensajes.getTipoRemitente() != null) {
                    existingMensajes.setTipoRemitente(mensajes.getTipoRemitente());
                }
                if (mensajes.getTipoReceptor() != null) {
                    existingMensajes.setTipoReceptor(mensajes.getTipoReceptor());
                }
                if (mensajes.getEstado() != null) {
                    existingMensajes.setEstado(mensajes.getEstado());
                }

                return existingMensajes;
            })
            .map(mensajesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mensajes.getId().toString())
        );
    }

    /**
     * {@code GET  /mensajes} : get all the mensajes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mensajes in body.
     */
    @GetMapping("/mensajes")
    public List<Mensajes> getAllMensajes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Mensajes");
        return mensajesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /mensajes/:id} : get the "id" mensajes.
     *
     * @param id the id of the mensajes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mensajes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mensajes/{id}")
    public ResponseEntity<Mensajes> getMensajes(@PathVariable Long id) {
        log.debug("REST request to get Mensajes : {}", id);
        Optional<Mensajes> mensajes = mensajesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(mensajes);
    }

    /**
     * {@code DELETE  /mensajes/:id} : delete the "id" mensajes.
     *
     * @param id the id of the mensajes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mensajes/{id}")
    public ResponseEntity<Void> deleteMensajes(@PathVariable Long id) {
        log.debug("REST request to delete Mensajes : {}", id);
        mensajesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
