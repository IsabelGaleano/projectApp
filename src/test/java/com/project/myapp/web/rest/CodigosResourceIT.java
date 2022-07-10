package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Codigos;
import com.project.myapp.repository.CodigosRepository;
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
 * Integration tests for the {@link CodigosResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CodigosResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/codigos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CodigosRepository codigosRepository;

    @Mock
    private CodigosRepository codigosRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCodigosMockMvc;

    private Codigos codigos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Codigos createEntity(EntityManager em) {
        Codigos codigos = new Codigos().codigo(DEFAULT_CODIGO).estado(DEFAULT_ESTADO);
        return codigos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Codigos createUpdatedEntity(EntityManager em) {
        Codigos codigos = new Codigos().codigo(UPDATED_CODIGO).estado(UPDATED_ESTADO);
        return codigos;
    }

    @BeforeEach
    public void initTest() {
        codigos = createEntity(em);
    }

    @Test
    @Transactional
    void createCodigos() throws Exception {
        int databaseSizeBeforeCreate = codigosRepository.findAll().size();
        // Create the Codigos
        restCodigosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigos)))
            .andExpect(status().isCreated());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeCreate + 1);
        Codigos testCodigos = codigosList.get(codigosList.size() - 1);
        assertThat(testCodigos.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testCodigos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createCodigosWithExistingId() throws Exception {
        // Create the Codigos with an existing ID
        codigos.setId(1L);

        int databaseSizeBeforeCreate = codigosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCodigosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigos)))
            .andExpect(status().isBadRequest());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCodigos() throws Exception {
        // Initialize the database
        codigosRepository.saveAndFlush(codigos);

        // Get all the codigosList
        restCodigosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(codigos.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCodigosWithEagerRelationshipsIsEnabled() throws Exception {
        when(codigosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCodigosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(codigosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCodigosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(codigosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCodigosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(codigosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getCodigos() throws Exception {
        // Initialize the database
        codigosRepository.saveAndFlush(codigos);

        // Get the codigos
        restCodigosMockMvc
            .perform(get(ENTITY_API_URL_ID, codigos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(codigos.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingCodigos() throws Exception {
        // Get the codigos
        restCodigosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCodigos() throws Exception {
        // Initialize the database
        codigosRepository.saveAndFlush(codigos);

        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();

        // Update the codigos
        Codigos updatedCodigos = codigosRepository.findById(codigos.getId()).get();
        // Disconnect from session so that the updates on updatedCodigos are not directly saved in db
        em.detach(updatedCodigos);
        updatedCodigos.codigo(UPDATED_CODIGO).estado(UPDATED_ESTADO);

        restCodigosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCodigos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCodigos))
            )
            .andExpect(status().isOk());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
        Codigos testCodigos = codigosList.get(codigosList.size() - 1);
        assertThat(testCodigos.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCodigos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingCodigos() throws Exception {
        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();
        codigos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCodigosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, codigos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(codigos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCodigos() throws Exception {
        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();
        codigos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(codigos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCodigos() throws Exception {
        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();
        codigos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(codigos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCodigosWithPatch() throws Exception {
        // Initialize the database
        codigosRepository.saveAndFlush(codigos);

        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();

        // Update the codigos using partial update
        Codigos partialUpdatedCodigos = new Codigos();
        partialUpdatedCodigos.setId(codigos.getId());

        partialUpdatedCodigos.codigo(UPDATED_CODIGO);

        restCodigosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCodigos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCodigos))
            )
            .andExpect(status().isOk());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
        Codigos testCodigos = codigosList.get(codigosList.size() - 1);
        assertThat(testCodigos.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCodigos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateCodigosWithPatch() throws Exception {
        // Initialize the database
        codigosRepository.saveAndFlush(codigos);

        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();

        // Update the codigos using partial update
        Codigos partialUpdatedCodigos = new Codigos();
        partialUpdatedCodigos.setId(codigos.getId());

        partialUpdatedCodigos.codigo(UPDATED_CODIGO).estado(UPDATED_ESTADO);

        restCodigosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCodigos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCodigos))
            )
            .andExpect(status().isOk());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
        Codigos testCodigos = codigosList.get(codigosList.size() - 1);
        assertThat(testCodigos.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCodigos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingCodigos() throws Exception {
        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();
        codigos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCodigosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, codigos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(codigos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCodigos() throws Exception {
        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();
        codigos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(codigos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCodigos() throws Exception {
        int databaseSizeBeforeUpdate = codigosRepository.findAll().size();
        codigos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCodigosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(codigos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Codigos in the database
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCodigos() throws Exception {
        // Initialize the database
        codigosRepository.saveAndFlush(codigos);

        int databaseSizeBeforeDelete = codigosRepository.findAll().size();

        // Delete the codigos
        restCodigosMockMvc
            .perform(delete(ENTITY_API_URL_ID, codigos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Codigos> codigosList = codigosRepository.findAll();
        assertThat(codigosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
