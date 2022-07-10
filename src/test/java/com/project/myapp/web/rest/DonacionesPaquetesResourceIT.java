package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.DonacionesPaquetes;
import com.project.myapp.repository.DonacionesPaquetesRepository;
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
 * Integration tests for the {@link DonacionesPaquetesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class DonacionesPaquetesResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Double DEFAULT_MONTO_ENVIO = 1D;
    private static final Double UPDATED_MONTO_ENVIO = 2D;

    private static final Double DEFAULT_MONTO_IMPUESTO = 1D;
    private static final Double UPDATED_MONTO_IMPUESTO = 2D;

    private static final Double DEFAULT_MONTO_TOTAL = 1D;
    private static final Double UPDATED_MONTO_TOTAL = 2D;

    private static final ZonedDateTime DEFAULT_FECHA_DONACION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_DONACION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_ENTREGA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_ENTREGA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_POSIBLE_ENTREGA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_POSIBLE_ENTREGA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_INICIAL_ENVIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_INICIAL_ENVIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Double DEFAULT_DIAS_RETRASO = 1D;
    private static final Double UPDATED_DIAS_RETRASO = 2D;

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/donaciones-paquetes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DonacionesPaquetesRepository donacionesPaquetesRepository;

    @Mock
    private DonacionesPaquetesRepository donacionesPaquetesRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDonacionesPaquetesMockMvc;

    private DonacionesPaquetes donacionesPaquetes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DonacionesPaquetes createEntity(EntityManager em) {
        DonacionesPaquetes donacionesPaquetes = new DonacionesPaquetes()
            .descripcion(DEFAULT_DESCRIPCION)
            .montoEnvio(DEFAULT_MONTO_ENVIO)
            .montoImpuesto(DEFAULT_MONTO_IMPUESTO)
            .montoTotal(DEFAULT_MONTO_TOTAL)
            .fechaDonacion(DEFAULT_FECHA_DONACION)
            .fechaEntrega(DEFAULT_FECHA_ENTREGA)
            .fechaPosibleEntrega(DEFAULT_FECHA_POSIBLE_ENTREGA)
            .fechaInicialEnvio(DEFAULT_FECHA_INICIAL_ENVIO)
            .diasRetraso(DEFAULT_DIAS_RETRASO)
            .estado(DEFAULT_ESTADO);
        return donacionesPaquetes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DonacionesPaquetes createUpdatedEntity(EntityManager em) {
        DonacionesPaquetes donacionesPaquetes = new DonacionesPaquetes()
            .descripcion(UPDATED_DESCRIPCION)
            .montoEnvio(UPDATED_MONTO_ENVIO)
            .montoImpuesto(UPDATED_MONTO_IMPUESTO)
            .montoTotal(UPDATED_MONTO_TOTAL)
            .fechaDonacion(UPDATED_FECHA_DONACION)
            .fechaEntrega(UPDATED_FECHA_ENTREGA)
            .fechaPosibleEntrega(UPDATED_FECHA_POSIBLE_ENTREGA)
            .fechaInicialEnvio(UPDATED_FECHA_INICIAL_ENVIO)
            .diasRetraso(UPDATED_DIAS_RETRASO)
            .estado(UPDATED_ESTADO);
        return donacionesPaquetes;
    }

    @BeforeEach
    public void initTest() {
        donacionesPaquetes = createEntity(em);
    }

    @Test
    @Transactional
    void createDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeCreate = donacionesPaquetesRepository.findAll().size();
        // Create the DonacionesPaquetes
        restDonacionesPaquetesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isCreated());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeCreate + 1);
        DonacionesPaquetes testDonacionesPaquetes = donacionesPaquetesList.get(donacionesPaquetesList.size() - 1);
        assertThat(testDonacionesPaquetes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDonacionesPaquetes.getMontoEnvio()).isEqualTo(DEFAULT_MONTO_ENVIO);
        assertThat(testDonacionesPaquetes.getMontoImpuesto()).isEqualTo(DEFAULT_MONTO_IMPUESTO);
        assertThat(testDonacionesPaquetes.getMontoTotal()).isEqualTo(DEFAULT_MONTO_TOTAL);
        assertThat(testDonacionesPaquetes.getFechaDonacion()).isEqualTo(DEFAULT_FECHA_DONACION);
        assertThat(testDonacionesPaquetes.getFechaEntrega()).isEqualTo(DEFAULT_FECHA_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaPosibleEntrega()).isEqualTo(DEFAULT_FECHA_POSIBLE_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaInicialEnvio()).isEqualTo(DEFAULT_FECHA_INICIAL_ENVIO);
        assertThat(testDonacionesPaquetes.getDiasRetraso()).isEqualTo(DEFAULT_DIAS_RETRASO);
        assertThat(testDonacionesPaquetes.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createDonacionesPaquetesWithExistingId() throws Exception {
        // Create the DonacionesPaquetes with an existing ID
        donacionesPaquetes.setId(1L);

        int databaseSizeBeforeCreate = donacionesPaquetesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDonacionesPaquetesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDonacionesPaquetes() throws Exception {
        // Initialize the database
        donacionesPaquetesRepository.saveAndFlush(donacionesPaquetes);

        // Get all the donacionesPaquetesList
        restDonacionesPaquetesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(donacionesPaquetes.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].montoEnvio").value(hasItem(DEFAULT_MONTO_ENVIO.doubleValue())))
            .andExpect(jsonPath("$.[*].montoImpuesto").value(hasItem(DEFAULT_MONTO_IMPUESTO.doubleValue())))
            .andExpect(jsonPath("$.[*].montoTotal").value(hasItem(DEFAULT_MONTO_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaDonacion").value(hasItem(sameInstant(DEFAULT_FECHA_DONACION))))
            .andExpect(jsonPath("$.[*].fechaEntrega").value(hasItem(sameInstant(DEFAULT_FECHA_ENTREGA))))
            .andExpect(jsonPath("$.[*].fechaPosibleEntrega").value(hasItem(sameInstant(DEFAULT_FECHA_POSIBLE_ENTREGA))))
            .andExpect(jsonPath("$.[*].fechaInicialEnvio").value(hasItem(sameInstant(DEFAULT_FECHA_INICIAL_ENVIO))))
            .andExpect(jsonPath("$.[*].diasRetraso").value(hasItem(DEFAULT_DIAS_RETRASO.doubleValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDonacionesPaquetesWithEagerRelationshipsIsEnabled() throws Exception {
        when(donacionesPaquetesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDonacionesPaquetesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(donacionesPaquetesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDonacionesPaquetesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(donacionesPaquetesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDonacionesPaquetesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(donacionesPaquetesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getDonacionesPaquetes() throws Exception {
        // Initialize the database
        donacionesPaquetesRepository.saveAndFlush(donacionesPaquetes);

        // Get the donacionesPaquetes
        restDonacionesPaquetesMockMvc
            .perform(get(ENTITY_API_URL_ID, donacionesPaquetes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(donacionesPaquetes.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.montoEnvio").value(DEFAULT_MONTO_ENVIO.doubleValue()))
            .andExpect(jsonPath("$.montoImpuesto").value(DEFAULT_MONTO_IMPUESTO.doubleValue()))
            .andExpect(jsonPath("$.montoTotal").value(DEFAULT_MONTO_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.fechaDonacion").value(sameInstant(DEFAULT_FECHA_DONACION)))
            .andExpect(jsonPath("$.fechaEntrega").value(sameInstant(DEFAULT_FECHA_ENTREGA)))
            .andExpect(jsonPath("$.fechaPosibleEntrega").value(sameInstant(DEFAULT_FECHA_POSIBLE_ENTREGA)))
            .andExpect(jsonPath("$.fechaInicialEnvio").value(sameInstant(DEFAULT_FECHA_INICIAL_ENVIO)))
            .andExpect(jsonPath("$.diasRetraso").value(DEFAULT_DIAS_RETRASO.doubleValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingDonacionesPaquetes() throws Exception {
        // Get the donacionesPaquetes
        restDonacionesPaquetesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDonacionesPaquetes() throws Exception {
        // Initialize the database
        donacionesPaquetesRepository.saveAndFlush(donacionesPaquetes);

        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();

        // Update the donacionesPaquetes
        DonacionesPaquetes updatedDonacionesPaquetes = donacionesPaquetesRepository.findById(donacionesPaquetes.getId()).get();
        // Disconnect from session so that the updates on updatedDonacionesPaquetes are not directly saved in db
        em.detach(updatedDonacionesPaquetes);
        updatedDonacionesPaquetes
            .descripcion(UPDATED_DESCRIPCION)
            .montoEnvio(UPDATED_MONTO_ENVIO)
            .montoImpuesto(UPDATED_MONTO_IMPUESTO)
            .montoTotal(UPDATED_MONTO_TOTAL)
            .fechaDonacion(UPDATED_FECHA_DONACION)
            .fechaEntrega(UPDATED_FECHA_ENTREGA)
            .fechaPosibleEntrega(UPDATED_FECHA_POSIBLE_ENTREGA)
            .fechaInicialEnvio(UPDATED_FECHA_INICIAL_ENVIO)
            .diasRetraso(UPDATED_DIAS_RETRASO)
            .estado(UPDATED_ESTADO);

        restDonacionesPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDonacionesPaquetes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDonacionesPaquetes))
            )
            .andExpect(status().isOk());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
        DonacionesPaquetes testDonacionesPaquetes = donacionesPaquetesList.get(donacionesPaquetesList.size() - 1);
        assertThat(testDonacionesPaquetes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDonacionesPaquetes.getMontoEnvio()).isEqualTo(UPDATED_MONTO_ENVIO);
        assertThat(testDonacionesPaquetes.getMontoImpuesto()).isEqualTo(UPDATED_MONTO_IMPUESTO);
        assertThat(testDonacionesPaquetes.getMontoTotal()).isEqualTo(UPDATED_MONTO_TOTAL);
        assertThat(testDonacionesPaquetes.getFechaDonacion()).isEqualTo(UPDATED_FECHA_DONACION);
        assertThat(testDonacionesPaquetes.getFechaEntrega()).isEqualTo(UPDATED_FECHA_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaPosibleEntrega()).isEqualTo(UPDATED_FECHA_POSIBLE_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaInicialEnvio()).isEqualTo(UPDATED_FECHA_INICIAL_ENVIO);
        assertThat(testDonacionesPaquetes.getDiasRetraso()).isEqualTo(UPDATED_DIAS_RETRASO);
        assertThat(testDonacionesPaquetes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();
        donacionesPaquetes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonacionesPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, donacionesPaquetes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();
        donacionesPaquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonacionesPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();
        donacionesPaquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonacionesPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDonacionesPaquetesWithPatch() throws Exception {
        // Initialize the database
        donacionesPaquetesRepository.saveAndFlush(donacionesPaquetes);

        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();

        // Update the donacionesPaquetes using partial update
        DonacionesPaquetes partialUpdatedDonacionesPaquetes = new DonacionesPaquetes();
        partialUpdatedDonacionesPaquetes.setId(donacionesPaquetes.getId());

        partialUpdatedDonacionesPaquetes.montoEnvio(UPDATED_MONTO_ENVIO);

        restDonacionesPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDonacionesPaquetes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDonacionesPaquetes))
            )
            .andExpect(status().isOk());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
        DonacionesPaquetes testDonacionesPaquetes = donacionesPaquetesList.get(donacionesPaquetesList.size() - 1);
        assertThat(testDonacionesPaquetes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDonacionesPaquetes.getMontoEnvio()).isEqualTo(UPDATED_MONTO_ENVIO);
        assertThat(testDonacionesPaquetes.getMontoImpuesto()).isEqualTo(DEFAULT_MONTO_IMPUESTO);
        assertThat(testDonacionesPaquetes.getMontoTotal()).isEqualTo(DEFAULT_MONTO_TOTAL);
        assertThat(testDonacionesPaquetes.getFechaDonacion()).isEqualTo(DEFAULT_FECHA_DONACION);
        assertThat(testDonacionesPaquetes.getFechaEntrega()).isEqualTo(DEFAULT_FECHA_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaPosibleEntrega()).isEqualTo(DEFAULT_FECHA_POSIBLE_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaInicialEnvio()).isEqualTo(DEFAULT_FECHA_INICIAL_ENVIO);
        assertThat(testDonacionesPaquetes.getDiasRetraso()).isEqualTo(DEFAULT_DIAS_RETRASO);
        assertThat(testDonacionesPaquetes.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateDonacionesPaquetesWithPatch() throws Exception {
        // Initialize the database
        donacionesPaquetesRepository.saveAndFlush(donacionesPaquetes);

        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();

        // Update the donacionesPaquetes using partial update
        DonacionesPaquetes partialUpdatedDonacionesPaquetes = new DonacionesPaquetes();
        partialUpdatedDonacionesPaquetes.setId(donacionesPaquetes.getId());

        partialUpdatedDonacionesPaquetes
            .descripcion(UPDATED_DESCRIPCION)
            .montoEnvio(UPDATED_MONTO_ENVIO)
            .montoImpuesto(UPDATED_MONTO_IMPUESTO)
            .montoTotal(UPDATED_MONTO_TOTAL)
            .fechaDonacion(UPDATED_FECHA_DONACION)
            .fechaEntrega(UPDATED_FECHA_ENTREGA)
            .fechaPosibleEntrega(UPDATED_FECHA_POSIBLE_ENTREGA)
            .fechaInicialEnvio(UPDATED_FECHA_INICIAL_ENVIO)
            .diasRetraso(UPDATED_DIAS_RETRASO)
            .estado(UPDATED_ESTADO);

        restDonacionesPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDonacionesPaquetes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDonacionesPaquetes))
            )
            .andExpect(status().isOk());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
        DonacionesPaquetes testDonacionesPaquetes = donacionesPaquetesList.get(donacionesPaquetesList.size() - 1);
        assertThat(testDonacionesPaquetes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDonacionesPaquetes.getMontoEnvio()).isEqualTo(UPDATED_MONTO_ENVIO);
        assertThat(testDonacionesPaquetes.getMontoImpuesto()).isEqualTo(UPDATED_MONTO_IMPUESTO);
        assertThat(testDonacionesPaquetes.getMontoTotal()).isEqualTo(UPDATED_MONTO_TOTAL);
        assertThat(testDonacionesPaquetes.getFechaDonacion()).isEqualTo(UPDATED_FECHA_DONACION);
        assertThat(testDonacionesPaquetes.getFechaEntrega()).isEqualTo(UPDATED_FECHA_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaPosibleEntrega()).isEqualTo(UPDATED_FECHA_POSIBLE_ENTREGA);
        assertThat(testDonacionesPaquetes.getFechaInicialEnvio()).isEqualTo(UPDATED_FECHA_INICIAL_ENVIO);
        assertThat(testDonacionesPaquetes.getDiasRetraso()).isEqualTo(UPDATED_DIAS_RETRASO);
        assertThat(testDonacionesPaquetes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();
        donacionesPaquetes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDonacionesPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, donacionesPaquetes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();
        donacionesPaquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonacionesPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDonacionesPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = donacionesPaquetesRepository.findAll().size();
        donacionesPaquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDonacionesPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(donacionesPaquetes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DonacionesPaquetes in the database
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDonacionesPaquetes() throws Exception {
        // Initialize the database
        donacionesPaquetesRepository.saveAndFlush(donacionesPaquetes);

        int databaseSizeBeforeDelete = donacionesPaquetesRepository.findAll().size();

        // Delete the donacionesPaquetes
        restDonacionesPaquetesMockMvc
            .perform(delete(ENTITY_API_URL_ID, donacionesPaquetes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DonacionesPaquetes> donacionesPaquetesList = donacionesPaquetesRepository.findAll();
        assertThat(donacionesPaquetesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
