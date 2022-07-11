package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Categorias;
import com.project.myapp.repository.CategoriasRepository;
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
 * Integration tests for the {@link CategoriasResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CategoriasResourceIT {

    private static final String DEFAULT_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIA = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/categorias";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CategoriasRepository categoriasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCategoriasMockMvc;

    private Categorias categorias;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Categorias createEntity(EntityManager em) {
        Categorias categorias = new Categorias().categoria(DEFAULT_CATEGORIA).estado(DEFAULT_ESTADO);
        return categorias;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Categorias createUpdatedEntity(EntityManager em) {
        Categorias categorias = new Categorias().categoria(UPDATED_CATEGORIA).estado(UPDATED_ESTADO);
        return categorias;
    }

    @BeforeEach
    public void initTest() {
        categorias = createEntity(em);
    }

    @Test
    @Transactional
    void createCategorias() throws Exception {
        int databaseSizeBeforeCreate = categoriasRepository.findAll().size();
        // Create the Categorias
        restCategoriasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categorias)))
            .andExpect(status().isCreated());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeCreate + 1);
        Categorias testCategorias = categoriasList.get(categoriasList.size() - 1);
        assertThat(testCategorias.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
        assertThat(testCategorias.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createCategoriasWithExistingId() throws Exception {
        // Create the Categorias with an existing ID
        categorias.setId(1L);

        int databaseSizeBeforeCreate = categoriasRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categorias)))
            .andExpect(status().isBadRequest());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCategoriaIsRequired() throws Exception {
        int databaseSizeBeforeTest = categoriasRepository.findAll().size();
        // set the field null
        categorias.setCategoria(null);

        // Create the Categorias, which fails.

        restCategoriasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categorias)))
            .andExpect(status().isBadRequest());

        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCategorias() throws Exception {
        // Initialize the database
        categoriasRepository.saveAndFlush(categorias);

        // Get all the categoriasList
        restCategoriasMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categorias.getId().intValue())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @Test
    @Transactional
    void getCategorias() throws Exception {
        // Initialize the database
        categoriasRepository.saveAndFlush(categorias);

        // Get the categorias
        restCategoriasMockMvc
            .perform(get(ENTITY_API_URL_ID, categorias.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(categorias.getId().intValue()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingCategorias() throws Exception {
        // Get the categorias
        restCategoriasMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCategorias() throws Exception {
        // Initialize the database
        categoriasRepository.saveAndFlush(categorias);

        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();

        // Update the categorias
        Categorias updatedCategorias = categoriasRepository.findById(categorias.getId()).get();
        // Disconnect from session so that the updates on updatedCategorias are not directly saved in db
        em.detach(updatedCategorias);
        updatedCategorias.categoria(UPDATED_CATEGORIA).estado(UPDATED_ESTADO);

        restCategoriasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCategorias.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCategorias))
            )
            .andExpect(status().isOk());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
        Categorias testCategorias = categoriasList.get(categoriasList.size() - 1);
        assertThat(testCategorias.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testCategorias.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingCategorias() throws Exception {
        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();
        categorias.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, categorias.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(categorias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCategorias() throws Exception {
        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();
        categorias.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(categorias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCategorias() throws Exception {
        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();
        categorias.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriasMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(categorias)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCategoriasWithPatch() throws Exception {
        // Initialize the database
        categoriasRepository.saveAndFlush(categorias);

        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();

        // Update the categorias using partial update
        Categorias partialUpdatedCategorias = new Categorias();
        partialUpdatedCategorias.setId(categorias.getId());

        partialUpdatedCategorias.categoria(UPDATED_CATEGORIA);

        restCategoriasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCategorias.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCategorias))
            )
            .andExpect(status().isOk());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
        Categorias testCategorias = categoriasList.get(categoriasList.size() - 1);
        assertThat(testCategorias.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testCategorias.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateCategoriasWithPatch() throws Exception {
        // Initialize the database
        categoriasRepository.saveAndFlush(categorias);

        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();

        // Update the categorias using partial update
        Categorias partialUpdatedCategorias = new Categorias();
        partialUpdatedCategorias.setId(categorias.getId());

        partialUpdatedCategorias.categoria(UPDATED_CATEGORIA).estado(UPDATED_ESTADO);

        restCategoriasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCategorias.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCategorias))
            )
            .andExpect(status().isOk());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
        Categorias testCategorias = categoriasList.get(categoriasList.size() - 1);
        assertThat(testCategorias.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testCategorias.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingCategorias() throws Exception {
        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();
        categorias.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, categorias.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(categorias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCategorias() throws Exception {
        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();
        categorias.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(categorias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCategorias() throws Exception {
        int databaseSizeBeforeUpdate = categoriasRepository.findAll().size();
        categorias.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCategoriasMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(categorias))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Categorias in the database
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCategorias() throws Exception {
        // Initialize the database
        categoriasRepository.saveAndFlush(categorias);

        int databaseSizeBeforeDelete = categoriasRepository.findAll().size();

        // Delete the categorias
        restCategoriasMockMvc
            .perform(delete(ENTITY_API_URL_ID, categorias.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Categorias> categoriasList = categoriasRepository.findAll();
        assertThat(categoriasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
