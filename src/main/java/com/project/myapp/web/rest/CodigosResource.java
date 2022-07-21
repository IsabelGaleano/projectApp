package com.project.myapp.web.rest;

import com.project.myapp.domain.Codigos;
import com.project.myapp.domain.Startups;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.CodigosRepository;
import com.project.myapp.repository.StartupsRepository;
import com.project.myapp.repository.UserRepository;
import com.project.myapp.repository.UsuariosRepository;
import com.project.myapp.service.SendGridService;
import com.project.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.project.myapp.web.rest.errors.CodigoNotFoundedException;
import com.project.myapp.web.rest.errors.UserNotFoundedError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.project.myapp.domain.Codigos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CodigosResource {

    private final Logger log = LoggerFactory.getLogger(CodigosResource.class);

    private static final String ENTITY_NAME = "codigos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CodigosRepository codigosRepository;

    private final UserRepository userRepository;

    private UsuariosRepository usuariosRepository;

    private Usuarios foundedCodeUsuario;

    private Startups foundedCodeStartup;

    private final StartupsRepository startupsRepository;

    public CodigosResource(CodigosRepository codigosRepository, UserRepository userRepository, UsuariosRepository usuariosRepository, StartupsRepository startupsRepository) {
        this.codigosRepository = codigosRepository;
        this.userRepository = userRepository;
        this.usuariosRepository = usuariosRepository;
        this.startupsRepository = startupsRepository;
    }

    /**
     * {@code POST  /codigos} : Create a new codigos.
     *
     * @param codigos the codigos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new codigos, or with status {@code 400 (Bad Request)} if the codigos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/codigos")
    public ResponseEntity<Codigos> createCodigos(@Valid @RequestBody Codigos codigos) throws URISyntaxException {
        log.debug("REST request to save Codigos : {}", codigos);
        if (codigos.getId() != null) {
            throw new BadRequestAlertException("A new codigos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Codigos result = codigosRepository.save(codigos);
        return ResponseEntity
            .created(new URI("/api/codigos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /codigos/:id} : Updates an existing codigos.
     *
     * @param id the id of the codigos to save.
     * @param codigos the codigos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated codigos,
     * or with status {@code 400 (Bad Request)} if the codigos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the codigos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/codigos/{id}")
    public ResponseEntity<Codigos> updateCodigos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Codigos codigos
    ) throws URISyntaxException {
        log.debug("REST request to update Codigos : {}, {}", id, codigos);
        if (codigos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, codigos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!codigosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Codigos result = codigosRepository.save(codigos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, codigos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /codigos/:id} : Partial updates given fields of an existing codigos, field will ignore if it is null
     *
     * @param id the id of the codigos to save.
     * @param codigos the codigos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated codigos,
     * or with status {@code 400 (Bad Request)} if the codigos is not valid,
     * or with status {@code 404 (Not Found)} if the codigos is not found,
     * or with status {@code 500 (Internal Server Error)} if the codigos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/codigos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Codigos> partialUpdateCodigos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Codigos codigos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Codigos partially : {}, {}", id, codigos);
        if (codigos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, codigos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!codigosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Codigos> result = codigosRepository
            .findById(codigos.getId())
            .map(existingCodigos -> {
                if (codigos.getCodigo() != null) {
                    existingCodigos.setCodigo(codigos.getCodigo());
                }
                if (codigos.getEstado() != null) {
                    existingCodigos.setEstado(codigos.getEstado());
                }

                return existingCodigos;
            })
            .map(codigosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, codigos.getId().toString())
        );
    }

    /**
     * {@code GET  /codigos} : get all the codigos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of codigos in body.
     */
    @GetMapping("/codigos")
    public List<Codigos> getAllCodigos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Codigos");
        return codigosRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /codigos/:id} : get the "id" codigos.
     *
     * @param id the id of the codigos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the codigos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/codigos/{id}")
    public ResponseEntity<Codigos> getCodigos(@PathVariable Long id) {
        log.debug("REST request to get Codigos : {}", id);
        Optional<Codigos> codigos = codigosRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(codigos);
    }

    @GetMapping("/codigosByIdUsuario/{id}")
    public List<Codigos> getCodigosByIdUsuario(@PathVariable Usuarios id) {
        log.debug("REST request to get Codigos : {}", id);
        return codigosRepository.findCodigosByIdUsuario(id);
    }

    @GetMapping("/codigosByStartup/{id}")
    public List<Codigos> getCodigosByStartup(@PathVariable Startups id) {
        log.debug("REST request to get Codigos : {}", id);
        return codigosRepository.findCodigosByIdStartup(id);
    }

    /**
     * {@code DELETE  /codigos/:id} : delete the "id" codigos.
     *
     * @param id the id of the codigos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/codigos/{id}")
    public ResponseEntity<Void> deleteCodigos(@PathVariable Long id) {
        log.debug("REST request to delete Codigos : {}", id);
        codigosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/codigos/send")
    public Codigos sendWithTemplate(@RequestBody String correoElectronico)  {
        this.foundedCodeUsuario = usuariosRepository.findOneBycorreoElectronicoIgnoreCase(correoElectronico);
        Codigos codigo = new Codigos();
        SendGridService sendGridService = new SendGridService(codigosRepository);
        if (!Objects.isNull(this.foundedCodeUsuario)) {
            sendGridService.sendOTP(correoElectronico, this.foundedCodeUsuario);
            return codigo;
        } else {
            this.foundedCodeStartup = startupsRepository.findStartupsByCorreoElectronico(correoElectronico);
            if (!Objects.isNull(this.foundedCodeStartup)) {
                sendGridService.sendOTP(correoElectronico, this.foundedCodeStartup);
                return codigo;
            } else {
                throw new UserNotFoundedError();
            }
        }
    }

    @PostMapping("/codigos/validate")
    public Optional<Codigos> validateOTP(@RequestBody String codigo)  {
        Optional<Codigos> foundedCodigo = codigosRepository.findCodigosByCodigoAndIdUsuario(codigo, this.foundedCodeUsuario);
        if (foundedCodigo.isPresent()) {
            return foundedCodigo;
        } else {
            Optional<Codigos> foundedCodigoStartup = codigosRepository.findCodigosByCodigoAndIdStartup(codigo, this.foundedCodeStartup);
            if (foundedCodigoStartup.isPresent()) {
                return foundedCodigoStartup;
            } else {
                throw new CodigoNotFoundedException();
            }
        }
    }

    @PostMapping("/codigos/reSendCode")
    public Codigos reSendCode(@RequestBody String body)  {
        Codigos codigo = new Codigos();
        SendGridService sendGridService = new SendGridService(codigosRepository);
        if (!Objects.isNull(this.foundedCodeUsuario)) {
            sendGridService.sendOTP(this.foundedCodeUsuario.getCorreoElectronico(), this.foundedCodeUsuario);
        } else {
            if (!Objects.isNull(this.foundedCodeStartup)) {
                sendGridService.sendOTP(this.foundedCodeStartup.getCorreoElectronico(), this.foundedCodeStartup);
            } else {
                throw new UserNotFoundedError();
            }
        }
        return codigo;
    }
}
