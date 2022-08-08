package com.project.myapp.web.rest;

import com.project.myapp.domain.Reuniones;
import com.project.myapp.repository.ReunionesRepository;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
//Zoom
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.xml.bind.DatatypeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Reuniones}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReunionesResource {

    private final Logger log = LoggerFactory.getLogger(ReunionesResource.class);

    private static final String ENTITY_NAME = "reuniones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReunionesRepository reunionesRepository;

    public ReunionesResource(ReunionesRepository reunionesRepository) {
        this.reunionesRepository = reunionesRepository;
    }

    /**
     * {@code POST  /reuniones} : Create a new reuniones.
     *
     * @param reuniones the reuniones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reuniones, or with status {@code 400 (Bad Request)} if the reuniones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reuniones")
    public ResponseEntity<Reuniones> createReuniones(@Valid @RequestBody Reuniones reuniones) throws URISyntaxException {
        log.debug("REST request to save Reuniones : {}", reuniones);
        if (reuniones.getId() != null) {
            throw new BadRequestAlertException("A new reuniones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reuniones result = reunionesRepository.save(reuniones);
        return ResponseEntity
            .created(new URI("/api/reuniones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reuniones/:id} : Updates an existing reuniones.
     *
     * @param id the id of the reuniones to save.
     * @param reuniones the reuniones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reuniones,
     * or with status {@code 400 (Bad Request)} if the reuniones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reuniones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reuniones/{id}")
    public ResponseEntity<Reuniones> updateReuniones(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Reuniones reuniones
    ) throws URISyntaxException {
        log.debug("REST request to update Reuniones : {}, {}", id, reuniones);
        if (reuniones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reuniones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reunionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Reuniones result = reunionesRepository.save(reuniones);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reuniones.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /reuniones/:id} : Partial updates given fields of an existing reuniones, field will ignore if it is null
     *
     * @param id the id of the reuniones to save.
     * @param reuniones the reuniones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reuniones,
     * or with status {@code 400 (Bad Request)} if the reuniones is not valid,
     * or with status {@code 404 (Not Found)} if the reuniones is not found,
     * or with status {@code 500 (Internal Server Error)} if the reuniones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/reuniones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Reuniones> partialUpdateReuniones(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Reuniones reuniones
    ) throws URISyntaxException {
        log.debug("REST request to partial update Reuniones partially : {}, {}", id, reuniones);
        if (reuniones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reuniones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reunionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Reuniones> result = reunionesRepository
            .findById(reuniones.getId())
            .map(existingReuniones -> {
                if (reuniones.getUrl() != null) {
                    existingReuniones.setUrl(reuniones.getUrl());
                }
                if (reuniones.getDescripcion() != null) {
                    existingReuniones.setDescripcion(reuniones.getDescripcion());
                }
                if (reuniones.getFechaSolicitada() != null) {
                    existingReuniones.setFechaSolicitada(reuniones.getFechaSolicitada());
                }
                if (reuniones.getFechaReunion() != null) {
                    existingReuniones.setFechaReunion(reuniones.getFechaReunion());
                }
                if (reuniones.getHoraReunion() != null) {
                    existingReuniones.setHoraReunion(reuniones.getHoraReunion());
                }
                if (reuniones.getEstado() != null) {
                    existingReuniones.setEstado(reuniones.getEstado());
                }

                return existingReuniones;
            })
            .map(reunionesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reuniones.getId().toString())
        );
    }

    /**
     * {@code GET  /reuniones} : get all the reuniones.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reuniones in body.
     */
    @GetMapping("/reuniones")
    public List<Reuniones> getAllReuniones(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Reuniones");
        return reunionesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /reuniones/:id} : get the "id" reuniones.
     *
     * @param id the id of the reuniones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reuniones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reuniones/{id}")
    public ResponseEntity<Reuniones> getReuniones(@PathVariable Long id) {
        log.debug("REST request to get Reuniones : {}", id);
        Optional<Reuniones> reuniones = reunionesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(reuniones);
    }

    /**
     * {@code DELETE  /reuniones/:id} : delete the "id" reuniones.
     *
     * @param id the id of the reuniones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reuniones/{id}")
    public ResponseEntity<Void> deleteReuniones(@PathVariable Long id) {
        log.debug("REST request to delete Reuniones : {}", id);
        reunionesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/generateSignature/{apiKey}/{apiSecret}/{meetingNumber}")
    public String createSignature(
        @PathVariable String apiKey,
        @PathVariable String apiSecret,
        @PathVariable String meetingNumber,
        @RequestBody int role
    ) throws URISyntaxException {
        try {
            Mac hasher = Mac.getInstance("HmacSHA256");
            String ts = Long.toString(System.currentTimeMillis() - 30000);
            String msg = String.format("%s%s%s%d", apiKey, meetingNumber, ts, role);
            hasher.init(new SecretKeySpec(apiSecret.getBytes(), "HmacSHA256"));
            String message = Base64.getEncoder().encodeToString(msg.getBytes());
            byte[] hash = hasher.doFinal(message.getBytes());
            String hashBase64Str = DatatypeConverter.printBase64Binary(hash);
            String tmpString = String.format("%s.%s.%s.%d.%s", apiKey, meetingNumber, ts, role, hashBase64Str);
            String encodedString = Base64.getEncoder().encodeToString(tmpString.getBytes());
            // return encodedString.replaceAll("\=+$", "");
            return encodedString.replaceAll("\\=+$", "");
        } catch (NoSuchAlgorithmException e) {} catch (InvalidKeyException e) {}
        return "";
    }
}
