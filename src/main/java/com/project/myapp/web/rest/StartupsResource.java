package com.project.myapp.web.rest;

import com.project.myapp.domain.Codigos;
import com.project.myapp.domain.Startups;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.CodigosRepository;
import com.project.myapp.repository.StartupsRepository;
import com.project.myapp.sendgrid.SendEmail;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Startups}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StartupsResource {

    private final Logger log = LoggerFactory.getLogger(StartupsResource.class);

    private static final String ENTITY_NAME = "startups";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StartupsRepository startupsRepository;
    private final CodigosRepository codigosRepository;

    public StartupsResource(StartupsRepository startupsRepository, CodigosRepository codigosRepository) {
        this.startupsRepository = startupsRepository;
        this.codigosRepository = codigosRepository;
    }

    /**
     * {@code POST  /startups} : Create a new startups.
     *
     * @param startups the startups to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new startups, or with status {@code 400 (Bad Request)} if the startups has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/startups")
    public ResponseEntity<Startups> createStartups(@Valid @RequestBody Startups startups) throws URISyntaxException {
        log.debug("REST request to save Startups : {}", startups);
        if (startups.getId() != null) {
            throw new BadRequestAlertException("A new startups cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Startups result = startupsRepository.save(startups);
        return ResponseEntity
            .created(new URI("/api/startups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /startups/:id} : Updates an existing startups.
     *
     * @param id the id of the startups to save.
     * @param startups the startups to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated startups,
     * or with status {@code 400 (Bad Request)} if the startups is not valid,
     * or with status {@code 500 (Internal Server Error)} if the startups couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/startups/{id}")
    public ResponseEntity<Startups> updateStartups(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Startups startups
    ) throws URISyntaxException {
        log.debug("REST request to update Startups : {}, {}", id, startups);
        if (startups.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, startups.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!startupsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Startups result = startupsRepository.save(startups);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, startups.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /startups/:id} : Partial updates given fields of an existing startups, field will ignore if it is null
     *
     * @param id the id of the startups to save.
     * @param startups the startups to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated startups,
     * or with status {@code 400 (Bad Request)} if the startups is not valid,
     * or with status {@code 404 (Not Found)} if the startups is not found,
     * or with status {@code 500 (Internal Server Error)} if the startups couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/startups/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Startups> partialUpdateStartups(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Startups startups
    ) throws URISyntaxException {
        log.debug("REST request to partial update Startups partially : {}, {}", id, startups);
        if (startups.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, startups.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!startupsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Startups> result = startupsRepository
            .findById(startups.getId())
            .map(existingStartups -> {
                if (startups.getNombreCorto() != null) {
                    existingStartups.setNombreCorto(startups.getNombreCorto());
                }
                if (startups.getNombreLargo() != null) {
                    existingStartups.setNombreLargo(startups.getNombreLargo());
                }
                if (startups.getCorreoElectronico() != null) {
                    existingStartups.setCorreoElectronico(startups.getCorreoElectronico());
                }
                if (startups.getTelefono() != null) {
                    existingStartups.setTelefono(startups.getTelefono());
                }
                if (startups.getContrasennia() != null) {
                    existingStartups.setContrasennia(startups.getContrasennia());
                }
                if (startups.getLatitudDireccion() != null) {
                    existingStartups.setLatitudDireccion(startups.getLatitudDireccion());
                }
                if (startups.getLongitudDireccion() != null) {
                    existingStartups.setLongitudDireccion(startups.getLongitudDireccion());
                }
                if (startups.getDescripcion() != null) {
                    existingStartups.setDescripcion(startups.getDescripcion());
                }
                if (startups.getDescripcionCorta() != null) {
                    existingStartups.setDescripcionCorta(startups.getDescripcionCorta());
                }
                if (startups.getBeneficios() != null) {
                    existingStartups.setBeneficios(startups.getBeneficios());
                }
                if (startups.getRiesgos() != null) {
                    existingStartups.setRiesgos(startups.getRiesgos());
                }
                if (startups.getPanoramaMercado() != null) {
                    existingStartups.setPanoramaMercado(startups.getPanoramaMercado());
                }
                if (startups.getMontoMeta() != null) {
                    existingStartups.setMontoMeta(startups.getMontoMeta());
                }
                if (startups.getTipoMeta() != null) {
                    existingStartups.setTipoMeta(startups.getTipoMeta());
                }
                if (startups.getLinkSitioWeb() != null) {
                    existingStartups.setLinkSitioWeb(startups.getLinkSitioWeb());
                }
                if (startups.getImagenURL() != null) {
                    existingStartups.setImagenURL(startups.getImagenURL());
                }
                if (startups.getFechaCreacion() != null) {
                    existingStartups.setFechaCreacion(startups.getFechaCreacion());
                }
                if (startups.getEstado() != null) {
                    existingStartups.setEstado(startups.getEstado());
                }

                return existingStartups;
            })
            .map(startupsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, startups.getId().toString())
        );
    }

    /**
     * {@code GET  /startups} : get all the startups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of startups in body.
     */
    @GetMapping("/startups")
    public List<Startups> getAllStartups() {
        log.debug("REST request to get all Startups");
        return startupsRepository.findAll();
    }

    /**
     * {@code GET  /startups/:id} : get the "id" startups.
     *
     * @param id the id of the startups to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the startups, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/startups/{id}")
    public ResponseEntity<Startups> getStartups(@PathVariable Long id) {
        log.debug("REST request to get Startups : {}", id);
        Optional<Startups> startups = startupsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(startups);
    }

    @GetMapping("/startups/findbyCorreo/{correo}")
    public ResponseEntity<Startups> getStartupsByCorreo(@PathVariable String correo) {
        log.debug("REST request to get Startups : {}", correo);
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(correo);
        return ResponseUtil.wrapOrNotFound(startups);
    }

    @GetMapping("/startups/verificarStartup/{correo}/{codigo}")
    public boolean verificarStartup(@PathVariable String correo, @PathVariable String codigo) {
        log.debug("REST request to get Startups : {}", correo);
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(correo);
        List<Codigos> codigos = codigosRepository.findCodigosByIdStartup(startups.get());
        boolean result = false;
        for (Codigos codigoTemp : codigos) {
            if (codigoTemp.getEstado().equals("Activo")) {
                if (codigoTemp.getCodigo().equals(codigo)) {
                    result = true;
                    if (codigos.size() > 1) {
                        for (Codigos codigoUpdate : codigos) {
                            codigoUpdate.setEstado("Inactivo");
                            codigosRepository.save(codigoUpdate);
                        }
                    }

                    startups.get().setEstado("PendienteInscripcion");
                    startupsRepository.save(startups.get());
                }
            }
        }
        return result;
    }

    /**
     * {@code DELETE  /startups/:id} : delete the "id" startups.
     *
     * @param id the id of the startups to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/startups/{id}")
    public ResponseEntity<Void> deleteStartups(@PathVariable Long id) {
        log.debug("REST request to delete Startups : {}", id);
        startupsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
