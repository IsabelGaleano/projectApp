package com.project.myapp.web.rest;

import com.project.myapp.domain.*;
import com.project.myapp.repository.DonacionesPaquetesRepository;
import com.project.myapp.repository.NotificacionesRepository;
import com.project.myapp.repository.StartupsRepository;
import com.project.myapp.repository.UsuariosRepository;
import com.project.myapp.sendgrid.SendEmail;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.*;
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
 * REST controller for managing {@link com.project.myapp.domain.Notificaciones}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NotificacionesResource {

    private final Logger log = LoggerFactory.getLogger(NotificacionesResource.class);

    private static final String ENTITY_NAME = "notificaciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NotificacionesRepository notificacionesRepository;
    private final UsuariosRepository usuariosRepository;
    private final StartupsRepository startupsRepository;
    private final DonacionesPaquetesRepository donacionesPaquetesRepository;

    public NotificacionesResource(
        NotificacionesRepository notificacionesRepository,
        UsuariosRepository usuariosRepository,
        StartupsRepository startupsRepository,
        DonacionesPaquetesRepository donacionesPaquetesRepository
    ) {
        this.notificacionesRepository = notificacionesRepository;
        this.usuariosRepository = usuariosRepository;
        this.startupsRepository = startupsRepository;
        this.donacionesPaquetesRepository = donacionesPaquetesRepository;
    }

    /**
     * {@code POST  /notificaciones} : Create a new notificaciones.
     *
     * @param notificaciones the notificaciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new notificaciones, or with status {@code 400 (Bad Request)} if the notificaciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notificaciones")
    public ResponseEntity<Notificaciones> createNotificaciones(@Valid @RequestBody Notificaciones notificaciones)
        throws URISyntaxException {
        log.debug("REST request to save Notificaciones : {}", notificaciones);
        if (notificaciones.getId() != null) {
            throw new BadRequestAlertException("A new notificaciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if(notificaciones.getFecha() == null){
            notificaciones.setFecha(ZonedDateTime.now());
        }
        Notificaciones result = notificacionesRepository.save(notificaciones);
        return ResponseEntity
            .created(new URI("/api/notificaciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notificaciones/:id} : Updates an existing notificaciones.
     *
     * @param id the id of the notificaciones to save.
     * @param notificaciones the notificaciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notificaciones,
     * or with status {@code 400 (Bad Request)} if the notificaciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the notificaciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notificaciones/{id}")
    public ResponseEntity<Notificaciones> updateNotificaciones(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Notificaciones notificaciones
    ) throws URISyntaxException {
        log.debug("REST request to update Notificaciones : {}, {}", id, notificaciones);
        if (notificaciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, notificaciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!notificacionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Notificaciones result = notificacionesRepository.save(notificaciones);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notificaciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /notificaciones/:id} : Partial updates given fields of an existing notificaciones, field will ignore if it is null
     *
     * @param id the id of the notificaciones to save.
     * @param notificaciones the notificaciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated notificaciones,
     * or with status {@code 400 (Bad Request)} if the notificaciones is not valid,
     * or with status {@code 404 (Not Found)} if the notificaciones is not found,
     * or with status {@code 500 (Internal Server Error)} if the notificaciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/notificaciones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Notificaciones> partialUpdateNotificaciones(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Notificaciones notificaciones
    ) throws URISyntaxException {
        log.debug("REST request to partial update Notificaciones partially : {}, {}", id, notificaciones);
        if (notificaciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, notificaciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!notificacionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Notificaciones> result = notificacionesRepository
            .findById(notificaciones.getId())
            .map(existingNotificaciones -> {
                if (notificaciones.getTipo() != null) {
                    existingNotificaciones.setTipo(notificaciones.getTipo());
                }
                if (notificaciones.getDescripcion() != null) {
                    existingNotificaciones.setDescripcion(notificaciones.getDescripcion());
                }
                if (notificaciones.getFecha() != null) {
                    existingNotificaciones.setFecha(notificaciones.getFecha());
                }
                if (notificaciones.getTipoRemitente() != null) {
                    existingNotificaciones.setTipoRemitente(notificaciones.getTipoRemitente());
                }
                if (notificaciones.getTipoReceptor() != null) {
                    existingNotificaciones.setTipoReceptor(notificaciones.getTipoReceptor());
                }
                if (notificaciones.getEstado() != null) {
                    existingNotificaciones.setEstado(notificaciones.getEstado());
                }

                return existingNotificaciones;
            })
            .map(notificacionesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, notificaciones.getId().toString())
        );
    }

    /**
     * {@code GET  /notificaciones} : get all the notificaciones.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of notificaciones in body.
     */
    @GetMapping("/notificaciones")
    public List<Notificaciones> getAllNotificaciones(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Notificaciones");
        return notificacionesRepository.findAllWithEagerRelationships();
    }

    @GetMapping("/notificaciones/notificacionesUsuario/{correo}")
    public List<Notificaciones> getNotificacionesUsuarios(@PathVariable String correo) {
        Optional<Usuarios> usuario = usuariosRepository.findByCorreoElectronico(correo);
        List<Notificaciones> notificaciones = notificacionesRepository.findAllByIdUsuario(usuario.get());
        List<Notificaciones> notificacionesT = new ArrayList<>();
        for (Notificaciones notificacion : notificaciones) {
            if (notificacion.getTipoReceptor().equals("Usuario")) {
                notificacionesT.add(notificacion);
            }
        }
        return notificacionesT;
    }

    @GetMapping("/notificaciones/notificacionesStartup/{correo}")
    public List<Notificaciones> getNotificacionesStartups(@PathVariable String correo) {
        Optional<Startups> startup = startupsRepository.findByCorreoElectronico(correo);
        List<Notificaciones> notificaciones = notificacionesRepository.findAllByIdStartup(startup.get());
        List<Notificaciones> notificacionesT = new ArrayList<>();
        for (Notificaciones notificacion : notificaciones) {
            if (notificacion.getTipoReceptor().equals("Startup")) {
                notificacionesT.add(notificacion);
            }
        }
        return notificacionesT;
    }

    /**
     * {@code GET  /notificaciones/:id} : get the "id" notificaciones.
     *
     * @param id the id of the notificaciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the notificaciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notificaciones/{id}")
    public ResponseEntity<Notificaciones> getNotificaciones(@PathVariable Long id) {
        log.debug("REST request to get Notificaciones : {}", id);
        Optional<Notificaciones> notificaciones = notificacionesRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(notificaciones);
    }

    /**
     * {@code DELETE  /notificaciones/:id} : delete the "id" notificaciones.
     *
     * @param id the id of the notificaciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notificaciones/{id}")
    public ResponseEntity<Void> deleteNotificaciones(@PathVariable Long id) {
        log.debug("REST request to delete Notificaciones : {}", id);
        notificacionesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/notificaciones/actualizarRastreador")
    public void notificacionRastreador(@Valid @RequestBody InfoRastreador infoRastreador) {
        SendEmail sendEmail = new SendEmail();
        Optional<Usuarios> usuarios = usuariosRepository.findById(infoRastreador.getIdUsuario());
        Optional<Startups> startups = startupsRepository.findById(infoRastreador.getIdStartup());
        sendEmail.correoNotificacionesRastreador(infoRastreador, usuarios.get().getCorreoElectronico());
        ZonedDateTime date = ZonedDateTime.now();
        Notificaciones notificaciones = new Notificaciones();
        notificaciones.setTipo("Rastreador actualizado");
        notificaciones.setDescripcion("La ubicación de su paquete se ha actualizado: " + infoRastreador.getUbicacion().trim());
        notificaciones.setFecha(date);
        notificaciones.setTipoRemitente("Startup");
        notificaciones.setTipoReceptor("Usuario");
        notificaciones.setEstado("Activo");
        notificaciones.setIdStartup(startups.get());
        notificaciones.setIdUsuario(usuarios.get());
        notificacionesRepository.save(notificaciones);
        System.out.println(infoRastreador);
    }

    @PostMapping("/notificaciones/inicioEnvioPaquete")
    public void notificacionRastreadorEnvioInicio(@Valid @RequestBody InfoRastreador infoRastreador) {
        SendEmail sendEmail = new SendEmail();
        Optional<Usuarios> usuarios = usuariosRepository.findById(infoRastreador.getIdUsuario());
        Optional<Startups> startups = startupsRepository.findById(infoRastreador.getIdStartup());
        Optional<DonacionesPaquetes> donacion = donacionesPaquetesRepository.findById(infoRastreador.getIdDonacionPaquete());
        sendEmail.correoNotificacionesInicioRastreador(infoRastreador, usuarios.get().getCorreoElectronico());
        ZonedDateTime date = ZonedDateTime.now();
        Notificaciones notificaciones = new Notificaciones();
        notificaciones.setTipo("Envio inicializado");
        notificaciones.setDescripcion(
            "El envio de su paquete " +
            donacion.get().getIdPaquete().getNombre() +
            " del startup " +
            startups.get().getNombreCorto() +
            " ha iniciado"
        );
        notificaciones.setFecha(date);
        notificaciones.setTipoRemitente("Startup");
        notificaciones.setTipoReceptor("Usuario");
        notificaciones.setEstado("Activo");
        notificaciones.setIdStartup(startups.get());
        notificaciones.setIdUsuario(usuarios.get());
        notificacionesRepository.save(notificaciones);
        System.out.println(infoRastreador);
    }

    @PostMapping("/notificaciones/finEnvioPaquete")
    public void notificacionRastreadorEnvio(@Valid @RequestBody InfoRastreador infoRastreador) {
        SendEmail sendEmail = new SendEmail();
        Optional<Usuarios> usuarios = usuariosRepository.findById(infoRastreador.getIdUsuario());
        Optional<Startups> startups = startupsRepository.findById(infoRastreador.getIdStartup());
        Optional<DonacionesPaquetes> donacion = donacionesPaquetesRepository.findById(infoRastreador.getIdDonacionPaquete());
        sendEmail.correoNotificacionesRastreador(infoRastreador, usuarios.get().getCorreoElectronico());
        ZonedDateTime date = ZonedDateTime.now();
        Notificaciones notificaciones = new Notificaciones();
        notificaciones.setTipo("Envio finalizado");
        notificaciones.setDescripcion(
            "El envio de su paquete " +
            donacion.get().getIdPaquete().getNombre() +
            " del startup " +
            startups.get().getNombreCorto() +
            " ha finalizado"
        );
        notificaciones.setFecha(date);
        notificaciones.setTipoRemitente("Startup");
        notificaciones.setTipoReceptor("Usuario");
        notificaciones.setEstado("Activo");
        notificaciones.setIdStartup(startups.get());
        notificaciones.setIdUsuario(usuarios.get());
        notificacionesRepository.save(notificaciones);
        System.out.println(infoRastreador);
    }
}
