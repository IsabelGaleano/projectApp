package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Votos;
import com.project.myapp.repository.VotosRepository;
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
 * Integration tests for the {@link VotosResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class VotosResourceIT {

    private static final Integer DEFAULT_VOTOS = 1;
    private static final Integer UPDATED_VOTOS = 2;

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/votos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VotosRepository votosRepository;

    @Mock
    private VotosRepository votosRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVotosMockMvc;

    private Votos votos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Votos createEntity(EntityManager em) {
        Votos votos = new Votos().votos(DEFAULT_VOTOS).estado(DEFAULT_ESTADO).fecha(DEFAULT_FECHA);
        return votos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Votos createUpdatedEntity(EntityManager em) {
        Votos votos = new Votos().votos(UPDATED_VOTOS).estado(UPDATED_ESTADO).fecha(UPDATED_FECHA);
        return votos;
    }

    @BeforeEach
    public void initTest() {
        votos = createEntity(em);
    }

    @Test
    @Transactional
    void createVotos() throws Exception {
        int databaseSizeBeforeCreate = votosRepository.findAll().size();
        // Create the Votos
        restVotosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votos)))
            .andExpect(status().isCreated());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeCreate + 1);
        Votos testVotos = votosList.get(votosList.size() - 1);
        assertThat(testVotos.getVotos()).isEqualTo(DEFAULT_VOTOS);
        assertThat(testVotos.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testVotos.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    void createVotosWithExistingId() throws Exception {
        // Create the Votos with an existing ID
        votos.setId(1L);

        int databaseSizeBeforeCreate = votosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVotosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votos)))
            .andExpect(status().isBadRequest());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVotos() throws Exception {
        // Initialize the database
        votosRepository.saveAndFlush(votos);

        // Get all the votosList
        restVotosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(votos.getId().intValue())))
            .andExpect(jsonPath("$.[*].votos").value(hasItem(DEFAULT_VOTOS)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllVotosWithEagerRelationshipsIsEnabled() throws Exception {
        when(votosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restVotosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(votosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllVotosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(votosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restVotosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(votosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getVotos() throws Exception {
        // Initialize the database
        votosRepository.saveAndFlush(votos);

        // Get the votos
        restVotosMockMvc
            .perform(get(ENTITY_API_URL_ID, votos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(votos.getId().intValue()))
            .andExpect(jsonPath("$.votos").value(DEFAULT_VOTOS))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)));
    }

    @Test
    @Transactional
    void getNonExistingVotos() throws Exception {
        // Get the votos
        restVotosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewVotos() throws Exception {
        // Initialize the database
        votosRepository.saveAndFlush(votos);

        int databaseSizeBeforeUpdate = votosRepository.findAll().size();

        // Update the votos
        Votos updatedVotos = votosRepository.findById(votos.getId()).get();
        // Disconnect from session so that the updates on updatedVotos are not directly saved in db
        em.detach(updatedVotos);
        updatedVotos.votos(UPDATED_VOTOS).estado(UPDATED_ESTADO).fecha(UPDATED_FECHA);

        restVotosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVotos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVotos))
            )
            .andExpect(status().isOk());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
        Votos testVotos = votosList.get(votosList.size() - 1);
        assertThat(testVotos.getVotos()).isEqualTo(UPDATED_VOTOS);
        assertThat(testVotos.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testVotos.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    void putNonExistingVotos() throws Exception {
        int databaseSizeBeforeUpdate = votosRepository.findAll().size();
        votos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, votos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(votos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVotos() throws Exception {
        int databaseSizeBeforeUpdate = votosRepository.findAll().size();
        votos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(votos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVotos() throws Exception {
        int databaseSizeBeforeUpdate = votosRepository.findAll().size();
        votos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(votos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVotosWithPatch() throws Exception {
        // Initialize the database
        votosRepository.saveAndFlush(votos);

        int databaseSizeBeforeUpdate = votosRepository.findAll().size();

        // Update the votos using partial update
        Votos partialUpdatedVotos = new Votos();
        partialUpdatedVotos.setId(votos.getId());

        partialUpdatedVotos.estado(UPDATED_ESTADO);

        restVotosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVotos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVotos))
            )
            .andExpect(status().isOk());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
        Votos testVotos = votosList.get(votosList.size() - 1);
        assertThat(testVotos.getVotos()).isEqualTo(DEFAULT_VOTOS);
        assertThat(testVotos.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testVotos.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    void fullUpdateVotosWithPatch() throws Exception {
        // Initialize the database
        votosRepository.saveAndFlush(votos);

        int databaseSizeBeforeUpdate = votosRepository.findAll().size();

        // Update the votos using partial update
        Votos partialUpdatedVotos = new Votos();
        partialUpdatedVotos.setId(votos.getId());

        partialUpdatedVotos.votos(UPDATED_VOTOS).estado(UPDATED_ESTADO).fecha(UPDATED_FECHA);

        restVotosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVotos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVotos))
            )
            .andExpect(status().isOk());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
        Votos testVotos = votosList.get(votosList.size() - 1);
        assertThat(testVotos.getVotos()).isEqualTo(UPDATED_VOTOS);
        assertThat(testVotos.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testVotos.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    void patchNonExistingVotos() throws Exception {
        int databaseSizeBeforeUpdate = votosRepository.findAll().size();
        votos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVotosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, votos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(votos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVotos() throws Exception {
        int databaseSizeBeforeUpdate = votosRepository.findAll().size();
        votos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(votos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVotos() throws Exception {
        int databaseSizeBeforeUpdate = votosRepository.findAll().size();
        votos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVotosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(votos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Votos in the database
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVotos() throws Exception {
        // Initialize the database
        votosRepository.saveAndFlush(votos);

        int databaseSizeBeforeDelete = votosRepository.findAll().size();

        // Delete the votos
        restVotosMockMvc
            .perform(delete(ENTITY_API_URL_ID, votos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Votos> votosList = votosRepository.findAll();
        assertThat(votosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
