package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Mensajes;
import com.project.myapp.repository.MensajesRepository;
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
 * Integration tests for the {@link MensajesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class MensajesResourceIT {

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TIPO_REMITENTE = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_REMITENTE = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_RECEPTOR = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_RECEPTOR = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/mensajes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MensajesRepository mensajesRepository;

    @Mock
    private MensajesRepository mensajesRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMensajesMockMvc;

    private Mensajes mensajes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mensajes createEntity(EntityManager em) {
        Mensajes mensajes = new Mensajes()
            .mensaje(DEFAULT_MENSAJE)
            .fecha(DEFAULT_FECHA)
            .tipoRemitente(DEFAULT_TIPO_REMITENTE)
            .tipoReceptor(DEFAULT_TIPO_RECEPTOR)
            .estado(DEFAULT_ESTADO);
        return mensajes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mensajes createUpdatedEntity(EntityManager em) {
        Mensajes mensajes = new Mensajes()
            .mensaje(UPDATED_MENSAJE)
            .fecha(UPDATED_FECHA)
            .tipoRemitente(UPDATED_TIPO_REMITENTE)
            .tipoReceptor(UPDATED_TIPO_RECEPTOR)
            .estado(UPDATED_ESTADO);
        return mensajes;
    }

    @BeforeEach
    public void initTest() {
        mensajes = createEntity(em);
    }

    @Test
    @Transactional
    void createMensajes() throws Exception {
        int databaseSizeBeforeCreate = mensajesRepository.findAll().size();
        // Create the Mensajes
        restMensajesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isCreated());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeCreate + 1);
        Mensajes testMensajes = mensajesList.get(mensajesList.size() - 1);
        assertThat(testMensajes.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testMensajes.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMensajes.getTipoRemitente()).isEqualTo(DEFAULT_TIPO_REMITENTE);
        assertThat(testMensajes.getTipoReceptor()).isEqualTo(DEFAULT_TIPO_RECEPTOR);
        assertThat(testMensajes.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createMensajesWithExistingId() throws Exception {
        // Create the Mensajes with an existing ID
        mensajes.setId(1L);

        int databaseSizeBeforeCreate = mensajesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMensajesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        // Get all the mensajesList
        restMensajesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mensajes.getId().intValue())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].tipoRemitente").value(hasItem(DEFAULT_TIPO_REMITENTE)))
            .andExpect(jsonPath("$.[*].tipoReceptor").value(hasItem(DEFAULT_TIPO_RECEPTOR)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMensajesWithEagerRelationshipsIsEnabled() throws Exception {
        when(mensajesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMensajesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(mensajesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMensajesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(mensajesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMensajesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(mensajesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        // Get the mensajes
        restMensajesMockMvc
            .perform(get(ENTITY_API_URL_ID, mensajes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mensajes.getId().intValue()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.tipoRemitente").value(DEFAULT_TIPO_REMITENTE))
            .andExpect(jsonPath("$.tipoReceptor").value(DEFAULT_TIPO_RECEPTOR))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingMensajes() throws Exception {
        // Get the mensajes
        restMensajesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();

        // Update the mensajes
        Mensajes updatedMensajes = mensajesRepository.findById(mensajes.getId()).get();
        // Disconnect from session so that the updates on updatedMensajes are not directly saved in db
        em.detach(updatedMensajes);
        updatedMensajes
            .mensaje(UPDATED_MENSAJE)
            .fecha(UPDATED_FECHA)
            .tipoRemitente(UPDATED_TIPO_REMITENTE)
            .tipoReceptor(UPDATED_TIPO_RECEPTOR)
            .estado(UPDATED_ESTADO);

        restMensajesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMensajes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMensajes))
            )
            .andExpect(status().isOk());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
        Mensajes testMensajes = mensajesList.get(mensajesList.size() - 1);
        assertThat(testMensajes.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testMensajes.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMensajes.getTipoRemitente()).isEqualTo(UPDATED_TIPO_REMITENTE);
        assertThat(testMensajes.getTipoReceptor()).isEqualTo(UPDATED_TIPO_RECEPTOR);
        assertThat(testMensajes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();
        mensajes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMensajesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, mensajes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mensajes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();
        mensajes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMensajesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(mensajes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();
        mensajes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMensajesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMensajesWithPatch() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();

        // Update the mensajes using partial update
        Mensajes partialUpdatedMensajes = new Mensajes();
        partialUpdatedMensajes.setId(mensajes.getId());

        partialUpdatedMensajes.fecha(UPDATED_FECHA).tipoRemitente(UPDATED_TIPO_REMITENTE).estado(UPDATED_ESTADO);

        restMensajesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMensajes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMensajes))
            )
            .andExpect(status().isOk());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
        Mensajes testMensajes = mensajesList.get(mensajesList.size() - 1);
        assertThat(testMensajes.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testMensajes.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMensajes.getTipoRemitente()).isEqualTo(UPDATED_TIPO_REMITENTE);
        assertThat(testMensajes.getTipoReceptor()).isEqualTo(DEFAULT_TIPO_RECEPTOR);
        assertThat(testMensajes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateMensajesWithPatch() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();

        // Update the mensajes using partial update
        Mensajes partialUpdatedMensajes = new Mensajes();
        partialUpdatedMensajes.setId(mensajes.getId());

        partialUpdatedMensajes
            .mensaje(UPDATED_MENSAJE)
            .fecha(UPDATED_FECHA)
            .tipoRemitente(UPDATED_TIPO_REMITENTE)
            .tipoReceptor(UPDATED_TIPO_RECEPTOR)
            .estado(UPDATED_ESTADO);

        restMensajesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMensajes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMensajes))
            )
            .andExpect(status().isOk());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
        Mensajes testMensajes = mensajesList.get(mensajesList.size() - 1);
        assertThat(testMensajes.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testMensajes.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMensajes.getTipoRemitente()).isEqualTo(UPDATED_TIPO_REMITENTE);
        assertThat(testMensajes.getTipoReceptor()).isEqualTo(UPDATED_TIPO_RECEPTOR);
        assertThat(testMensajes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();
        mensajes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMensajesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, mensajes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mensajes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();
        mensajes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMensajesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(mensajes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMensajes() throws Exception {
        int databaseSizeBeforeUpdate = mensajesRepository.findAll().size();
        mensajes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMensajesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(mensajes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Mensajes in the database
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMensajes() throws Exception {
        // Initialize the database
        mensajesRepository.saveAndFlush(mensajes);

        int databaseSizeBeforeDelete = mensajesRepository.findAll().size();

        // Delete the mensajes
        restMensajesMockMvc
            .perform(delete(ENTITY_API_URL_ID, mensajes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mensajes> mensajesList = mensajesRepository.findAll();
        assertThat(mensajesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
