package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Notificaciones;
import com.project.myapp.repository.NotificacionesRepository;
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
 * Integration tests for the {@link NotificacionesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class NotificacionesResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TIPO_REMITENTE = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_REMITENTE = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_RECEPTOR = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_RECEPTOR = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/notificaciones";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NotificacionesRepository notificacionesRepository;

    @Mock
    private NotificacionesRepository notificacionesRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNotificacionesMockMvc;

    private Notificaciones notificaciones;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notificaciones createEntity(EntityManager em) {
        Notificaciones notificaciones = new Notificaciones()
            .tipo(DEFAULT_TIPO)
            .descripcion(DEFAULT_DESCRIPCION)
            .fecha(DEFAULT_FECHA)
            .tipoRemitente(DEFAULT_TIPO_REMITENTE)
            .tipoReceptor(DEFAULT_TIPO_RECEPTOR)
            .estado(DEFAULT_ESTADO);
        return notificaciones;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notificaciones createUpdatedEntity(EntityManager em) {
        Notificaciones notificaciones = new Notificaciones()
            .tipo(UPDATED_TIPO)
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .tipoRemitente(UPDATED_TIPO_REMITENTE)
            .tipoReceptor(UPDATED_TIPO_RECEPTOR)
            .estado(UPDATED_ESTADO);
        return notificaciones;
    }

    @BeforeEach
    public void initTest() {
        notificaciones = createEntity(em);
    }

    @Test
    @Transactional
    void createNotificaciones() throws Exception {
        int databaseSizeBeforeCreate = notificacionesRepository.findAll().size();
        // Create the Notificaciones
        restNotificacionesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isCreated());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeCreate + 1);
        Notificaciones testNotificaciones = notificacionesList.get(notificacionesList.size() - 1);
        assertThat(testNotificaciones.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testNotificaciones.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testNotificaciones.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testNotificaciones.getTipoRemitente()).isEqualTo(DEFAULT_TIPO_REMITENTE);
        assertThat(testNotificaciones.getTipoReceptor()).isEqualTo(DEFAULT_TIPO_RECEPTOR);
        assertThat(testNotificaciones.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createNotificacionesWithExistingId() throws Exception {
        // Create the Notificaciones with an existing ID
        notificaciones.setId(1L);

        int databaseSizeBeforeCreate = notificacionesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotificacionesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        // Get all the notificacionesList
        restNotificacionesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notificaciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].tipoRemitente").value(hasItem(DEFAULT_TIPO_REMITENTE)))
            .andExpect(jsonPath("$.[*].tipoReceptor").value(hasItem(DEFAULT_TIPO_RECEPTOR)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllNotificacionesWithEagerRelationshipsIsEnabled() throws Exception {
        when(notificacionesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNotificacionesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(notificacionesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllNotificacionesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(notificacionesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restNotificacionesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(notificacionesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        // Get the notificaciones
        restNotificacionesMockMvc
            .perform(get(ENTITY_API_URL_ID, notificaciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(notificaciones.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.tipoRemitente").value(DEFAULT_TIPO_REMITENTE))
            .andExpect(jsonPath("$.tipoReceptor").value(DEFAULT_TIPO_RECEPTOR))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingNotificaciones() throws Exception {
        // Get the notificaciones
        restNotificacionesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();

        // Update the notificaciones
        Notificaciones updatedNotificaciones = notificacionesRepository.findById(notificaciones.getId()).get();
        // Disconnect from session so that the updates on updatedNotificaciones are not directly saved in db
        em.detach(updatedNotificaciones);
        updatedNotificaciones
            .tipo(UPDATED_TIPO)
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .tipoRemitente(UPDATED_TIPO_REMITENTE)
            .tipoReceptor(UPDATED_TIPO_RECEPTOR)
            .estado(UPDATED_ESTADO);

        restNotificacionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNotificaciones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNotificaciones))
            )
            .andExpect(status().isOk());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
        Notificaciones testNotificaciones = notificacionesList.get(notificacionesList.size() - 1);
        assertThat(testNotificaciones.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testNotificaciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testNotificaciones.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testNotificaciones.getTipoRemitente()).isEqualTo(UPDATED_TIPO_REMITENTE);
        assertThat(testNotificaciones.getTipoReceptor()).isEqualTo(UPDATED_TIPO_RECEPTOR);
        assertThat(testNotificaciones.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();
        notificaciones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotificacionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, notificaciones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();
        notificaciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNotificacionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();
        notificaciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNotificacionesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(notificaciones)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNotificacionesWithPatch() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();

        // Update the notificaciones using partial update
        Notificaciones partialUpdatedNotificaciones = new Notificaciones();
        partialUpdatedNotificaciones.setId(notificaciones.getId());

        partialUpdatedNotificaciones.tipo(UPDATED_TIPO).fecha(UPDATED_FECHA).tipoRemitente(UPDATED_TIPO_REMITENTE);

        restNotificacionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNotificaciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNotificaciones))
            )
            .andExpect(status().isOk());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
        Notificaciones testNotificaciones = notificacionesList.get(notificacionesList.size() - 1);
        assertThat(testNotificaciones.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testNotificaciones.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testNotificaciones.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testNotificaciones.getTipoRemitente()).isEqualTo(UPDATED_TIPO_REMITENTE);
        assertThat(testNotificaciones.getTipoReceptor()).isEqualTo(DEFAULT_TIPO_RECEPTOR);
        assertThat(testNotificaciones.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateNotificacionesWithPatch() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();

        // Update the notificaciones using partial update
        Notificaciones partialUpdatedNotificaciones = new Notificaciones();
        partialUpdatedNotificaciones.setId(notificaciones.getId());

        partialUpdatedNotificaciones
            .tipo(UPDATED_TIPO)
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .tipoRemitente(UPDATED_TIPO_REMITENTE)
            .tipoReceptor(UPDATED_TIPO_RECEPTOR)
            .estado(UPDATED_ESTADO);

        restNotificacionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNotificaciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNotificaciones))
            )
            .andExpect(status().isOk());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
        Notificaciones testNotificaciones = notificacionesList.get(notificacionesList.size() - 1);
        assertThat(testNotificaciones.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testNotificaciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testNotificaciones.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testNotificaciones.getTipoRemitente()).isEqualTo(UPDATED_TIPO_REMITENTE);
        assertThat(testNotificaciones.getTipoReceptor()).isEqualTo(UPDATED_TIPO_RECEPTOR);
        assertThat(testNotificaciones.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();
        notificaciones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotificacionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, notificaciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();
        notificaciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNotificacionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();
        notificaciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNotificacionesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(notificaciones))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        int databaseSizeBeforeDelete = notificacionesRepository.findAll().size();

        // Delete the notificaciones
        restNotificacionesMockMvc
            .perform(delete(ENTITY_API_URL_ID, notificaciones.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
