package com.project.myapp.web.rest;

import com.project.myapp.domain.RolesUsuarios;
import com.project.myapp.repository.RolesUsuariosRepository;
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
 * REST controller for managing {@link com.project.myapp.domain.RolesUsuarios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RolesUsuariosResource {

    private final Logger log = LoggerFactory.getLogger(RolesUsuariosResource.class);

    private static final String ENTITY_NAME = "rolesUsuarios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RolesUsuariosRepository rolesUsuariosRepository;

    public RolesUsuariosResource(RolesUsuariosRepository rolesUsuariosRepository) {
        this.rolesUsuariosRepository = rolesUsuariosRepository;
    }

    /**
     * {@code POST  /roles-usuarios} : Create a new rolesUsuarios.
     *
     * @param rolesUsuarios the rolesUsuarios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rolesUsuarios, or with status {@code 400 (Bad Request)} if the rolesUsuarios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/roles-usuarios")
    public ResponseEntity<RolesUsuarios> createRolesUsuarios(@Valid @RequestBody RolesUsuarios rolesUsuarios) throws URISyntaxException {
        log.debug("REST request to save RolesUsuarios : {}", rolesUsuarios);
        if (rolesUsuarios.getId() != null) {
            throw new BadRequestAlertException("A new rolesUsuarios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RolesUsuarios result = rolesUsuariosRepository.save(rolesUsuarios);
        return ResponseEntity
            .created(new URI("/api/roles-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /roles-usuarios/:id} : Updates an existing rolesUsuarios.
     *
     * @param id the id of the rolesUsuarios to save.
     * @param rolesUsuarios the rolesUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolesUsuarios,
     * or with status {@code 400 (Bad Request)} if the rolesUsuarios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rolesUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/roles-usuarios/{id}")
    public ResponseEntity<RolesUsuarios> updateRolesUsuarios(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RolesUsuarios rolesUsuarios
    ) throws URISyntaxException {
        log.debug("REST request to update RolesUsuarios : {}, {}", id, rolesUsuarios);
        if (rolesUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rolesUsuarios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rolesUsuariosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RolesUsuarios result = rolesUsuariosRepository.save(rolesUsuarios);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rolesUsuarios.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /roles-usuarios/:id} : Partial updates given fields of an existing rolesUsuarios, field will ignore if it is null
     *
     * @param id the id of the rolesUsuarios to save.
     * @param rolesUsuarios the rolesUsuarios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolesUsuarios,
     * or with status {@code 400 (Bad Request)} if the rolesUsuarios is not valid,
     * or with status {@code 404 (Not Found)} if the rolesUsuarios is not found,
     * or with status {@code 500 (Internal Server Error)} if the rolesUsuarios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/roles-usuarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RolesUsuarios> partialUpdateRolesUsuarios(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RolesUsuarios rolesUsuarios
    ) throws URISyntaxException {
        log.debug("REST request to partial update RolesUsuarios partially : {}, {}", id, rolesUsuarios);
        if (rolesUsuarios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rolesUsuarios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!rolesUsuariosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RolesUsuarios> result = rolesUsuariosRepository
            .findById(rolesUsuarios.getId())
            .map(existingRolesUsuarios -> {
                if (rolesUsuarios.getRol() != null) {
                    existingRolesUsuarios.setRol(rolesUsuarios.getRol());
                }

                return existingRolesUsuarios;
            })
            .map(rolesUsuariosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rolesUsuarios.getId().toString())
        );
    }

    /**
     * {@code GET  /roles-usuarios} : get all the rolesUsuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rolesUsuarios in body.
     */
    @GetMapping("/roles-usuarios")
    public List<RolesUsuarios> getAllRolesUsuarios() {
        log.debug("REST request to get all RolesUsuarios");
        return rolesUsuariosRepository.findAll();
    }

    /**
     * {@code GET  /roles-usuarios/:id} : get the "id" rolesUsuarios.
     *
     * @param id the id of the rolesUsuarios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rolesUsuarios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/roles-usuarios/{id}")
    public ResponseEntity<RolesUsuarios> getRolesUsuarios(@PathVariable Long id) {
        log.debug("REST request to get RolesUsuarios : {}", id);
        Optional<RolesUsuarios> rolesUsuarios = rolesUsuariosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rolesUsuarios);
    }

    /**
     * {@code DELETE  /roles-usuarios/:id} : delete the "id" rolesUsuarios.
     *
     * @param id the id of the rolesUsuarios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/roles-usuarios/{id}")
    public ResponseEntity<Void> deleteRolesUsuarios(@PathVariable Long id) {
        log.debug("REST request to delete RolesUsuarios : {}", id);
        rolesUsuariosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
