package com.project.myapp.web.rest;

import com.project.myapp.domain.*;
import com.project.myapp.repository.*;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import com.sun.xml.bind.v2.runtime.reflect.opt.Const;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Monederos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MonederosResource {

    private final Logger log = LoggerFactory.getLogger(MonederosResource.class);

    private static final String ENTITY_NAME = "monederos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MonederosRepository monederosRepository;
    private final StartupsRepository startupsRepository;
    private final MovimientosRepository movimientosRepository;
    private final UsuariosRepository usuariosRepository;
    private final DonacionesPaquetesRepository donacionesPaquetesRepository;
    private final PaquetesRepository paquetesRepository;

    public MonederosResource(
        MonederosRepository monederosRepository,
        StartupsRepository startupsRepository,
        MovimientosRepository movimientosRepository,
        UsuariosRepository usuariosRepository,
        DonacionesPaquetesRepository donacionesPaquetesRepository,
        PaquetesRepository paquetesRepository
    ) {
        this.monederosRepository = monederosRepository;
        this.startupsRepository = startupsRepository;
        this.movimientosRepository = movimientosRepository;
        this.usuariosRepository = usuariosRepository;
        this.donacionesPaquetesRepository = donacionesPaquetesRepository;
        this.paquetesRepository = paquetesRepository;
    }

    /**
     * {@code POST  /monederos} : Create a new monederos.
     *
     * @param monederos the monederos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new monederos, or with status {@code 400 (Bad Request)} if the monederos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/monederos")
    public ResponseEntity<Monederos> createMonederos(@Valid @RequestBody Monederos monederos) throws URISyntaxException {
        log.debug("REST request to save Monederos : {}", monederos);
        if (monederos.getId() != null) {
            throw new BadRequestAlertException("A new monederos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Monederos result = monederosRepository.save(monederos);
        return ResponseEntity
            .created(new URI("/api/monederos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /monederos/:id} : Updates an existing monederos.
     *
     * @param id the id of the monederos to save.
     * @param monederos the monederos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monederos,
     * or with status {@code 400 (Bad Request)} if the monederos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the monederos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/monederos/{id}")
    public ResponseEntity<Monederos> updateMonederos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Monederos monederos
    ) throws URISyntaxException {
        log.debug("REST request to update Monederos : {}, {}", id, monederos);
        if (monederos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, monederos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!monederosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Monederos result = monederosRepository.save(monederos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monederos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /monederos/:id} : Partial updates given fields of an existing monederos, field will ignore if it is null
     *
     * @param id the id of the monederos to save.
     * @param monederos the monederos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated monederos,
     * or with status {@code 400 (Bad Request)} if the monederos is not valid,
     * or with status {@code 404 (Not Found)} if the monederos is not found,
     * or with status {@code 500 (Internal Server Error)} if the monederos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/monederos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Monederos> partialUpdateMonederos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Monederos monederos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Monederos partially : {}, {}", id, monederos);
        if (monederos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, monederos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!monederosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Monederos> result = monederosRepository
            .findById(monederos.getId())
            .map(existingMonederos -> {
                if (monederos.getTipo() != null) {
                    existingMonederos.setTipo(monederos.getTipo());
                }
                if (monederos.getSaldo() != null) {
                    existingMonederos.setSaldo(monederos.getSaldo());
                }
                if (monederos.getEstado() != null) {
                    existingMonederos.setEstado(monederos.getEstado());
                }

                return existingMonederos;
            })
            .map(monederosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, monederos.getId().toString())
        );
    }

    /**
     * {@code GET  /monederos} : get all the monederos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of monederos in body.
     */
    @GetMapping("/monederos")
    public List<Monederos> getAllMonederos() {
        log.debug("REST request to get all Monederos");
        return monederosRepository.findAll();
    }

    /**
     * {@code GET  /monederos/:id} : get the "id" monederos.
     *
     * @param id the id of the monederos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the monederos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/monederos/{id}")
    public ResponseEntity<Monederos> getMonederos(@PathVariable Long id) {
        log.debug("REST request to get Monederos : {}", id);
        Optional<Monederos> monederos = monederosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(monederos);
    }

    /**
     * {@code DELETE  /monederos/:id} : delete the "id" monederos.
     *
     * @param id the id of the monederos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/monederos/{id}")
    public ResponseEntity<Void> deleteMonederos(@PathVariable Long id) {
        log.debug("REST request to delete Monederos : {}", id);
        monederosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/monederos/agregarInscripcion/{tipo}")
    public void registrarMontoInscripcion(@PathVariable String tipo) {
        log.debug("REST request to get Monederos : {}", tipo);
        List<Monederos> monederosAdmin = monederosRepository.findAllByTipo("ADMIN");
        ZonedDateTime today = ZonedDateTime.now();
        double montoMensual = 8.00;
        double montoAnual = 65.00;
        for (Monederos monedero : monederosAdmin) {
            if (tipo.equals("Mensual")) {
                monedero.setSaldo(monedero.getSaldo() + montoMensual);
            }
            if (tipo.equals("Anual")) {
                monedero.setSaldo(monedero.getSaldo() + montoAnual);
            }
            monederosRepository.save(monedero);
            Movimientos movimientos = new Movimientos();
            movimientos.setFecha(today);
            movimientos.setMonto(monedero.getSaldo());
            movimientos.setTipo("ADMIN");

            if (tipo.equals("Mensual")) {
                movimientos.descripcion("Se agregó el pago de una inscripción " + tipo + " con un monto de: $" + montoMensual);
            }
            if (tipo.equals("Anual")) {
                movimientos.descripcion("Se agregó el pago de una inscripción " + tipo + " con un monto de: $" + montoAnual);
            }
            movimientos.estado("Activo");
            movimientos.setIdMonedero(monedero);
            movimientosRepository.save(movimientos);
        }
    }

    @GetMapping("/monederos/agregarMovimientosPaquetes/{idPaquete}")
    public void agregarMovimientosCompra(@PathVariable Long idPaquete) {
        log.debug("REST request to get Monederos : {}", idPaquete);
        List<Monederos> monederosAdmin = monederosRepository.findAllByTipo("ADMIN");
        Optional<DonacionesPaquetes> donacion = donacionesPaquetesRepository.findById(idPaquete);
        Optional<Usuarios> usuarios = usuariosRepository.findByCorreoElectronico(donacion.get().getIdUsuario().getCorreoElectronico());
        Optional<Startups> startups = startupsRepository.findByCorreoElectronico(donacion.get().getIdStartup().getCorreoElectronico());
        Optional<Paquetes> paquetes = paquetesRepository.findById(donacion.get().getIdPaquete().getId());
        ZonedDateTime today = ZonedDateTime.now();
        for (Monederos monedero : monederosAdmin) {
            monedero.setSaldo(monedero.getSaldo() + donacion.get().getMontoImpuesto());
            monederosRepository.save(monedero);
            //Agregar movimiento admin
            Movimientos movimientos = new Movimientos();
            movimientos.setFecha(today);
            movimientos.setMonto(donacion.get().getMontoImpuesto());
            movimientos.setTipo("ADMIN");
            movimientos.descripcion(
                "Se agregó el impuesto por la compra de un paquete con un monto de: $" + donacion.get().getMontoImpuesto()
            );
            movimientos.estado("Activo");
            movimientos.setIdMonedero(monedero);
            movimientosRepository.save(movimientos);
        }

        //Monederos
        Optional<Monederos> monederoUsuario = monederosRepository.findById(usuarios.get().getIdMonedero().getId());
        Optional<Monederos> monederoStartup = monederosRepository.findById(startups.get().getIdMonedero().getId());
        //Monedero usuario
        monederoUsuario.get().setSaldo(monederoUsuario.get().getSaldo() + donacion.get().getMontoTotal());
        monederosRepository.save(monederoUsuario.get());

        //Monedero startup
        monederoStartup.get().setSaldo(monederoStartup.get().getSaldo() + paquetes.get().getMonto() + donacion.get().getMontoEnvio());
        monederosRepository.save(monederoStartup.get());

        //Movimiento usuario
        Movimientos movimientosUsuario = new Movimientos();
        movimientosUsuario.setFecha(today);
        movimientosUsuario.setMonto(donacion.get().getMontoTotal());
        movimientosUsuario.setTipo("USUARIO");
        movimientosUsuario.descripcion(
            "Se agregó el pago de la donación del paquete " +
            paquetes.get().getNombre() +
            " del startup " +
            startups.get().getNombreCorto() +
            " con un monto de: $" +
            donacion.get().getMontoTotal()
        );
        movimientosUsuario.estado("Activo");
        movimientosUsuario.setIdMonedero(monederoUsuario.get());
        movimientosRepository.save(movimientosUsuario);

        //Movimiento startup
        Movimientos movimientosStartup = new Movimientos();
        movimientosStartup.setFecha(today);
        movimientosStartup.setMonto(paquetes.get().getMonto() + donacion.get().getMontoEnvio());
        movimientosStartup.setTipo("STARTUP");
        movimientosStartup.descripcion(
            "Se agregó una donación realizada por el usuario " +
            usuarios.get().getNombre() +
            " " +
            usuarios.get().getPrimerApellido() +
            " con cédula " +
            usuarios.get().getCedula() +
            " y el monto de la donación es de: $" +
            movimientosStartup.getMonto()
        );
        movimientosStartup.estado("Activo");
        movimientosStartup.setIdMonedero(monederoStartup.get());
        movimientosRepository.save(movimientosStartup);
    }
}
