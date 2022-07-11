package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Monederos;
import com.project.myapp.repository.MonederosRepository;
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
 * Integration tests for the {@link MonederosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MonederosResourceIT {

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Double DEFAULT_SALDO = 1D;
    private static final Double UPDATED_SALDO = 2D;

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/monederos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MonederosRepository monederosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMonederosMockMvc;

    private Monederos monederos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Monederos createEntity(EntityManager em) {
        Monederos monederos = new Monederos().tipo(DEFAULT_TIPO).saldo(DEFAULT_SALDO).estado(DEFAULT_ESTADO);
        return monederos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Monederos createUpdatedEntity(EntityManager em) {
        Monederos monederos = new Monederos().tipo(UPDATED_TIPO).saldo(UPDATED_SALDO).estado(UPDATED_ESTADO);
        return monederos;
    }

    @BeforeEach
    public void initTest() {
        monederos = createEntity(em);
    }

    @Test
    @Transactional
    void createMonederos() throws Exception {
        int databaseSizeBeforeCreate = monederosRepository.findAll().size();
        // Create the Monederos
        restMonederosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monederos)))
            .andExpect(status().isCreated());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeCreate + 1);
        Monederos testMonederos = monederosList.get(monederosList.size() - 1);
        assertThat(testMonederos.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testMonederos.getSaldo()).isEqualTo(DEFAULT_SALDO);
        assertThat(testMonederos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createMonederosWithExistingId() throws Exception {
        // Create the Monederos with an existing ID
        monederos.setId(1L);

        int databaseSizeBeforeCreate = monederosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMonederosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monederos)))
            .andExpect(status().isBadRequest());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMonederos() throws Exception {
        // Initialize the database
        monederosRepository.saveAndFlush(monederos);

        // Get all the monederosList
        restMonederosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(monederos.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.doubleValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @Test
    @Transactional
    void getMonederos() throws Exception {
        // Initialize the database
        monederosRepository.saveAndFlush(monederos);

        // Get the monederos
        restMonederosMockMvc
            .perform(get(ENTITY_API_URL_ID, monederos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(monederos.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.saldo").value(DEFAULT_SALDO.doubleValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingMonederos() throws Exception {
        // Get the monederos
        restMonederosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMonederos() throws Exception {
        // Initialize the database
        monederosRepository.saveAndFlush(monederos);

        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();

        // Update the monederos
        Monederos updatedMonederos = monederosRepository.findById(monederos.getId()).get();
        // Disconnect from session so that the updates on updatedMonederos are not directly saved in db
        em.detach(updatedMonederos);
        updatedMonederos.tipo(UPDATED_TIPO).saldo(UPDATED_SALDO).estado(UPDATED_ESTADO);

        restMonederosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMonederos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMonederos))
            )
            .andExpect(status().isOk());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
        Monederos testMonederos = monederosList.get(monederosList.size() - 1);
        assertThat(testMonederos.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMonederos.getSaldo()).isEqualTo(UPDATED_SALDO);
        assertThat(testMonederos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingMonederos() throws Exception {
        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();
        monederos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMonederosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, monederos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(monederos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMonederos() throws Exception {
        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();
        monederos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonederosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(monederos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMonederos() throws Exception {
        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();
        monederos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonederosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(monederos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMonederosWithPatch() throws Exception {
        // Initialize the database
        monederosRepository.saveAndFlush(monederos);

        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();

        // Update the monederos using partial update
        Monederos partialUpdatedMonederos = new Monederos();
        partialUpdatedMonederos.setId(monederos.getId());

        partialUpdatedMonederos.tipo(UPDATED_TIPO).saldo(UPDATED_SALDO);

        restMonederosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMonederos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMonederos))
            )
            .andExpect(status().isOk());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
        Monederos testMonederos = monederosList.get(monederosList.size() - 1);
        assertThat(testMonederos.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMonederos.getSaldo()).isEqualTo(UPDATED_SALDO);
        assertThat(testMonederos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateMonederosWithPatch() throws Exception {
        // Initialize the database
        monederosRepository.saveAndFlush(monederos);

        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();

        // Update the monederos using partial update
        Monederos partialUpdatedMonederos = new Monederos();
        partialUpdatedMonederos.setId(monederos.getId());

        partialUpdatedMonederos.tipo(UPDATED_TIPO).saldo(UPDATED_SALDO).estado(UPDATED_ESTADO);

        restMonederosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMonederos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMonederos))
            )
            .andExpect(status().isOk());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
        Monederos testMonederos = monederosList.get(monederosList.size() - 1);
        assertThat(testMonederos.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMonederos.getSaldo()).isEqualTo(UPDATED_SALDO);
        assertThat(testMonederos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingMonederos() throws Exception {
        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();
        monederos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMonederosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, monederos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(monederos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMonederos() throws Exception {
        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();
        monederos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonederosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(monederos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMonederos() throws Exception {
        int databaseSizeBeforeUpdate = monederosRepository.findAll().size();
        monederos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMonederosMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(monederos))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Monederos in the database
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMonederos() throws Exception {
        // Initialize the database
        monederosRepository.saveAndFlush(monederos);

        int databaseSizeBeforeDelete = monederosRepository.findAll().size();

        // Delete the monederos
        restMonederosMockMvc
            .perform(delete(ENTITY_API_URL_ID, monederos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Monederos> monederosList = monederosRepository.findAll();
        assertThat(monederosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
