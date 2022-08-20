package com.project.myapp.web.rest;

import com.project.myapp.domain.Inscripciones;
import com.project.myapp.domain.Monederos;
import com.project.myapp.domain.Startups;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.InscripcionesRepository;
import com.project.myapp.repository.MonederosRepository;
import com.project.myapp.repository.StartupsRepository;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Inscripciones}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InscripcionesResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionesResource.class);

    private static final String ENTITY_NAME = "inscripciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionesRepository inscripcionesRepository;
    private final StartupsRepository startupsRepository;
    private final MonederosRepository monederosRepository;

    public InscripcionesResource(
        InscripcionesRepository inscripcionesRepository,
        StartupsRepository startupsRepository,
        MonederosRepository monederosRepository
    ) {
        this.inscripcionesRepository = inscripcionesRepository;
        this.startupsRepository = startupsRepository;
        this.monederosRepository = monederosRepository;
    }

    /**
     * {@code POST  /inscripciones} : Create a new inscripciones.
     *
     * @param inscripciones the inscripciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripciones, or with status {@code 400 (Bad Request)} if the inscripciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripciones")
    public ResponseEntity<Inscripciones> createInscripciones(@Valid @RequestBody Inscripciones inscripciones) throws URISyntaxException {
        log.debug("REST request to save Inscripciones : {}", inscripciones);
        if (inscripciones.getId() != null) {
            throw new BadRequestAlertException("A new inscripciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inscripciones result = inscripcionesRepository.save(inscripciones);
        return ResponseEntity
            .created(new URI("/api/inscripciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @GetMapping("/inscripciones/registrarInscripcion/{correo}/{tipo}")
    public ResponseEntity<Inscripciones> reenviarCodigoStartups(@PathVariable String correo, @PathVariable String tipo)
        throws URISyntaxException {
        log.debug("REST request to save Inscripciones : {}", correo);
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(correo);
        Optional<Monederos> monederos = monederosRepository.findById(startups.get().getIdMonedero().getId());
        Inscripciones inscripciones = new Inscripciones();
        inscripciones.setNombre("Inscripción de startup");
        inscripciones.setDescripcion("Solo para startups");
        ZonedDateTime today = ZonedDateTime.now();
        inscripciones.setFechaInicial(today);
        inscripciones.setBeneficios(
            "Potenciar su empresa-Más acercamiento a la experiencia de clientes-Accesibilidad a clientes" +
            "-Interacción con posibles clientes-Acceso a inversionistas-Interacción con posibles inversionistas a través de reuniones" +
            "-Posibilidad de conseguir donaciones de forma rápida"
        );

        inscripciones.setEstado("Activo");
        inscripciones.numInscripcion(1);
        inscripciones.setIdStartup(startups.get());
        if (tipo.equals("Mensual")) {
            inscripciones.tipo("Mensual");
            inscripciones.monto(8.00);
        }
        if (tipo.equals("Anual")) {
            inscripciones.tipo("Anual");
            inscripciones.monto(65.00);
        }
        startups.get().setEstado("Activo");
        monederos.get().setEstado("Activo");
        monederosRepository.save(monederos.get());
        startupsRepository.save(startups.get());
        Inscripciones result = inscripcionesRepository.save(inscripciones);
        return ResponseEntity
            .created(new URI("/api/registrarInscripcion/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripciones/:id} : Updates an existing inscripciones.
     *
     * @param id the id of the inscripciones to save.
     * @param inscripciones the inscripciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripciones,
     * or with status {@code 400 (Bad Request)} if the inscripciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripciones/{id}")
    public ResponseEntity<Inscripciones> updateInscripciones(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Inscripciones inscripciones
    ) throws URISyntaxException {
        log.debug("REST request to update Inscripciones : {}, {}", id, inscripciones);
        if (inscripciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Inscripciones result = inscripcionesRepository.save(inscripciones);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /inscripciones/:id} : Partial updates given fields of an existing inscripciones, field will ignore if it is null
     *
     * @param id the id of the inscripciones to save.
     * @param inscripciones the inscripciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripciones,
     * or with status {@code 400 (Bad Request)} if the inscripciones is not valid,
     * or with status {@code 404 (Not Found)} if the inscripciones is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripciones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Inscripciones> partialUpdateInscripciones(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Inscripciones inscripciones
    ) throws URISyntaxException {
        log.debug("REST request to partial update Inscripciones partially : {}, {}", id, inscripciones);
        if (inscripciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Inscripciones> result = inscripcionesRepository
            .findById(inscripciones.getId())
            .map(existingInscripciones -> {
                if (inscripciones.getNombre() != null) {
                    existingInscripciones.setNombre(inscripciones.getNombre());
                }
                if (inscripciones.getDescripcion() != null) {
                    existingInscripciones.setDescripcion(inscripciones.getDescripcion());
                }
                if (inscripciones.getMonto() != null) {
                    existingInscripciones.setMonto(inscripciones.getMonto());
                }
                if (inscripciones.getTipo() != null) {
                    existingInscripciones.setTipo(inscripciones.getTipo());
                }
                if (inscripciones.getFechaInicial() != null) {
                    existingInscripciones.setFechaInicial(inscripciones.getFechaInicial());
                }
                if (inscripciones.getFechaFinal() != null) {
                    existingInscripciones.setFechaFinal(inscripciones.getFechaFinal());
                }
                if (inscripciones.getBeneficios() != null) {
                    existingInscripciones.setBeneficios(inscripciones.getBeneficios());
                }
                if (inscripciones.getEstado() != null) {
                    existingInscripciones.setEstado(inscripciones.getEstado());
                }
                if (inscripciones.getNumInscripcion() != null) {
                    existingInscripciones.setNumInscripcion(inscripciones.getNumInscripcion());
                }

                return existingInscripciones;
            })
            .map(inscripcionesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripciones.getId().toString())
        );
    }

    @PutMapping("/inscripciones/estado/{id}")
    public HttpStatus updateEstadoInscripciones(
        @PathVariable(value = "id", required = true) final String id,
        @Valid @RequestBody String estado
    ) throws URISyntaxException {
        if (estado.equals("Activo")) {
            inscripcionesRepository.updateInscripcionesEstado(Long.valueOf(id), "Activo");
            return HttpStatus.OK;
        } else if (estado.equals("Inactivo")) {
            inscripcionesRepository.updateInscripcionesEstado(Long.valueOf(id), "Inactivo");
            return HttpStatus.OK;
        }

        return HttpStatus.BAD_REQUEST;
    }

    /**
     * {@code GET  /inscripciones} : get all the inscripciones.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripciones in body.
     */
    @GetMapping("/inscripciones")
    public List<Inscripciones> getAllInscripciones(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Inscripciones");
        return inscripcionesRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /inscripciones/:id} : get the "id" inscripciones.
     *
     * @param id the id of the inscripciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripciones/{id}")
    public ResponseEntity<Inscripciones> getInscripciones(@PathVariable Long id) {
        log.debug("REST request to get Inscripciones : {}", id);
        Optional<Inscripciones> inscripciones = inscripcionesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(inscripciones);
    }

    @GetMapping("/inscripciones/inscripcionByStartup/{correo}")
    public ResponseEntity<Inscripciones> getInscripcionesByCorreo(@PathVariable String correo) {
        log.debug("REST request to get Inscripciones : {}", correo);
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(correo);
        Optional<Inscripciones> inscripciones = inscripcionesRepository.findByIdStartup(startups.get());
        return ResponseUtil.wrapOrNotFound(inscripciones);
    }

    /**
     * {@code DELETE  /inscripciones/:id} : delete the "id" inscripciones.
     *
     * @param id the id of the inscripciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripciones/{id}")
    public ResponseEntity<Void> deleteInscripciones(@PathVariable Long id) {
        log.debug("REST request to delete Inscripciones : {}", id);
        inscripcionesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/inscripciones/findInscripcionesByNombre/{nombre}")
    public List<Inscripciones> getInscripcionesByNombre(@PathVariable String nombre) {
        log.debug("REST request to get Usuarios : {}", nombre);
        String formattedData = nombre.replace("%20", "");
        List<Inscripciones> inscripciones = inscripcionesRepository.findText(formattedData);
        return inscripciones;
    }

    @GetMapping("/inscripciones/inscripciones-anuales")
    public int getCantidadInscripcionesAnuales() {
        log.debug("REST request to get cantidad inscripciones anuales");
        return inscripcionesRepository.countInscripcionesByTipoContainingAnual();
    }

    @GetMapping("/inscripciones/inscripciones-mensuales")
    public int getCantidadInscripcionesMensuales() {
        log.debug("REST request to get cantidad inscripciones mensuales");
        return inscripcionesRepository.countInscripcionesByTipoContainingMensual();
    }
}
