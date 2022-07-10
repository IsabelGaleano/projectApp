package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Inscripciones;
import com.project.myapp.repository.InscripcionesRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link InscripcionesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class InscripcionesResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Double DEFAULT_MONTO = 1D;
    private static final Double UPDATED_MONTO = 2D;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_INICIAL = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_INICIAL = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_FINAL = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_FINAL = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_BENEFICIOS = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIOS = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUM_INSCRIPCION = 1;
    private static final Integer UPDATED_NUM_INSCRIPCION = 2;

    private static final String ENTITY_API_URL = "/api/inscripciones";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InscripcionesRepository inscripcionesRepository;

    @Mock
    private InscripcionesRepository inscripcionesRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInscripcionesMockMvc;

    private Inscripciones inscripciones;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inscripciones createEntity(EntityManager em) {
        Inscripciones inscripciones = new Inscripciones()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .monto(DEFAULT_MONTO)
            .tipo(DEFAULT_TIPO)
            .fechaInicial(DEFAULT_FECHA_INICIAL)
            .fechaFinal(DEFAULT_FECHA_FINAL)
            .beneficios(DEFAULT_BENEFICIOS)
            .estado(DEFAULT_ESTADO)
            .numInscripcion(DEFAULT_NUM_INSCRIPCION);
        return inscripciones;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inscripciones createUpdatedEntity(EntityManager em) {
        Inscripciones inscripciones = new Inscripciones()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .fechaInicial(UPDATED_FECHA_INICIAL)
            .fechaFinal(UPDATED_FECHA_FINAL)
            .beneficios(UPDATED_BENEFICIOS)
            .estado(UPDATED_ESTADO)
            .numInscripcion(UPDATED_NUM_INSCRIPCION);
        return inscripciones;
    }

    @BeforeEach
    public void initTest() {
        inscripciones = createEntity(em);
    }

    @Test
    @Transactional
    void createInscripciones() throws Exception {
        int databaseSizeBeforeCreate = inscripcionesRepository.findAll().size();
        // Create the Inscripciones
        restInscripcionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(inscripciones)))
            .andExpect(status().isCreated());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeCreate + 1);
        Inscripciones testInscripciones = inscripcionesList.get(inscripcionesList.size() - 1);
        assertThat(testInscripciones.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testInscripciones.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testInscripciones.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testInscripciones.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testInscripciones.getFechaInicial()).isEqualTo(DEFAULT_FECHA_INICIAL);
        assertThat(testInscripciones.getFechaFinal()).isEqualTo(DEFAULT_FECHA_FINAL);
        assertThat(testInscripciones.getBeneficios()).isEqualTo(DEFAULT_BENEFICIOS);
        assertThat(testInscripciones.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testInscripciones.getNumInscripcion()).isEqualTo(DEFAULT_NUM_INSCRIPCION);
    }

    @Test
    @Transactional
    void createInscripcionesWithExistingId() throws Exception {
        // Create the Inscripciones with an existing ID
        inscripciones.setId(1L);

        int databaseSizeBeforeCreate = inscripcionesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInscripcionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(inscripciones)))
            .andExpect(status().isBadRequest());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = inscripcionesRepository.findAll().size();
        // set the field null
        inscripciones.setNombre(null);

        // Create the Inscripciones, which fails.

        restInscripcionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(inscripciones)))
            .andExpect(status().isBadRequest());

        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllInscripciones() throws Exception {
        // Initialize the database
        inscripcionesRepository.saveAndFlush(inscripciones);

        // Get all the inscripcionesList
        restInscripcionesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inscripciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].fechaInicial").value(hasItem(sameInstant(DEFAULT_FECHA_INICIAL))))
            .andExpect(jsonPath("$.[*].fechaFinal").value(hasItem(sameInstant(DEFAULT_FECHA_FINAL))))
            .andExpect(jsonPath("$.[*].beneficios").value(hasItem(DEFAULT_BENEFICIOS)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].numInscripcion").value(hasItem(DEFAULT_NUM_INSCRIPCION)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllInscripcionesWithEagerRelationshipsIsEnabled() throws Exception {
        when(inscripcionesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restInscripcionesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(inscripcionesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllInscripcionesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(inscripcionesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restInscripcionesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(inscripcionesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getInscripciones() throws Exception {
        // Initialize the database
        inscripcionesRepository.saveAndFlush(inscripciones);

        // Get the inscripciones
        restInscripcionesMockMvc
            .perform(get(ENTITY_API_URL_ID, inscripciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inscripciones.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.fechaInicial").value(sameInstant(DEFAULT_FECHA_INICIAL)))
            .andExpect(jsonPath("$.fechaFinal").value(sameInstant(DEFAULT_FECHA_FINAL)))
            .andExpect(jsonPath("$.beneficios").value(DEFAULT_BENEFICIOS))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO))
            .andExpect(jsonPath("$.numInscripcion").value(DEFAULT_NUM_INSCRIPCION));
    }

    @Test
    @Transactional
    void getNonExistingInscripciones() throws Exception {
        // Get the inscripciones
        restInscripcionesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewInscripciones() throws Exception {
        // Initialize the database
        inscripcionesRepository.saveAndFlush(inscripciones);

        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();

        // Update the inscripciones
        Inscripciones updatedInscripciones = inscripcionesRepository.findById(inscripciones.getId()).get();
        // Disconnect from session so that the updates on updatedInscripciones are not directly saved in db
        em.detach(updatedInscripciones);
        updatedInscripciones
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .fechaInicial(UPDATED_FECHA_INICIAL)
            .fechaFinal(UPDATED_FECHA_FINAL)
            .beneficios(UPDATED_BENEFICIOS)
            .estado(UPDATED_ESTADO)
            .numInscripcion(UPDATED_NUM_INSCRIPCION);

        restInscripcionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedInscripciones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInscripciones))
            )
            .andExpect(status().isOk());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
        Inscripciones testInscripciones = inscripcionesList.get(inscripcionesList.size() - 1);
        assertThat(testInscripciones.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testInscripciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testInscripciones.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testInscripciones.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testInscripciones.getFechaInicial()).isEqualTo(UPDATED_FECHA_INICIAL);
        assertThat(testInscripciones.getFechaFinal()).isEqualTo(UPDATED_FECHA_FINAL);
        assertThat(testInscripciones.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testInscripciones.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testInscripciones.getNumInscripcion()).isEqualTo(UPDATED_NUM_INSCRIPCION);
    }

    @Test
    @Transactional
    void putNonExistingInscripciones() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();
        inscripciones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInscripcionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, inscripciones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inscripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInscripciones() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();
        inscripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInscripcionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inscripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInscripciones() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();
        inscripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInscripcionesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(inscripciones)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInscripcionesWithPatch() throws Exception {
        // Initialize the database
        inscripcionesRepository.saveAndFlush(inscripciones);

        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();

        // Update the inscripciones using partial update
        Inscripciones partialUpdatedInscripciones = new Inscripciones();
        partialUpdatedInscripciones.setId(inscripciones.getId());

        partialUpdatedInscripciones
            .descripcion(UPDATED_DESCRIPCION)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .fechaFinal(UPDATED_FECHA_FINAL)
            .beneficios(UPDATED_BENEFICIOS)
            .numInscripcion(UPDATED_NUM_INSCRIPCION);

        restInscripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInscripciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInscripciones))
            )
            .andExpect(status().isOk());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
        Inscripciones testInscripciones = inscripcionesList.get(inscripcionesList.size() - 1);
        assertThat(testInscripciones.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testInscripciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testInscripciones.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testInscripciones.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testInscripciones.getFechaInicial()).isEqualTo(DEFAULT_FECHA_INICIAL);
        assertThat(testInscripciones.getFechaFinal()).isEqualTo(UPDATED_FECHA_FINAL);
        assertThat(testInscripciones.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testInscripciones.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testInscripciones.getNumInscripcion()).isEqualTo(UPDATED_NUM_INSCRIPCION);
    }

    @Test
    @Transactional
    void fullUpdateInscripcionesWithPatch() throws Exception {
        // Initialize the database
        inscripcionesRepository.saveAndFlush(inscripciones);

        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();

        // Update the inscripciones using partial update
        Inscripciones partialUpdatedInscripciones = new Inscripciones();
        partialUpdatedInscripciones.setId(inscripciones.getId());

        partialUpdatedInscripciones
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .fechaInicial(UPDATED_FECHA_INICIAL)
            .fechaFinal(UPDATED_FECHA_FINAL)
            .beneficios(UPDATED_BENEFICIOS)
            .estado(UPDATED_ESTADO)
            .numInscripcion(UPDATED_NUM_INSCRIPCION);

        restInscripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInscripciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInscripciones))
            )
            .andExpect(status().isOk());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
        Inscripciones testInscripciones = inscripcionesList.get(inscripcionesList.size() - 1);
        assertThat(testInscripciones.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testInscripciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testInscripciones.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testInscripciones.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testInscripciones.getFechaInicial()).isEqualTo(UPDATED_FECHA_INICIAL);
        assertThat(testInscripciones.getFechaFinal()).isEqualTo(UPDATED_FECHA_FINAL);
        assertThat(testInscripciones.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testInscripciones.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testInscripciones.getNumInscripcion()).isEqualTo(UPDATED_NUM_INSCRIPCION);
    }

    @Test
    @Transactional
    void patchNonExistingInscripciones() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();
        inscripciones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInscripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, inscripciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(inscripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInscripciones() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();
        inscripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInscripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(inscripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInscripciones() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionesRepository.findAll().size();
        inscripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInscripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(inscripciones))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Inscripciones in the database
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInscripciones() throws Exception {
        // Initialize the database
        inscripcionesRepository.saveAndFlush(inscripciones);

        int databaseSizeBeforeDelete = inscripcionesRepository.findAll().size();

        // Delete the inscripciones
        restInscripcionesMockMvc
            .perform(delete(ENTITY_API_URL_ID, inscripciones.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Inscripciones> inscripcionesList = inscripcionesRepository.findAll();
        assertThat(inscripcionesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
