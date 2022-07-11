package com.project.myapp.web.rest;

import com.project.myapp.domain.Categorias;
import com.project.myapp.repository.CategoriasRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.Categorias}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CategoriasResource {

    private final Logger log = LoggerFactory.getLogger(CategoriasResource.class);

    private static final String ENTITY_NAME = "categorias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CategoriasRepository categoriasRepository;

    public CategoriasResource(CategoriasRepository categoriasRepository) {
        this.categoriasRepository = categoriasRepository;
    }

    /**
     * {@code POST  /categorias} : Create a new categorias.
     *
     * @param categorias the categorias to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new categorias, or with status {@code 400 (Bad Request)} if the categorias has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/categorias")
    public ResponseEntity<Categorias> createCategorias(@Valid @RequestBody Categorias categorias) throws URISyntaxException {
        log.debug("REST request to save Categorias : {}", categorias);
        if (categorias.getId() != null) {
            throw new BadRequestAlertException("A new categorias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Categorias result = categoriasRepository.save(categorias);
        return ResponseEntity
            .created(new URI("/api/categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /categorias/:id} : Updates an existing categorias.
     *
     * @param id the id of the categorias to save.
     * @param categorias the categorias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categorias,
     * or with status {@code 400 (Bad Request)} if the categorias is not valid,
     * or with status {@code 500 (Internal Server Error)} if the categorias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categorias> updateCategorias(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Categorias categorias
    ) throws URISyntaxException {
        log.debug("REST request to update Categorias : {}, {}", id, categorias);
        if (categorias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, categorias.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!categoriasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Categorias result = categoriasRepository.save(categorias);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, categorias.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /categorias/:id} : Partial updates given fields of an existing categorias, field will ignore if it is null
     *
     * @param id the id of the categorias to save.
     * @param categorias the categorias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated categorias,
     * or with status {@code 400 (Bad Request)} if the categorias is not valid,
     * or with status {@code 404 (Not Found)} if the categorias is not found,
     * or with status {@code 500 (Internal Server Error)} if the categorias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/categorias/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Categorias> partialUpdateCategorias(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Categorias categorias
    ) throws URISyntaxException {
        log.debug("REST request to partial update Categorias partially : {}, {}", id, categorias);
        if (categorias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, categorias.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!categoriasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Categorias> result = categoriasRepository
            .findById(categorias.getId())
            .map(existingCategorias -> {
                if (categorias.getCategoria() != null) {
                    existingCategorias.setCategoria(categorias.getCategoria());
                }
                if (categorias.getEstado() != null) {
                    existingCategorias.setEstado(categorias.getEstado());
                }

                return existingCategorias;
            })
            .map(categoriasRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, categorias.getId().toString())
        );
    }

    /**
     * {@code GET  /categorias} : get all the categorias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of categorias in body.
     */
    @GetMapping("/categorias")
    public List<Categorias> getAllCategorias() {
        log.debug("REST request to get all Categorias");
        return categoriasRepository.findAll();
    }

    /**
     * {@code GET  /categorias/:id} : get the "id" categorias.
     *
     * @param id the id of the categorias to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the categorias, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categorias> getCategorias(@PathVariable Long id) {
        log.debug("REST request to get Categorias : {}", id);
        Optional<Categorias> categorias = categoriasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(categorias);
    }

    /**
     * {@code DELETE  /categorias/:id} : delete the "id" categorias.
     *
     * @param id the id of the categorias to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Void> deleteCategorias(@PathVariable Long id) {
        log.debug("REST request to delete Categorias : {}", id);
        categoriasRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
