package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Movimientos;
import com.project.myapp.repository.MovimientosRepository;
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
 * Integration tests for the {@link MovimientosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MovimientosResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Double DEFAULT_MONTO = 1D;
    private static final Double UPDATED_MONTO = 2D;

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MovimientosRepository movimientosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientosMockMvc;

    private Movimientos movimientos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimientos createEntity(EntityManager em) {
        Movimientos movimientos = new Movimientos()
            .fecha(DEFAULT_FECHA)
            .monto(DEFAULT_MONTO)
            .tipo(DEFAULT_TIPO)
            .descripcion(DEFAULT_DESCRIPCION)
            .estado(DEFAULT_ESTADO);
        return movimientos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimientos createUpdatedEntity(EntityManager em) {
        Movimientos movimientos = new Movimientos()
            .fecha(UPDATED_FECHA)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .descripcion(UPDATED_DESCRIPCION)
            .estado(UPDATED_ESTADO);
        return movimientos;
    }

    @BeforeEach
    public void initTest() {
        movimientos = createEntity(em);
    }

    @Test
    @Transactional
    void createMovimientos() throws Exception {
        int databaseSizeBeforeCreate = movimientosRepository.findAll().size();
        // Create the Movimientos
        restMovimientosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientos)))
            .andExpect(status().isCreated());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeCreate + 1);
        Movimientos testMovimientos = movimientosList.get(movimientosList.size() - 1);
        assertThat(testMovimientos.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMovimientos.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testMovimientos.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testMovimientos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testMovimientos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createMovimientosWithExistingId() throws Exception {
        // Create the Movimientos with an existing ID
        movimientos.setId(1L);

        int databaseSizeBeforeCreate = movimientosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientos)))
            .andExpect(status().isBadRequest());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMovimientos() throws Exception {
        // Initialize the database
        movimientosRepository.saveAndFlush(movimientos);

        // Get all the movimientosList
        restMovimientosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimientos.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @Test
    @Transactional
    void getMovimientos() throws Exception {
        // Initialize the database
        movimientosRepository.saveAndFlush(movimientos);

        // Get the movimientos
        restMovimientosMockMvc
            .perform(get(ENTITY_API_URL_ID, movimientos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimientos.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingMovimientos() throws Exception {
        // Get the movimientos
        restMovimientosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMovimientos() throws Exception {
        // Initialize the database
        movimientosRepository.saveAndFlush(movimientos);

        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();

        // Update the movimientos
        Movimientos updatedMovimientos = movimientosRepository.findById(movimientos.getId()).get();
        // Disconnect from session so that the updates on updatedMovimientos are not directly saved in db
        em.detach(updatedMovimientos);
        updatedMovimientos
            .fecha(UPDATED_FECHA)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .descripcion(UPDATED_DESCRIPCION)
            .estado(UPDATED_ESTADO);

        restMovimientosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMovimientos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMovimientos))
            )
            .andExpect(status().isOk());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
        Movimientos testMovimientos = movimientosList.get(movimientosList.size() - 1);
        assertThat(testMovimientos.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimientos.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testMovimientos.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMovimientos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testMovimientos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingMovimientos() throws Exception {
        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();
        movimientos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, movimientos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMovimientos() throws Exception {
        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();
        movimientos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(movimientos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMovimientos() throws Exception {
        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();
        movimientos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(movimientos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMovimientosWithPatch() throws Exception {
        // Initialize the database
        movimientosRepository.saveAndFlush(movimientos);

        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();

        // Update the movimientos using partial update
        Movimientos partialUpdatedMovimientos = new Movimientos();
        partialUpdatedMovimientos.setId(movimientos.getId());

        partialUpdatedMovimientos.fecha(UPDATED_FECHA).monto(UPDATED_MONTO).tipo(UPDATED_TIPO).descripcion(UPDATED_DESCRIPCION);

        restMovimientosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientos))
            )
            .andExpect(status().isOk());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
        Movimientos testMovimientos = movimientosList.get(movimientosList.size() - 1);
        assertThat(testMovimientos.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimientos.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testMovimientos.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMovimientos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testMovimientos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateMovimientosWithPatch() throws Exception {
        // Initialize the database
        movimientosRepository.saveAndFlush(movimientos);

        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();

        // Update the movimientos using partial update
        Movimientos partialUpdatedMovimientos = new Movimientos();
        partialUpdatedMovimientos.setId(movimientos.getId());

        partialUpdatedMovimientos
            .fecha(UPDATED_FECHA)
            .monto(UPDATED_MONTO)
            .tipo(UPDATED_TIPO)
            .descripcion(UPDATED_DESCRIPCION)
            .estado(UPDATED_ESTADO);

        restMovimientosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMovimientos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMovimientos))
            )
            .andExpect(status().isOk());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
        Movimientos testMovimientos = movimientosList.get(movimientosList.size() - 1);
        assertThat(testMovimientos.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimientos.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testMovimientos.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMovimientos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testMovimientos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingMovimientos() throws Exception {
        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();
        movimientos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, movimientos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMovimientos() throws Exception {
        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();
        movimientos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(movimientos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMovimientos() throws Exception {
        int databaseSizeBeforeUpdate = movimientosRepository.findAll().size();
        movimientos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMovimientosMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(movimientos))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Movimientos in the database
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMovimientos() throws Exception {
        // Initialize the database
        movimientosRepository.saveAndFlush(movimientos);

        int databaseSizeBeforeDelete = movimientosRepository.findAll().size();

        // Delete the movimientos
        restMovimientosMockMvc
            .perform(delete(ENTITY_API_URL_ID, movimientos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Movimientos> movimientosList = movimientosRepository.findAll();
        assertThat(movimientosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
