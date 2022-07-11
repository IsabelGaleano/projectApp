package com.project.myapp.web.rest;

import com.project.myapp.domain.Documentos;
import com.project.myapp.repository.DocumentosRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Documentos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentosResource {

    private final Logger log = LoggerFactory.getLogger(DocumentosResource.class);

    private static final String ENTITY_NAME = "documentos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentosRepository documentosRepository;

    public DocumentosResource(DocumentosRepository documentosRepository) {
        this.documentosRepository = documentosRepository;
    }

    /**
     * {@code POST  /documentos} : Create a new documentos.
     *
     * @param documentos the documentos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentos, or with status {@code 400 (Bad Request)} if the documentos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/documentos")
    public ResponseEntity<Documentos> createDocumentos(@Valid @RequestBody Documentos documentos) throws URISyntaxException {
        log.debug("REST request to save Documentos : {}", documentos);
        if (documentos.getId() != null) {
            throw new BadRequestAlertException("A new documentos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Documentos result = documentosRepository.save(documentos);
        return ResponseEntity
            .created(new URI("/api/documentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /documentos/:id} : Updates an existing documentos.
     *
     * @param id the id of the documentos to save.
     * @param documentos the documentos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentos,
     * or with status {@code 400 (Bad Request)} if the documentos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/documentos/{id}")
    public ResponseEntity<Documentos> updateDocumentos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Documentos documentos
    ) throws URISyntaxException {
        log.debug("REST request to update Documentos : {}, {}", id, documentos);
        if (documentos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documentos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!documentosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Documentos result = documentosRepository.save(documentos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documentos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /documentos/:id} : Partial updates given fields of an existing documentos, field will ignore if it is null
     *
     * @param id the id of the documentos to save.
     * @param documentos the documentos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentos,
     * or with status {@code 400 (Bad Request)} if the documentos is not valid,
     * or with status {@code 404 (Not Found)} if the documentos is not found,
     * or with status {@code 500 (Internal Server Error)} if the documentos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/documentos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Documentos> partialUpdateDocumentos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Documentos documentos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Documentos partially : {}, {}", id, documentos);
        if (documentos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, documentos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!documentosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Documentos> result = documentosRepository
            .findById(documentos.getId())
            .map(existingDocumentos -> {
                if (documentos.getNombre() != null) {
                    existingDocumentos.setNombre(documentos.getNombre());
                }
                if (documentos.getDescripcion() != null) {
                    existingDocumentos.setDescripcion(documentos.getDescripcion());
                }
                if (documentos.getUrl() != null) {
                    existingDocumentos.setUrl(documentos.getUrl());
                }
                if (documentos.getEstado() != null) {
                    existingDocumentos.setEstado(documentos.getEstado());
                }

                return existingDocumentos;
            })
            .map(documentosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documentos.getId().toString())
        );
    }

    /**
     * {@code GET  /documentos} : get all the documentos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentos in body.
     */
    @GetMapping("/documentos")
    public List<Documentos> getAllDocumentos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Documentos");
        return documentosRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /documentos/:id} : get the "id" documentos.
     *
     * @param id the id of the documentos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/documentos/{id}")
    public ResponseEntity<Documentos> getDocumentos(@PathVariable Long id) {
        log.debug("REST request to get Documentos : {}", id);
        Optional<Documentos> documentos = documentosRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(documentos);
    }

    /**
     * {@code DELETE  /documentos/:id} : delete the "id" documentos.
     *
     * @param id the id of the documentos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/documentos/{id}")
    public ResponseEntity<Void> deleteDocumentos(@PathVariable Long id) {
        log.debug("REST request to delete Documentos : {}", id);
        documentosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
