package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Rastreador;
import com.project.myapp.repository.RastreadorRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link RastreadorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RastreadorResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_LATITUD = "AAAAAAAAAA";
    private static final String UPDATED_LATITUD = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUD = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUD = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/rastreadors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RastreadorRepository rastreadorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRastreadorMockMvc;

    private Rastreador rastreador;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rastreador createEntity(EntityManager em) {
        Rastreador rastreador = new Rastreador()
            .descripcion(DEFAULT_DESCRIPCION)
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .fecha(DEFAULT_FECHA)
            .estado(DEFAULT_ESTADO);
        return rastreador;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rastreador createUpdatedEntity(EntityManager em) {
        Rastreador rastreador = new Rastreador()
            .descripcion(UPDATED_DESCRIPCION)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .fecha(UPDATED_FECHA)
            .estado(UPDATED_ESTADO);
        return rastreador;
    }

    @BeforeEach
    public void initTest() {
        rastreador = createEntity(em);
    }

    @Test
    @Transactional
    void createRastreador() throws Exception {
        int databaseSizeBeforeCreate = rastreadorRepository.findAll().size();
        // Create the Rastreador
        restRastreadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rastreador)))
            .andExpect(status().isCreated());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeCreate + 1);
        Rastreador testRastreador = rastreadorList.get(rastreadorList.size() - 1);
        assertThat(testRastreador.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testRastreador.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testRastreador.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testRastreador.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testRastreador.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createRastreadorWithExistingId() throws Exception {
        // Create the Rastreador with an existing ID
        rastreador.setId(1L);

        int databaseSizeBeforeCreate = rastreadorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRastreadorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rastreador)))
            .andExpect(status().isBadRequest());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRastreadors() throws Exception {
        // Initialize the database
        rastreadorRepository.saveAndFlush(rastreador);

        // Get all the rastreadorList
        restRastreadorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rastreador.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD)))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @Test
    @Transactional
    void getRastreador() throws Exception {
        // Initialize the database
        rastreadorRepository.saveAndFlush(rastreador);

        // Get the rastreador
        restRastreadorMockMvc
            .perform(get(ENTITY_API_URL_ID, rastreador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rastreador.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingRastreador() throws Exception {
        // Get the rastreador
        restRastreadorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRastreador() throws Exception {
        // Initialize the database
        rastreadorRepository.saveAndFlush(rastreador);

        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();

        // Update the rastreador
        Rastreador updatedRastreador = rastreadorRepository.findById(rastreador.getId()).get();
        // Disconnect from session so that the updates on updatedRastreador are not directly saved in db
        em.detach(updatedRastreador);
        updatedRastreador
            .descripcion(UPDATED_DESCRIPCION)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .fecha(UPDATED_FECHA)
            .estado(UPDATED_ESTADO);

        restRastreadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRastreador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRastreador))
            )
            .andExpect(status().isOk());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
        Rastreador testRastreador = rastreadorList.get(rastreadorList.size() - 1);
        assertThat(testRastreador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testRastreador.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testRastreador.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testRastreador.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testRastreador.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingRastreador() throws Exception {
        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();
        rastreador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRastreadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rastreador.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rastreador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRastreador() throws Exception {
        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();
        rastreador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRastreadorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rastreador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRastreador() throws Exception {
        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();
        rastreador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRastreadorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rastreador)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRastreadorWithPatch() throws Exception {
        // Initialize the database
        rastreadorRepository.saveAndFlush(rastreador);

        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();

        // Update the rastreador using partial update
        Rastreador partialUpdatedRastreador = new Rastreador();
        partialUpdatedRastreador.setId(rastreador.getId());

        partialUpdatedRastreador.estado(UPDATED_ESTADO);

        restRastreadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRastreador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRastreador))
            )
            .andExpect(status().isOk());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
        Rastreador testRastreador = rastreadorList.get(rastreadorList.size() - 1);
        assertThat(testRastreador.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testRastreador.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testRastreador.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testRastreador.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testRastreador.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateRastreadorWithPatch() throws Exception {
        // Initialize the database
        rastreadorRepository.saveAndFlush(rastreador);

        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();

        // Update the rastreador using partial update
        Rastreador partialUpdatedRastreador = new Rastreador();
        partialUpdatedRastreador.setId(rastreador.getId());

        partialUpdatedRastreador
            .descripcion(UPDATED_DESCRIPCION)
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .fecha(UPDATED_FECHA)
            .estado(UPDATED_ESTADO);

        restRastreadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRastreador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRastreador))
            )
            .andExpect(status().isOk());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
        Rastreador testRastreador = rastreadorList.get(rastreadorList.size() - 1);
        assertThat(testRastreador.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testRastreador.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testRastreador.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testRastreador.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testRastreador.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingRastreador() throws Exception {
        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();
        rastreador.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRastreadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rastreador.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rastreador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRastreador() throws Exception {
        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();
        rastreador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRastreadorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rastreador))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRastreador() throws Exception {
        int databaseSizeBeforeUpdate = rastreadorRepository.findAll().size();
        rastreador.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRastreadorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rastreador))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rastreador in the database
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRastreador() throws Exception {
        // Initialize the database
        rastreadorRepository.saveAndFlush(rastreador);

        int databaseSizeBeforeDelete = rastreadorRepository.findAll().size();

        // Delete the rastreador
        restRastreadorMockMvc
            .perform(delete(ENTITY_API_URL_ID, rastreador.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rastreador> rastreadorList = rastreadorRepository.findAll();
        assertThat(rastreadorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
