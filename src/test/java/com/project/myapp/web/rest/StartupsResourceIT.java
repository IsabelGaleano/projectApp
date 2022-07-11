package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Startups;
import com.project.myapp.repository.StartupsRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link StartupsResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StartupsResourceIT {

    private static final String DEFAULT_NOMBRE_CORTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CORTO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_LARGO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_LARGO = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO_ELECTRONICO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO_ELECTRONICO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTRASENNIA = "AAAAAAAAAA";
    private static final String UPDATED_CONTRASENNIA = "BBBBBBBBBB";

    private static final String DEFAULT_LATITUD_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_LATITUD_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUD_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUD_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION_CORTA = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_CORTA = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICIOS = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIOS = "BBBBBBBBBB";

    private static final String DEFAULT_RIESGOS = "AAAAAAAAAA";
    private static final String UPDATED_RIESGOS = "BBBBBBBBBB";

    private static final String DEFAULT_PANORAMA_MERCADO = "AAAAAAAAAA";
    private static final String UPDATED_PANORAMA_MERCADO = "BBBBBBBBBB";

    private static final Double DEFAULT_MONTO_META = 1D;
    private static final Double UPDATED_MONTO_META = 2D;

    private static final String DEFAULT_TIPO_META = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_META = "BBBBBBBBBB";

    private static final String DEFAULT_LINK_SITIO_WEB = "AAAAAAAAAA";
    private static final String UPDATED_LINK_SITIO_WEB = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGEN_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGEN_URL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_CREACION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_CREACION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/startups";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StartupsRepository startupsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStartupsMockMvc;

    private Startups startups;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Startups createEntity(EntityManager em) {
        Startups startups = new Startups()
            .nombreCorto(DEFAULT_NOMBRE_CORTO)
            .nombreLargo(DEFAULT_NOMBRE_LARGO)
            .correoElectronico(DEFAULT_CORREO_ELECTRONICO)
            .telefono(DEFAULT_TELEFONO)
            .contrasennia(DEFAULT_CONTRASENNIA)
            .latitudDireccion(DEFAULT_LATITUD_DIRECCION)
            .longitudDireccion(DEFAULT_LONGITUD_DIRECCION)
            .descripcion(DEFAULT_DESCRIPCION)
            .descripcionCorta(DEFAULT_DESCRIPCION_CORTA)
            .beneficios(DEFAULT_BENEFICIOS)
            .riesgos(DEFAULT_RIESGOS)
            .panoramaMercado(DEFAULT_PANORAMA_MERCADO)
            .montoMeta(DEFAULT_MONTO_META)
            .tipoMeta(DEFAULT_TIPO_META)
            .linkSitioWeb(DEFAULT_LINK_SITIO_WEB)
            .imagenURL(DEFAULT_IMAGEN_URL)
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            .estado(DEFAULT_ESTADO);
        return startups;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Startups createUpdatedEntity(EntityManager em) {
        Startups startups = new Startups()
            .nombreCorto(UPDATED_NOMBRE_CORTO)
            .nombreLargo(UPDATED_NOMBRE_LARGO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .telefono(UPDATED_TELEFONO)
            .contrasennia(UPDATED_CONTRASENNIA)
            .latitudDireccion(UPDATED_LATITUD_DIRECCION)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .descripcion(UPDATED_DESCRIPCION)
            .descripcionCorta(UPDATED_DESCRIPCION_CORTA)
            .beneficios(UPDATED_BENEFICIOS)
            .riesgos(UPDATED_RIESGOS)
            .panoramaMercado(UPDATED_PANORAMA_MERCADO)
            .montoMeta(UPDATED_MONTO_META)
            .tipoMeta(UPDATED_TIPO_META)
            .linkSitioWeb(UPDATED_LINK_SITIO_WEB)
            .imagenURL(UPDATED_IMAGEN_URL)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .estado(UPDATED_ESTADO);
        return startups;
    }

    @BeforeEach
    public void initTest() {
        startups = createEntity(em);
    }

    @Test
    @Transactional
    void createStartups() throws Exception {
        int databaseSizeBeforeCreate = startupsRepository.findAll().size();
        // Create the Startups
        restStartupsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(startups)))
            .andExpect(status().isCreated());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeCreate + 1);
        Startups testStartups = startupsList.get(startupsList.size() - 1);
        assertThat(testStartups.getNombreCorto()).isEqualTo(DEFAULT_NOMBRE_CORTO);
        assertThat(testStartups.getNombreLargo()).isEqualTo(DEFAULT_NOMBRE_LARGO);
        assertThat(testStartups.getCorreoElectronico()).isEqualTo(DEFAULT_CORREO_ELECTRONICO);
        assertThat(testStartups.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testStartups.getContrasennia()).isEqualTo(DEFAULT_CONTRASENNIA);
        assertThat(testStartups.getLatitudDireccion()).isEqualTo(DEFAULT_LATITUD_DIRECCION);
        assertThat(testStartups.getLongitudDireccion()).isEqualTo(DEFAULT_LONGITUD_DIRECCION);
        assertThat(testStartups.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testStartups.getDescripcionCorta()).isEqualTo(DEFAULT_DESCRIPCION_CORTA);
        assertThat(testStartups.getBeneficios()).isEqualTo(DEFAULT_BENEFICIOS);
        assertThat(testStartups.getRiesgos()).isEqualTo(DEFAULT_RIESGOS);
        assertThat(testStartups.getPanoramaMercado()).isEqualTo(DEFAULT_PANORAMA_MERCADO);
        assertThat(testStartups.getMontoMeta()).isEqualTo(DEFAULT_MONTO_META);
        assertThat(testStartups.getTipoMeta()).isEqualTo(DEFAULT_TIPO_META);
        assertThat(testStartups.getLinkSitioWeb()).isEqualTo(DEFAULT_LINK_SITIO_WEB);
        assertThat(testStartups.getImagenURL()).isEqualTo(DEFAULT_IMAGEN_URL);
        assertThat(testStartups.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testStartups.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createStartupsWithExistingId() throws Exception {
        // Create the Startups with an existing ID
        startups.setId(1L);

        int databaseSizeBeforeCreate = startupsRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStartupsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(startups)))
            .andExpect(status().isBadRequest());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCorreoElectronicoIsRequired() throws Exception {
        int databaseSizeBeforeTest = startupsRepository.findAll().size();
        // set the field null
        startups.setCorreoElectronico(null);

        // Create the Startups, which fails.

        restStartupsMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(startups)))
            .andExpect(status().isBadRequest());

        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllStartups() throws Exception {
        // Initialize the database
        startupsRepository.saveAndFlush(startups);

        // Get all the startupsList
        restStartupsMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(startups.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCorto").value(hasItem(DEFAULT_NOMBRE_CORTO)))
            .andExpect(jsonPath("$.[*].nombreLargo").value(hasItem(DEFAULT_NOMBRE_LARGO)))
            .andExpect(jsonPath("$.[*].correoElectronico").value(hasItem(DEFAULT_CORREO_ELECTRONICO)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].contrasennia").value(hasItem(DEFAULT_CONTRASENNIA)))
            .andExpect(jsonPath("$.[*].latitudDireccion").value(hasItem(DEFAULT_LATITUD_DIRECCION)))
            .andExpect(jsonPath("$.[*].longitudDireccion").value(hasItem(DEFAULT_LONGITUD_DIRECCION)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].descripcionCorta").value(hasItem(DEFAULT_DESCRIPCION_CORTA)))
            .andExpect(jsonPath("$.[*].beneficios").value(hasItem(DEFAULT_BENEFICIOS)))
            .andExpect(jsonPath("$.[*].riesgos").value(hasItem(DEFAULT_RIESGOS)))
            .andExpect(jsonPath("$.[*].panoramaMercado").value(hasItem(DEFAULT_PANORAMA_MERCADO)))
            .andExpect(jsonPath("$.[*].montoMeta").value(hasItem(DEFAULT_MONTO_META.doubleValue())))
            .andExpect(jsonPath("$.[*].tipoMeta").value(hasItem(DEFAULT_TIPO_META)))
            .andExpect(jsonPath("$.[*].linkSitioWeb").value(hasItem(DEFAULT_LINK_SITIO_WEB)))
            .andExpect(jsonPath("$.[*].imagenURL").value(hasItem(DEFAULT_IMAGEN_URL)))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(sameInstant(DEFAULT_FECHA_CREACION))))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @Test
    @Transactional
    void getStartups() throws Exception {
        // Initialize the database
        startupsRepository.saveAndFlush(startups);

        // Get the startups
        restStartupsMockMvc
            .perform(get(ENTITY_API_URL_ID, startups.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(startups.getId().intValue()))
            .andExpect(jsonPath("$.nombreCorto").value(DEFAULT_NOMBRE_CORTO))
            .andExpect(jsonPath("$.nombreLargo").value(DEFAULT_NOMBRE_LARGO))
            .andExpect(jsonPath("$.correoElectronico").value(DEFAULT_CORREO_ELECTRONICO))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.contrasennia").value(DEFAULT_CONTRASENNIA))
            .andExpect(jsonPath("$.latitudDireccion").value(DEFAULT_LATITUD_DIRECCION))
            .andExpect(jsonPath("$.longitudDireccion").value(DEFAULT_LONGITUD_DIRECCION))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.descripcionCorta").value(DEFAULT_DESCRIPCION_CORTA))
            .andExpect(jsonPath("$.beneficios").value(DEFAULT_BENEFICIOS))
            .andExpect(jsonPath("$.riesgos").value(DEFAULT_RIESGOS))
            .andExpect(jsonPath("$.panoramaMercado").value(DEFAULT_PANORAMA_MERCADO))
            .andExpect(jsonPath("$.montoMeta").value(DEFAULT_MONTO_META.doubleValue()))
            .andExpect(jsonPath("$.tipoMeta").value(DEFAULT_TIPO_META))
            .andExpect(jsonPath("$.linkSitioWeb").value(DEFAULT_LINK_SITIO_WEB))
            .andExpect(jsonPath("$.imagenURL").value(DEFAULT_IMAGEN_URL))
            .andExpect(jsonPath("$.fechaCreacion").value(sameInstant(DEFAULT_FECHA_CREACION)))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingStartups() throws Exception {
        // Get the startups
        restStartupsMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStartups() throws Exception {
        // Initialize the database
        startupsRepository.saveAndFlush(startups);

        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();

        // Update the startups
        Startups updatedStartups = startupsRepository.findById(startups.getId()).get();
        // Disconnect from session so that the updates on updatedStartups are not directly saved in db
        em.detach(updatedStartups);
        updatedStartups
            .nombreCorto(UPDATED_NOMBRE_CORTO)
            .nombreLargo(UPDATED_NOMBRE_LARGO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .telefono(UPDATED_TELEFONO)
            .contrasennia(UPDATED_CONTRASENNIA)
            .latitudDireccion(UPDATED_LATITUD_DIRECCION)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .descripcion(UPDATED_DESCRIPCION)
            .descripcionCorta(UPDATED_DESCRIPCION_CORTA)
            .beneficios(UPDATED_BENEFICIOS)
            .riesgos(UPDATED_RIESGOS)
            .panoramaMercado(UPDATED_PANORAMA_MERCADO)
            .montoMeta(UPDATED_MONTO_META)
            .tipoMeta(UPDATED_TIPO_META)
            .linkSitioWeb(UPDATED_LINK_SITIO_WEB)
            .imagenURL(UPDATED_IMAGEN_URL)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .estado(UPDATED_ESTADO);

        restStartupsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStartups.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStartups))
            )
            .andExpect(status().isOk());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
        Startups testStartups = startupsList.get(startupsList.size() - 1);
        assertThat(testStartups.getNombreCorto()).isEqualTo(UPDATED_NOMBRE_CORTO);
        assertThat(testStartups.getNombreLargo()).isEqualTo(UPDATED_NOMBRE_LARGO);
        assertThat(testStartups.getCorreoElectronico()).isEqualTo(UPDATED_CORREO_ELECTRONICO);
        assertThat(testStartups.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testStartups.getContrasennia()).isEqualTo(UPDATED_CONTRASENNIA);
        assertThat(testStartups.getLatitudDireccion()).isEqualTo(UPDATED_LATITUD_DIRECCION);
        assertThat(testStartups.getLongitudDireccion()).isEqualTo(UPDATED_LONGITUD_DIRECCION);
        assertThat(testStartups.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testStartups.getDescripcionCorta()).isEqualTo(UPDATED_DESCRIPCION_CORTA);
        assertThat(testStartups.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testStartups.getRiesgos()).isEqualTo(UPDATED_RIESGOS);
        assertThat(testStartups.getPanoramaMercado()).isEqualTo(UPDATED_PANORAMA_MERCADO);
        assertThat(testStartups.getMontoMeta()).isEqualTo(UPDATED_MONTO_META);
        assertThat(testStartups.getTipoMeta()).isEqualTo(UPDATED_TIPO_META);
        assertThat(testStartups.getLinkSitioWeb()).isEqualTo(UPDATED_LINK_SITIO_WEB);
        assertThat(testStartups.getImagenURL()).isEqualTo(UPDATED_IMAGEN_URL);
        assertThat(testStartups.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testStartups.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingStartups() throws Exception {
        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();
        startups.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStartupsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, startups.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(startups))
            )
            .andExpect(status().isBadRequest());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStartups() throws Exception {
        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();
        startups.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStartupsMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(startups))
            )
            .andExpect(status().isBadRequest());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStartups() throws Exception {
        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();
        startups.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStartupsMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(startups)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStartupsWithPatch() throws Exception {
        // Initialize the database
        startupsRepository.saveAndFlush(startups);

        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();

        // Update the startups using partial update
        Startups partialUpdatedStartups = new Startups();
        partialUpdatedStartups.setId(startups.getId());

        partialUpdatedStartups
            .nombreCorto(UPDATED_NOMBRE_CORTO)
            .telefono(UPDATED_TELEFONO)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .descripcion(UPDATED_DESCRIPCION)
            .linkSitioWeb(UPDATED_LINK_SITIO_WEB)
            .fechaCreacion(UPDATED_FECHA_CREACION);

        restStartupsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStartups.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStartups))
            )
            .andExpect(status().isOk());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
        Startups testStartups = startupsList.get(startupsList.size() - 1);
        assertThat(testStartups.getNombreCorto()).isEqualTo(UPDATED_NOMBRE_CORTO);
        assertThat(testStartups.getNombreLargo()).isEqualTo(DEFAULT_NOMBRE_LARGO);
        assertThat(testStartups.getCorreoElectronico()).isEqualTo(DEFAULT_CORREO_ELECTRONICO);
        assertThat(testStartups.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testStartups.getContrasennia()).isEqualTo(DEFAULT_CONTRASENNIA);
        assertThat(testStartups.getLatitudDireccion()).isEqualTo(DEFAULT_LATITUD_DIRECCION);
        assertThat(testStartups.getLongitudDireccion()).isEqualTo(UPDATED_LONGITUD_DIRECCION);
        assertThat(testStartups.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testStartups.getDescripcionCorta()).isEqualTo(DEFAULT_DESCRIPCION_CORTA);
        assertThat(testStartups.getBeneficios()).isEqualTo(DEFAULT_BENEFICIOS);
        assertThat(testStartups.getRiesgos()).isEqualTo(DEFAULT_RIESGOS);
        assertThat(testStartups.getPanoramaMercado()).isEqualTo(DEFAULT_PANORAMA_MERCADO);
        assertThat(testStartups.getMontoMeta()).isEqualTo(DEFAULT_MONTO_META);
        assertThat(testStartups.getTipoMeta()).isEqualTo(DEFAULT_TIPO_META);
        assertThat(testStartups.getLinkSitioWeb()).isEqualTo(UPDATED_LINK_SITIO_WEB);
        assertThat(testStartups.getImagenURL()).isEqualTo(DEFAULT_IMAGEN_URL);
        assertThat(testStartups.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testStartups.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateStartupsWithPatch() throws Exception {
        // Initialize the database
        startupsRepository.saveAndFlush(startups);

        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();

        // Update the startups using partial update
        Startups partialUpdatedStartups = new Startups();
        partialUpdatedStartups.setId(startups.getId());

        partialUpdatedStartups
            .nombreCorto(UPDATED_NOMBRE_CORTO)
            .nombreLargo(UPDATED_NOMBRE_LARGO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .telefono(UPDATED_TELEFONO)
            .contrasennia(UPDATED_CONTRASENNIA)
            .latitudDireccion(UPDATED_LATITUD_DIRECCION)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .descripcion(UPDATED_DESCRIPCION)
            .descripcionCorta(UPDATED_DESCRIPCION_CORTA)
            .beneficios(UPDATED_BENEFICIOS)
            .riesgos(UPDATED_RIESGOS)
            .panoramaMercado(UPDATED_PANORAMA_MERCADO)
            .montoMeta(UPDATED_MONTO_META)
            .tipoMeta(UPDATED_TIPO_META)
            .linkSitioWeb(UPDATED_LINK_SITIO_WEB)
            .imagenURL(UPDATED_IMAGEN_URL)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .estado(UPDATED_ESTADO);

        restStartupsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStartups.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStartups))
            )
            .andExpect(status().isOk());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
        Startups testStartups = startupsList.get(startupsList.size() - 1);
        assertThat(testStartups.getNombreCorto()).isEqualTo(UPDATED_NOMBRE_CORTO);
        assertThat(testStartups.getNombreLargo()).isEqualTo(UPDATED_NOMBRE_LARGO);
        assertThat(testStartups.getCorreoElectronico()).isEqualTo(UPDATED_CORREO_ELECTRONICO);
        assertThat(testStartups.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testStartups.getContrasennia()).isEqualTo(UPDATED_CONTRASENNIA);
        assertThat(testStartups.getLatitudDireccion()).isEqualTo(UPDATED_LATITUD_DIRECCION);
        assertThat(testStartups.getLongitudDireccion()).isEqualTo(UPDATED_LONGITUD_DIRECCION);
        assertThat(testStartups.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testStartups.getDescripcionCorta()).isEqualTo(UPDATED_DESCRIPCION_CORTA);
        assertThat(testStartups.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testStartups.getRiesgos()).isEqualTo(UPDATED_RIESGOS);
        assertThat(testStartups.getPanoramaMercado()).isEqualTo(UPDATED_PANORAMA_MERCADO);
        assertThat(testStartups.getMontoMeta()).isEqualTo(UPDATED_MONTO_META);
        assertThat(testStartups.getTipoMeta()).isEqualTo(UPDATED_TIPO_META);
        assertThat(testStartups.getLinkSitioWeb()).isEqualTo(UPDATED_LINK_SITIO_WEB);
        assertThat(testStartups.getImagenURL()).isEqualTo(UPDATED_IMAGEN_URL);
        assertThat(testStartups.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testStartups.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingStartups() throws Exception {
        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();
        startups.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStartupsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, startups.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(startups))
            )
            .andExpect(status().isBadRequest());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStartups() throws Exception {
        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();
        startups.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStartupsMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(startups))
            )
            .andExpect(status().isBadRequest());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStartups() throws Exception {
        int databaseSizeBeforeUpdate = startupsRepository.findAll().size();
        startups.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStartupsMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(startups)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Startups in the database
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStartups() throws Exception {
        // Initialize the database
        startupsRepository.saveAndFlush(startups);

        int databaseSizeBeforeDelete = startupsRepository.findAll().size();

        // Delete the startups
        restStartupsMockMvc
            .perform(delete(ENTITY_API_URL_ID, startups.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Startups> startupsList = startupsRepository.findAll();
        assertThat(startupsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
