package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Reuniones;
import com.project.myapp.repository.ReunionesRepository;
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
 * Integration tests for the {@link ReunionesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ReunionesResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_SOLICITADA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_SOLICITADA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_REUNION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_REUNION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_HORA_REUNION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_REUNION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/reuniones";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReunionesRepository reunionesRepository;

    @Mock
    private ReunionesRepository reunionesRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReunionesMockMvc;

    private Reuniones reuniones;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reuniones createEntity(EntityManager em) {
        Reuniones reuniones = new Reuniones()
            .url(DEFAULT_URL)
            .descripcion(DEFAULT_DESCRIPCION)
            .fechaSolicitada(DEFAULT_FECHA_SOLICITADA)
            .fechaReunion(DEFAULT_FECHA_REUNION)
            .horaReunion(DEFAULT_HORA_REUNION)
            .estado(DEFAULT_ESTADO);
        return reuniones;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reuniones createUpdatedEntity(EntityManager em) {
        Reuniones reuniones = new Reuniones()
            .url(UPDATED_URL)
            .descripcion(UPDATED_DESCRIPCION)
            .fechaSolicitada(UPDATED_FECHA_SOLICITADA)
            .fechaReunion(UPDATED_FECHA_REUNION)
            .horaReunion(UPDATED_HORA_REUNION)
            .estado(UPDATED_ESTADO);
        return reuniones;
    }

    @BeforeEach
    public void initTest() {
        reuniones = createEntity(em);
    }

    @Test
    @Transactional
    void createReuniones() throws Exception {
        int databaseSizeBeforeCreate = reunionesRepository.findAll().size();
        // Create the Reuniones
        restReunionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniones)))
            .andExpect(status().isCreated());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeCreate + 1);
        Reuniones testReuniones = reunionesList.get(reunionesList.size() - 1);
        assertThat(testReuniones.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testReuniones.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testReuniones.getFechaSolicitada()).isEqualTo(DEFAULT_FECHA_SOLICITADA);
        assertThat(testReuniones.getFechaReunion()).isEqualTo(DEFAULT_FECHA_REUNION);
        assertThat(testReuniones.getHoraReunion()).isEqualTo(DEFAULT_HORA_REUNION);
        assertThat(testReuniones.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createReunionesWithExistingId() throws Exception {
        // Create the Reuniones with an existing ID
        reuniones.setId(1L);

        int databaseSizeBeforeCreate = reunionesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReunionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniones)))
            .andExpect(status().isBadRequest());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReuniones() throws Exception {
        // Initialize the database
        reunionesRepository.saveAndFlush(reuniones);

        // Get all the reunionesList
        restReunionesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reuniones.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].fechaSolicitada").value(hasItem(sameInstant(DEFAULT_FECHA_SOLICITADA))))
            .andExpect(jsonPath("$.[*].fechaReunion").value(hasItem(sameInstant(DEFAULT_FECHA_REUNION))))
            .andExpect(jsonPath("$.[*].horaReunion").value(hasItem(sameInstant(DEFAULT_HORA_REUNION))))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllReunionesWithEagerRelationshipsIsEnabled() throws Exception {
        when(reunionesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restReunionesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(reunionesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllReunionesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(reunionesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restReunionesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(reunionesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getReuniones() throws Exception {
        // Initialize the database
        reunionesRepository.saveAndFlush(reuniones);

        // Get the reuniones
        restReunionesMockMvc
            .perform(get(ENTITY_API_URL_ID, reuniones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reuniones.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.fechaSolicitada").value(sameInstant(DEFAULT_FECHA_SOLICITADA)))
            .andExpect(jsonPath("$.fechaReunion").value(sameInstant(DEFAULT_FECHA_REUNION)))
            .andExpect(jsonPath("$.horaReunion").value(sameInstant(DEFAULT_HORA_REUNION)))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingReuniones() throws Exception {
        // Get the reuniones
        restReunionesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewReuniones() throws Exception {
        // Initialize the database
        reunionesRepository.saveAndFlush(reuniones);

        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();

        // Update the reuniones
        Reuniones updatedReuniones = reunionesRepository.findById(reuniones.getId()).get();
        // Disconnect from session so that the updates on updatedReuniones are not directly saved in db
        em.detach(updatedReuniones);
        updatedReuniones
            .url(UPDATED_URL)
            .descripcion(UPDATED_DESCRIPCION)
            .fechaSolicitada(UPDATED_FECHA_SOLICITADA)
            .fechaReunion(UPDATED_FECHA_REUNION)
            .horaReunion(UPDATED_HORA_REUNION)
            .estado(UPDATED_ESTADO);

        restReunionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReuniones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReuniones))
            )
            .andExpect(status().isOk());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
        Reuniones testReuniones = reunionesList.get(reunionesList.size() - 1);
        assertThat(testReuniones.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testReuniones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testReuniones.getFechaSolicitada()).isEqualTo(UPDATED_FECHA_SOLICITADA);
        assertThat(testReuniones.getFechaReunion()).isEqualTo(UPDATED_FECHA_REUNION);
        assertThat(testReuniones.getHoraReunion()).isEqualTo(UPDATED_HORA_REUNION);
        assertThat(testReuniones.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingReuniones() throws Exception {
        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();
        reuniones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReunionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, reuniones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reuniones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReuniones() throws Exception {
        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();
        reuniones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReunionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(reuniones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReuniones() throws Exception {
        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();
        reuniones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReunionesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(reuniones)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReunionesWithPatch() throws Exception {
        // Initialize the database
        reunionesRepository.saveAndFlush(reuniones);

        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();

        // Update the reuniones using partial update
        Reuniones partialUpdatedReuniones = new Reuniones();
        partialUpdatedReuniones.setId(reuniones.getId());

        partialUpdatedReuniones.descripcion(UPDATED_DESCRIPCION).horaReunion(UPDATED_HORA_REUNION);

        restReunionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReuniones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReuniones))
            )
            .andExpect(status().isOk());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
        Reuniones testReuniones = reunionesList.get(reunionesList.size() - 1);
        assertThat(testReuniones.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testReuniones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testReuniones.getFechaSolicitada()).isEqualTo(DEFAULT_FECHA_SOLICITADA);
        assertThat(testReuniones.getFechaReunion()).isEqualTo(DEFAULT_FECHA_REUNION);
        assertThat(testReuniones.getHoraReunion()).isEqualTo(UPDATED_HORA_REUNION);
        assertThat(testReuniones.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateReunionesWithPatch() throws Exception {
        // Initialize the database
        reunionesRepository.saveAndFlush(reuniones);

        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();

        // Update the reuniones using partial update
        Reuniones partialUpdatedReuniones = new Reuniones();
        partialUpdatedReuniones.setId(reuniones.getId());

        partialUpdatedReuniones
            .url(UPDATED_URL)
            .descripcion(UPDATED_DESCRIPCION)
            .fechaSolicitada(UPDATED_FECHA_SOLICITADA)
            .fechaReunion(UPDATED_FECHA_REUNION)
            .horaReunion(UPDATED_HORA_REUNION)
            .estado(UPDATED_ESTADO);

        restReunionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReuniones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReuniones))
            )
            .andExpect(status().isOk());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
        Reuniones testReuniones = reunionesList.get(reunionesList.size() - 1);
        assertThat(testReuniones.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testReuniones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testReuniones.getFechaSolicitada()).isEqualTo(UPDATED_FECHA_SOLICITADA);
        assertThat(testReuniones.getFechaReunion()).isEqualTo(UPDATED_FECHA_REUNION);
        assertThat(testReuniones.getHoraReunion()).isEqualTo(UPDATED_HORA_REUNION);
        assertThat(testReuniones.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingReuniones() throws Exception {
        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();
        reuniones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReunionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, reuniones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reuniones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReuniones() throws Exception {
        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();
        reuniones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReunionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(reuniones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReuniones() throws Exception {
        int databaseSizeBeforeUpdate = reunionesRepository.findAll().size();
        reuniones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReunionesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(reuniones))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Reuniones in the database
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReuniones() throws Exception {
        // Initialize the database
        reunionesRepository.saveAndFlush(reuniones);

        int databaseSizeBeforeDelete = reunionesRepository.findAll().size();

        // Delete the reuniones
        restReunionesMockMvc
            .perform(delete(ENTITY_API_URL_ID, reuniones.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reuniones> reunionesList = reunionesRepository.findAll();
        assertThat(reunionesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
