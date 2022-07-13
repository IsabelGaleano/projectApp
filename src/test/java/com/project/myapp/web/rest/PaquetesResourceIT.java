package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Paquetes;
import com.project.myapp.repository.PaquetesRepository;
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
 * Integration tests for the {@link PaquetesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PaquetesResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Double DEFAULT_MONTO = 1D;
    private static final Double UPDATED_MONTO = 2D;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_DIMENSIONES = "AAAAAAAAAA";
    private static final String UPDATED_DIMENSIONES = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/paquetes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PaquetesRepository paquetesRepository;

    @Mock
    private PaquetesRepository paquetesRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaquetesMockMvc;

    private Paquetes paquetes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paquetes createEntity(EntityManager em) {
        Paquetes paquetes = new Paquetes()
            .nombre(DEFAULT_NOMBRE)
            .monto(DEFAULT_MONTO)
            .descripcion(DEFAULT_DESCRIPCION)
            .dimensiones(DEFAULT_DIMENSIONES)
            .estado(DEFAULT_ESTADO);
        return paquetes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paquetes createUpdatedEntity(EntityManager em) {
        Paquetes paquetes = new Paquetes()
            .nombre(UPDATED_NOMBRE)
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .dimensiones(UPDATED_DIMENSIONES)
            .estado(UPDATED_ESTADO);
        return paquetes;
    }

    @BeforeEach
    public void initTest() {
        paquetes = createEntity(em);
    }

    @Test
    @Transactional
    void createPaquetes() throws Exception {
        int databaseSizeBeforeCreate = paquetesRepository.findAll().size();
        // Create the Paquetes
        restPaquetesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paquetes)))
            .andExpect(status().isCreated());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeCreate + 1);
        Paquetes testPaquetes = paquetesList.get(paquetesList.size() - 1);
        assertThat(testPaquetes.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPaquetes.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testPaquetes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPaquetes.getDimensiones()).isEqualTo(DEFAULT_DIMENSIONES);
        assertThat(testPaquetes.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createPaquetesWithExistingId() throws Exception {
        // Create the Paquetes with an existing ID
        paquetes.setId(1L);

        int databaseSizeBeforeCreate = paquetesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaquetesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paquetes)))
            .andExpect(status().isBadRequest());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPaquetes() throws Exception {
        // Initialize the database
        paquetesRepository.saveAndFlush(paquetes);

        // Get all the paquetesList
        restPaquetesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paquetes.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].dimensiones").value(hasItem(DEFAULT_DIMENSIONES)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPaquetesWithEagerRelationshipsIsEnabled() throws Exception {
        when(paquetesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPaquetesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(paquetesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPaquetesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(paquetesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPaquetesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(paquetesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getPaquetes() throws Exception {
        // Initialize the database
        paquetesRepository.saveAndFlush(paquetes);

        // Get the paquetes
        restPaquetesMockMvc
            .perform(get(ENTITY_API_URL_ID, paquetes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paquetes.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.dimensiones").value(DEFAULT_DIMENSIONES))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingPaquetes() throws Exception {
        // Get the paquetes
        restPaquetesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPaquetes() throws Exception {
        // Initialize the database
        paquetesRepository.saveAndFlush(paquetes);

        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();

        // Update the paquetes
        Paquetes updatedPaquetes = paquetesRepository.findById(paquetes.getId()).get();
        // Disconnect from session so that the updates on updatedPaquetes are not directly saved in db
        em.detach(updatedPaquetes);
        updatedPaquetes
            .nombre(UPDATED_NOMBRE)
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .dimensiones(UPDATED_DIMENSIONES)
            .estado(UPDATED_ESTADO);

        restPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPaquetes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPaquetes))
            )
            .andExpect(status().isOk());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
        Paquetes testPaquetes = paquetesList.get(paquetesList.size() - 1);
        assertThat(testPaquetes.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPaquetes.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testPaquetes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPaquetes.getDimensiones()).isEqualTo(UPDATED_DIMENSIONES);
        assertThat(testPaquetes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();
        paquetes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, paquetes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();
        paquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaquetesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(paquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();
        paquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaquetesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(paquetes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePaquetesWithPatch() throws Exception {
        // Initialize the database
        paquetesRepository.saveAndFlush(paquetes);

        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();

        // Update the paquetes using partial update
        Paquetes partialUpdatedPaquetes = new Paquetes();
        partialUpdatedPaquetes.setId(paquetes.getId());

        partialUpdatedPaquetes.nombre(UPDATED_NOMBRE).dimensiones(UPDATED_DIMENSIONES);

        restPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPaquetes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPaquetes))
            )
            .andExpect(status().isOk());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
        Paquetes testPaquetes = paquetesList.get(paquetesList.size() - 1);
        assertThat(testPaquetes.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPaquetes.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testPaquetes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPaquetes.getDimensiones()).isEqualTo(UPDATED_DIMENSIONES);
        assertThat(testPaquetes.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdatePaquetesWithPatch() throws Exception {
        // Initialize the database
        paquetesRepository.saveAndFlush(paquetes);

        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();

        // Update the paquetes using partial update
        Paquetes partialUpdatedPaquetes = new Paquetes();
        partialUpdatedPaquetes.setId(paquetes.getId());

        partialUpdatedPaquetes
            .nombre(UPDATED_NOMBRE)
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .dimensiones(UPDATED_DIMENSIONES)
            .estado(UPDATED_ESTADO);

        restPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPaquetes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPaquetes))
            )
            .andExpect(status().isOk());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
        Paquetes testPaquetes = paquetesList.get(paquetesList.size() - 1);
        assertThat(testPaquetes.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPaquetes.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testPaquetes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPaquetes.getDimensiones()).isEqualTo(UPDATED_DIMENSIONES);
        assertThat(testPaquetes.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();
        paquetes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, paquetes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();
        paquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaquetesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(paquetes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPaquetes() throws Exception {
        int databaseSizeBeforeUpdate = paquetesRepository.findAll().size();
        paquetes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPaquetesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(paquetes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Paquetes in the database
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePaquetes() throws Exception {
        // Initialize the database
        paquetesRepository.saveAndFlush(paquetes);

        int databaseSizeBeforeDelete = paquetesRepository.findAll().size();

        // Delete the paquetes
        restPaquetesMockMvc
            .perform(delete(ENTITY_API_URL_ID, paquetes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Paquetes> paquetesList = paquetesRepository.findAll();
        assertThat(paquetesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
