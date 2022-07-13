package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.PlanesInversion;
import com.project.myapp.repository.PlanesInversionRepository;
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
 * Integration tests for the {@link PlanesInversionResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class PlanesInversionResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Double DEFAULT_MONTO = 1D;
    private static final Double UPDATED_MONTO = 2D;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_BENEFICIOS = "AAAAAAAAAA";
    private static final String UPDATED_BENEFICIOS = "BBBBBBBBBB";

    private static final Double DEFAULT_PORCENTAJE_EMPRESARIAL = 1D;
    private static final Double UPDATED_PORCENTAJE_EMPRESARIAL = 2D;

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/planes-inversions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PlanesInversionRepository planesInversionRepository;

    @Mock
    private PlanesInversionRepository planesInversionRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanesInversionMockMvc;

    private PlanesInversion planesInversion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanesInversion createEntity(EntityManager em) {
        PlanesInversion planesInversion = new PlanesInversion()
            .nombre(DEFAULT_NOMBRE)
            .monto(DEFAULT_MONTO)
            .descripcion(DEFAULT_DESCRIPCION)
            .beneficios(DEFAULT_BENEFICIOS)
            .porcentajeEmpresarial(DEFAULT_PORCENTAJE_EMPRESARIAL)
            .estado(DEFAULT_ESTADO);
        return planesInversion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanesInversion createUpdatedEntity(EntityManager em) {
        PlanesInversion planesInversion = new PlanesInversion()
            .nombre(UPDATED_NOMBRE)
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .beneficios(UPDATED_BENEFICIOS)
            .porcentajeEmpresarial(UPDATED_PORCENTAJE_EMPRESARIAL)
            .estado(UPDATED_ESTADO);
        return planesInversion;
    }

    @BeforeEach
    public void initTest() {
        planesInversion = createEntity(em);
    }

    @Test
    @Transactional
    void createPlanesInversion() throws Exception {
        int databaseSizeBeforeCreate = planesInversionRepository.findAll().size();
        // Create the PlanesInversion
        restPlanesInversionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isCreated());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeCreate + 1);
        PlanesInversion testPlanesInversion = planesInversionList.get(planesInversionList.size() - 1);
        assertThat(testPlanesInversion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPlanesInversion.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testPlanesInversion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPlanesInversion.getBeneficios()).isEqualTo(DEFAULT_BENEFICIOS);
        assertThat(testPlanesInversion.getPorcentajeEmpresarial()).isEqualTo(DEFAULT_PORCENTAJE_EMPRESARIAL);
        assertThat(testPlanesInversion.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createPlanesInversionWithExistingId() throws Exception {
        // Create the PlanesInversion with an existing ID
        planesInversion.setId(1L);

        int databaseSizeBeforeCreate = planesInversionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanesInversionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPlanesInversions() throws Exception {
        // Initialize the database
        planesInversionRepository.saveAndFlush(planesInversion);

        // Get all the planesInversionList
        restPlanesInversionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planesInversion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].beneficios").value(hasItem(DEFAULT_BENEFICIOS)))
            .andExpect(jsonPath("$.[*].porcentajeEmpresarial").value(hasItem(DEFAULT_PORCENTAJE_EMPRESARIAL.doubleValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPlanesInversionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(planesInversionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPlanesInversionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(planesInversionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPlanesInversionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(planesInversionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPlanesInversionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(planesInversionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getPlanesInversion() throws Exception {
        // Initialize the database
        planesInversionRepository.saveAndFlush(planesInversion);

        // Get the planesInversion
        restPlanesInversionMockMvc
            .perform(get(ENTITY_API_URL_ID, planesInversion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planesInversion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.beneficios").value(DEFAULT_BENEFICIOS))
            .andExpect(jsonPath("$.porcentajeEmpresarial").value(DEFAULT_PORCENTAJE_EMPRESARIAL.doubleValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingPlanesInversion() throws Exception {
        // Get the planesInversion
        restPlanesInversionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPlanesInversion() throws Exception {
        // Initialize the database
        planesInversionRepository.saveAndFlush(planesInversion);

        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();

        // Update the planesInversion
        PlanesInversion updatedPlanesInversion = planesInversionRepository.findById(planesInversion.getId()).get();
        // Disconnect from session so that the updates on updatedPlanesInversion are not directly saved in db
        em.detach(updatedPlanesInversion);
        updatedPlanesInversion
            .nombre(UPDATED_NOMBRE)
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .beneficios(UPDATED_BENEFICIOS)
            .porcentajeEmpresarial(UPDATED_PORCENTAJE_EMPRESARIAL)
            .estado(UPDATED_ESTADO);

        restPlanesInversionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPlanesInversion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPlanesInversion))
            )
            .andExpect(status().isOk());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
        PlanesInversion testPlanesInversion = planesInversionList.get(planesInversionList.size() - 1);
        assertThat(testPlanesInversion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPlanesInversion.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testPlanesInversion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesInversion.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testPlanesInversion.getPorcentajeEmpresarial()).isEqualTo(UPDATED_PORCENTAJE_EMPRESARIAL);
        assertThat(testPlanesInversion.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingPlanesInversion() throws Exception {
        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();
        planesInversion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanesInversionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planesInversion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPlanesInversion() throws Exception {
        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();
        planesInversion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesInversionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPlanesInversion() throws Exception {
        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();
        planesInversion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesInversionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePlanesInversionWithPatch() throws Exception {
        // Initialize the database
        planesInversionRepository.saveAndFlush(planesInversion);

        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();

        // Update the planesInversion using partial update
        PlanesInversion partialUpdatedPlanesInversion = new PlanesInversion();
        partialUpdatedPlanesInversion.setId(planesInversion.getId());

        partialUpdatedPlanesInversion
            .monto(UPDATED_MONTO)
            .beneficios(UPDATED_BENEFICIOS)
            .porcentajeEmpresarial(UPDATED_PORCENTAJE_EMPRESARIAL)
            .estado(UPDATED_ESTADO);

        restPlanesInversionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanesInversion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanesInversion))
            )
            .andExpect(status().isOk());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
        PlanesInversion testPlanesInversion = planesInversionList.get(planesInversionList.size() - 1);
        assertThat(testPlanesInversion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPlanesInversion.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testPlanesInversion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPlanesInversion.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testPlanesInversion.getPorcentajeEmpresarial()).isEqualTo(UPDATED_PORCENTAJE_EMPRESARIAL);
        assertThat(testPlanesInversion.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdatePlanesInversionWithPatch() throws Exception {
        // Initialize the database
        planesInversionRepository.saveAndFlush(planesInversion);

        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();

        // Update the planesInversion using partial update
        PlanesInversion partialUpdatedPlanesInversion = new PlanesInversion();
        partialUpdatedPlanesInversion.setId(planesInversion.getId());

        partialUpdatedPlanesInversion
            .nombre(UPDATED_NOMBRE)
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .beneficios(UPDATED_BENEFICIOS)
            .porcentajeEmpresarial(UPDATED_PORCENTAJE_EMPRESARIAL)
            .estado(UPDATED_ESTADO);

        restPlanesInversionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanesInversion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanesInversion))
            )
            .andExpect(status().isOk());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
        PlanesInversion testPlanesInversion = planesInversionList.get(planesInversionList.size() - 1);
        assertThat(testPlanesInversion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPlanesInversion.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testPlanesInversion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesInversion.getBeneficios()).isEqualTo(UPDATED_BENEFICIOS);
        assertThat(testPlanesInversion.getPorcentajeEmpresarial()).isEqualTo(UPDATED_PORCENTAJE_EMPRESARIAL);
        assertThat(testPlanesInversion.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingPlanesInversion() throws Exception {
        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();
        planesInversion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanesInversionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, planesInversion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPlanesInversion() throws Exception {
        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();
        planesInversion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesInversionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPlanesInversion() throws Exception {
        int databaseSizeBeforeUpdate = planesInversionRepository.findAll().size();
        planesInversion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesInversionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesInversion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanesInversion in the database
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePlanesInversion() throws Exception {
        // Initialize the database
        planesInversionRepository.saveAndFlush(planesInversion);

        int databaseSizeBeforeDelete = planesInversionRepository.findAll().size();

        // Delete the planesInversion
        restPlanesInversionMockMvc
            .perform(delete(ENTITY_API_URL_ID, planesInversion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanesInversion> planesInversionList = planesInversionRepository.findAll();
        assertThat(planesInversionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
