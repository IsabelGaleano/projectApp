package com.project.myapp.web.rest;

import com.project.myapp.domain.DonacionesPaquetes;
import com.project.myapp.domain.PlanesInversion;
import com.project.myapp.domain.Startups;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.DonacionesPaquetesRepository;
import com.project.myapp.repository.StartupsRepository;
import com.project.myapp.repository.UsuariosRepository;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
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
 * REST controller for managing {@link com.project.myapp.domain.DonacionesPaquetes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DonacionesPaquetesResource {

    private final Logger log = LoggerFactory.getLogger(DonacionesPaquetesResource.class);

    private static final String ENTITY_NAME = "donacionesPaquetes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DonacionesPaquetesRepository donacionesPaquetesRepository;

    private final StartupsRepository startupsRepository;

    private final UsuariosRepository usuariosRepository;

    public DonacionesPaquetesResource(
        DonacionesPaquetesRepository donacionesPaquetesRepository,
        StartupsRepository startupsRepository,
        UsuariosRepository usuariosRepository
    ) {
        this.donacionesPaquetesRepository = donacionesPaquetesRepository;
        this.startupsRepository = startupsRepository;
        this.usuariosRepository = usuariosRepository;
    }

    /**
     * {@code POST  /donaciones-paquetes} : Create a new donacionesPaquetes.
     *
     * @param donacionesPaquetes the donacionesPaquetes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new donacionesPaquetes, or with status {@code 400 (Bad Request)} if the donacionesPaquetes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/donaciones-paquetes")
    public ResponseEntity<DonacionesPaquetes> createDonacionesPaquetes(@Valid @RequestBody DonacionesPaquetes donacionesPaquetes)
        throws URISyntaxException {
        log.debug("REST request to save DonacionesPaquetes : {}", donacionesPaquetes);
        if (donacionesPaquetes.getId() != null) {
            throw new BadRequestAlertException("A new donacionesPaquetes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DonacionesPaquetes result = donacionesPaquetesRepository.save(donacionesPaquetes);
        return ResponseEntity
            .created(new URI("/api/donaciones-paquetes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /donaciones-paquetes/:id} : Updates an existing donacionesPaquetes.
     *
     * @param id the id of the donacionesPaquetes to save.
     * @param donacionesPaquetes the donacionesPaquetes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated donacionesPaquetes,
     * or with status {@code 400 (Bad Request)} if the donacionesPaquetes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the donacionesPaquetes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/donaciones-paquetes/{id}")
    public ResponseEntity<DonacionesPaquetes> updateDonacionesPaquetes(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DonacionesPaquetes donacionesPaquetes
    ) throws URISyntaxException {
        log.debug("REST request to update DonacionesPaquetes : {}, {}", id, donacionesPaquetes);
        if (donacionesPaquetes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, donacionesPaquetes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!donacionesPaquetesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DonacionesPaquetes result = donacionesPaquetesRepository.save(donacionesPaquetes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, donacionesPaquetes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /donaciones-paquetes/:id} : Partial updates given fields of an existing donacionesPaquetes, field will ignore if it is null
     *
     * @param id the id of the donacionesPaquetes to save.
     * @param donacionesPaquetes the donacionesPaquetes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated donacionesPaquetes,
     * or with status {@code 400 (Bad Request)} if the donacionesPaquetes is not valid,
     * or with status {@code 404 (Not Found)} if the donacionesPaquetes is not found,
     * or with status {@code 500 (Internal Server Error)} if the donacionesPaquetes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/donaciones-paquetes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DonacionesPaquetes> partialUpdateDonacionesPaquetes(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DonacionesPaquetes donacionesPaquetes
    ) throws URISyntaxException {
        log.debug("REST request to partial update DonacionesPaquetes partially : {}, {}", id, donacionesPaquetes);
        if (donacionesPaquetes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, donacionesPaquetes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!donacionesPaquetesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DonacionesPaquetes> result = donacionesPaquetesRepository
            .findById(donacionesPaquetes.getId())
            .map(existingDonacionesPaquetes -> {
                if (donacionesPaquetes.getDescripcion() != null) {
                    existingDonacionesPaquetes.setDescripcion(donacionesPaquetes.getDescripcion());
                }
                if (donacionesPaquetes.getMontoEnvio() != null) {
                    existingDonacionesPaquetes.setMontoEnvio(donacionesPaquetes.getMontoEnvio());
                }
                if (donacionesPaquetes.getMontoImpuesto() != null) {
                    existingDonacionesPaquetes.setMontoImpuesto(donacionesPaquetes.getMontoImpuesto());
                }
                if (donacionesPaquetes.getMontoTotal() != null) {
                    existingDonacionesPaquetes.setMontoTotal(donacionesPaquetes.getMontoTotal());
                }
                if (donacionesPaquetes.getFechaDonacion() != null) {
                    existingDonacionesPaquetes.setFechaDonacion(donacionesPaquetes.getFechaDonacion());
                }
                if (donacionesPaquetes.getFechaEntrega() != null) {
                    existingDonacionesPaquetes.setFechaEntrega(donacionesPaquetes.getFechaEntrega());
                }
                if (donacionesPaquetes.getFechaPosibleEntrega() != null) {
                    existingDonacionesPaquetes.setFechaPosibleEntrega(donacionesPaquetes.getFechaPosibleEntrega());
                }
                if (donacionesPaquetes.getFechaInicialEnvio() != null) {
                    existingDonacionesPaquetes.setFechaInicialEnvio(donacionesPaquetes.getFechaInicialEnvio());
                }
                if (donacionesPaquetes.getDiasRetraso() != null) {
                    existingDonacionesPaquetes.setDiasRetraso(donacionesPaquetes.getDiasRetraso());
                }
                if (donacionesPaquetes.getEstado() != null) {
                    existingDonacionesPaquetes.setEstado(donacionesPaquetes.getEstado());
                }

                return existingDonacionesPaquetes;
            })
            .map(donacionesPaquetesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, donacionesPaquetes.getId().toString())
        );
    }

    /**
     * {@code GET  /donaciones-paquetes} : get all the donacionesPaquetes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of donacionesPaquetes in body.
     */
    @GetMapping("/donaciones-paquetes")
    public List<DonacionesPaquetes> getAllDonacionesPaquetes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all DonacionesPaquetes");
        return donacionesPaquetesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /donaciones-paquetes/:id} : get the "id" donacionesPaquetes.
     *
     * @param id the id of the donacionesPaquetes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the donacionesPaquetes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/donaciones-paquetes/{id}")
    public ResponseEntity<DonacionesPaquetes> getDonacionesPaquetes(@PathVariable Long id) {
        log.debug("REST request to get DonacionesPaquetes : {}", id);
        Optional<DonacionesPaquetes> donacionesPaquetes = donacionesPaquetesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(donacionesPaquetes);
    }

    /**
     * {@code DELETE  /donaciones-paquetes/:id} : delete the "id" donacionesPaquetes.
     *
     * @param id the id of the donacionesPaquetes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/donaciones-paquetes/{id}")
    public ResponseEntity<Void> deleteDonacionesPaquetes(@PathVariable Long id) {
        log.debug("REST request to delete DonacionesPaquetes : {}", id);
        donacionesPaquetesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/donaciones-paquetesByStartupCorreo/{correo}")
    public List<DonacionesPaquetes> getDonacionesPaquetesByIdStartup(@PathVariable String correo) {
        Optional<Startups> startup = startupsRepository.findByCorreoElectronico(correo);
        return donacionesPaquetesRepository.findDonacionesPaquetesByIdStartup(startup);
    }

    @GetMapping("/donaciones-paquetesByUsuarioCorreo/{correo}")
    public List<DonacionesPaquetes> getDonacionesPaquetesByIdUsuario(@PathVariable String correo) {
        Optional<Usuarios> usuario = usuariosRepository.findByCorreoElectronico(correo);
        return donacionesPaquetesRepository.findDonacionesPaquetesByIdUsuario(usuario);
    }

    @GetMapping("/donaciones-paquetesByStartupNombre/{correo}/{nombre}")
    public List<DonacionesPaquetes> getDonacionesPaquetesByNombreStartup(@PathVariable String correo, @PathVariable String nombre) {
        Optional<Usuarios> usuario = usuariosRepository.findByCorreoElectronico(correo);
        List<DonacionesPaquetes> donacionesTotales = donacionesPaquetesRepository.findDonacionesPaquetesByIdUsuario(usuario);
        ArrayList<DonacionesPaquetes> donacionesPorNombre = new ArrayList<>();
        for (DonacionesPaquetes donacion : donacionesTotales) {
            if (donacion.getIdStartup().getNombreCorto().contains(nombre)) {
                donacionesPorNombre.add(donacion);
            }
        }
        return donacionesPorNombre;
    }

    @GetMapping("/donaciones-paquetesByStartupCorreo/{correo}/{correoStartup}")
    public List<DonacionesPaquetes> getDonacionesPaquetesByCorreoStartup(@PathVariable String correo, @PathVariable String correoStartup) {
        Optional<Usuarios> usuario = usuariosRepository.findByCorreoElectronico(correo);
        List<DonacionesPaquetes> donacionesTotales = donacionesPaquetesRepository.findDonacionesPaquetesByIdUsuario(usuario);
        ArrayList<DonacionesPaquetes> donacionesPorCorreo = new ArrayList<>();
        for (DonacionesPaquetes donacion : donacionesTotales) {
            if (donacion.getIdStartup().getCorreoElectronico().contains(correoStartup)) {
                donacionesPorCorreo.add(donacion);
            }
        }
        return donacionesPorCorreo;
    }

    @GetMapping("/donaciones-paquetesByUsuarioNombre/{correo}/{nombre}")
    public List<DonacionesPaquetes> getDonacionesPaquetesByNombreUsuario(@PathVariable String correo, @PathVariable String nombre) {
        Optional<Startups> startup = startupsRepository.findByCorreoElectronico(correo);
        List<DonacionesPaquetes> donacionesTotales = donacionesPaquetesRepository.findDonacionesPaquetesByIdStartup(startup);
        ArrayList<DonacionesPaquetes> donacionesPorNombre = new ArrayList<>();
        for (DonacionesPaquetes donacion : donacionesTotales) {
            if (donacion.getIdUsuario().getNombre().contains(nombre)) {
                donacionesPorNombre.add(donacion);
            }
        }
        return donacionesPorNombre;
    }

    @GetMapping("/donaciones-paquetesByUsuarioCorreo/{correo}/{correoStartup}")
    public List<DonacionesPaquetes> getDonacionesPaquetesByCorreoUsuario(@PathVariable String correo, @PathVariable String correoStartup) {
        Optional<Startups> startup = startupsRepository.findByCorreoElectronico(correo);
        List<DonacionesPaquetes> donacionesTotales = donacionesPaquetesRepository.findDonacionesPaquetesByIdStartup(startup);
        ArrayList<DonacionesPaquetes> donacionesPorCorreo = new ArrayList<>();
        for (DonacionesPaquetes donacion : donacionesTotales) {
            if (donacion.getIdUsuario().getCorreoElectronico().contains(correoStartup)) {
                donacionesPorCorreo.add(donacion);
            }
        }
        return donacionesPorCorreo;
    }
}
