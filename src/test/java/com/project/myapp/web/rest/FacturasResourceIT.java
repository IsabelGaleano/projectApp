package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Facturas;
import com.project.myapp.repository.FacturasRepository;
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
 * Integration tests for the {@link FacturasResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class FacturasResourceIT {

    private static final Double DEFAULT_MONTO = 1D;
    private static final Double UPDATED_MONTO = 2D;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Double DEFAULT_IMPUESTO = 1D;
    private static final Double UPDATED_IMPUESTO = 2D;

    private static final Double DEFAULT_ADICIONAL = 1D;
    private static final Double UPDATED_ADICIONAL = 2D;

    private static final String DEFAULT_NOMBRE_RECEPTOR = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_RECEPTOR = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO_RECEPTOR = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO_RECEPTOR = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO_RECEPTOR = "AAAAAAAAAA";
    private static final String UPDATED_CORREO_RECEPTOR = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_STARTUP = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_STARTUP = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO_STARTUP = "AAAAAAAAAA";
    private static final String UPDATED_CORREO_STARTUP = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/facturas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FacturasRepository facturasRepository;

    @Mock
    private FacturasRepository facturasRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFacturasMockMvc;

    private Facturas facturas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facturas createEntity(EntityManager em) {
        Facturas facturas = new Facturas()
            .monto(DEFAULT_MONTO)
            .descripcion(DEFAULT_DESCRIPCION)
            .fecha(DEFAULT_FECHA)
            .impuesto(DEFAULT_IMPUESTO)
            .adicional(DEFAULT_ADICIONAL)
            .nombreReceptor(DEFAULT_NOMBRE_RECEPTOR)
            .apellidoReceptor(DEFAULT_APELLIDO_RECEPTOR)
            .correoReceptor(DEFAULT_CORREO_RECEPTOR)
            .nombreStartup(DEFAULT_NOMBRE_STARTUP)
            .correoStartup(DEFAULT_CORREO_STARTUP)
            .estado(DEFAULT_ESTADO);
        return facturas;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facturas createUpdatedEntity(EntityManager em) {
        Facturas facturas = new Facturas()
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .impuesto(UPDATED_IMPUESTO)
            .adicional(UPDATED_ADICIONAL)
            .nombreReceptor(UPDATED_NOMBRE_RECEPTOR)
            .apellidoReceptor(UPDATED_APELLIDO_RECEPTOR)
            .correoReceptor(UPDATED_CORREO_RECEPTOR)
            .nombreStartup(UPDATED_NOMBRE_STARTUP)
            .correoStartup(UPDATED_CORREO_STARTUP)
            .estado(UPDATED_ESTADO);
        return facturas;
    }

    @BeforeEach
    public void initTest() {
        facturas = createEntity(em);
    }

    @Test
    @Transactional
    void createFacturas() throws Exception {
        int databaseSizeBeforeCreate = facturasRepository.findAll().size();
        // Create the Facturas
        restFacturasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(facturas)))
            .andExpect(status().isCreated());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeCreate + 1);
        Facturas testFacturas = facturasList.get(facturasList.size() - 1);
        assertThat(testFacturas.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testFacturas.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testFacturas.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testFacturas.getImpuesto()).isEqualTo(DEFAULT_IMPUESTO);
        assertThat(testFacturas.getAdicional()).isEqualTo(DEFAULT_ADICIONAL);
        assertThat(testFacturas.getNombreReceptor()).isEqualTo(DEFAULT_NOMBRE_RECEPTOR);
        assertThat(testFacturas.getApellidoReceptor()).isEqualTo(DEFAULT_APELLIDO_RECEPTOR);
        assertThat(testFacturas.getCorreoReceptor()).isEqualTo(DEFAULT_CORREO_RECEPTOR);
        assertThat(testFacturas.getNombreStartup()).isEqualTo(DEFAULT_NOMBRE_STARTUP);
        assertThat(testFacturas.getCorreoStartup()).isEqualTo(DEFAULT_CORREO_STARTUP);
        assertThat(testFacturas.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createFacturasWithExistingId() throws Exception {
        // Create the Facturas with an existing ID
        facturas.setId(1L);

        int databaseSizeBeforeCreate = facturasRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacturasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(facturas)))
            .andExpect(status().isBadRequest());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFacturas() throws Exception {
        // Initialize the database
        facturasRepository.saveAndFlush(facturas);

        // Get all the facturasList
        restFacturasMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facturas.getId().intValue())))
            .andExpect(jsonPath("$.[*].monto").value(hasItem(DEFAULT_MONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].impuesto").value(hasItem(DEFAULT_IMPUESTO.doubleValue())))
            .andExpect(jsonPath("$.[*].adicional").value(hasItem(DEFAULT_ADICIONAL.doubleValue())))
            .andExpect(jsonPath("$.[*].nombreReceptor").value(hasItem(DEFAULT_NOMBRE_RECEPTOR)))
            .andExpect(jsonPath("$.[*].apellidoReceptor").value(hasItem(DEFAULT_APELLIDO_RECEPTOR)))
            .andExpect(jsonPath("$.[*].correoReceptor").value(hasItem(DEFAULT_CORREO_RECEPTOR)))
            .andExpect(jsonPath("$.[*].nombreStartup").value(hasItem(DEFAULT_NOMBRE_STARTUP)))
            .andExpect(jsonPath("$.[*].correoStartup").value(hasItem(DEFAULT_CORREO_STARTUP)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFacturasWithEagerRelationshipsIsEnabled() throws Exception {
        when(facturasRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFacturasMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(facturasRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFacturasWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(facturasRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFacturasMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(facturasRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getFacturas() throws Exception {
        // Initialize the database
        facturasRepository.saveAndFlush(facturas);

        // Get the facturas
        restFacturasMockMvc
            .perform(get(ENTITY_API_URL_ID, facturas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(facturas.getId().intValue()))
            .andExpect(jsonPath("$.monto").value(DEFAULT_MONTO.doubleValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.impuesto").value(DEFAULT_IMPUESTO.doubleValue()))
            .andExpect(jsonPath("$.adicional").value(DEFAULT_ADICIONAL.doubleValue()))
            .andExpect(jsonPath("$.nombreReceptor").value(DEFAULT_NOMBRE_RECEPTOR))
            .andExpect(jsonPath("$.apellidoReceptor").value(DEFAULT_APELLIDO_RECEPTOR))
            .andExpect(jsonPath("$.correoReceptor").value(DEFAULT_CORREO_RECEPTOR))
            .andExpect(jsonPath("$.nombreStartup").value(DEFAULT_NOMBRE_STARTUP))
            .andExpect(jsonPath("$.correoStartup").value(DEFAULT_CORREO_STARTUP))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingFacturas() throws Exception {
        // Get the facturas
        restFacturasMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewFacturas() throws Exception {
        // Initialize the database
        facturasRepository.saveAndFlush(facturas);

        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();

        // Update the facturas
        Facturas updatedFacturas = facturasRepository.findById(facturas.getId()).get();
        // Disconnect from session so that the updates on updatedFacturas are not directly saved in db
        em.detach(updatedFacturas);
        updatedFacturas
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .impuesto(UPDATED_IMPUESTO)
            .adicional(UPDATED_ADICIONAL)
            .nombreReceptor(UPDATED_NOMBRE_RECEPTOR)
            .apellidoReceptor(UPDATED_APELLIDO_RECEPTOR)
            .correoReceptor(UPDATED_CORREO_RECEPTOR)
            .nombreStartup(UPDATED_NOMBRE_STARTUP)
            .correoStartup(UPDATED_CORREO_STARTUP)
            .estado(UPDATED_ESTADO);

        restFacturasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFacturas.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFacturas))
            )
            .andExpect(status().isOk());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
        Facturas testFacturas = facturasList.get(facturasList.size() - 1);
        assertThat(testFacturas.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testFacturas.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFacturas.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testFacturas.getImpuesto()).isEqualTo(UPDATED_IMPUESTO);
        assertThat(testFacturas.getAdicional()).isEqualTo(UPDATED_ADICIONAL);
        assertThat(testFacturas.getNombreReceptor()).isEqualTo(UPDATED_NOMBRE_RECEPTOR);
        assertThat(testFacturas.getApellidoReceptor()).isEqualTo(UPDATED_APELLIDO_RECEPTOR);
        assertThat(testFacturas.getCorreoReceptor()).isEqualTo(UPDATED_CORREO_RECEPTOR);
        assertThat(testFacturas.getNombreStartup()).isEqualTo(UPDATED_NOMBRE_STARTUP);
        assertThat(testFacturas.getCorreoStartup()).isEqualTo(UPDATED_CORREO_STARTUP);
        assertThat(testFacturas.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingFacturas() throws Exception {
        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();
        facturas.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacturasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, facturas.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(facturas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFacturas() throws Exception {
        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();
        facturas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFacturasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(facturas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFacturas() throws Exception {
        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();
        facturas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFacturasMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(facturas)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFacturasWithPatch() throws Exception {
        // Initialize the database
        facturasRepository.saveAndFlush(facturas);

        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();

        // Update the facturas using partial update
        Facturas partialUpdatedFacturas = new Facturas();
        partialUpdatedFacturas.setId(facturas.getId());

        partialUpdatedFacturas
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .impuesto(UPDATED_IMPUESTO)
            .adicional(UPDATED_ADICIONAL)
            .nombreReceptor(UPDATED_NOMBRE_RECEPTOR)
            .apellidoReceptor(UPDATED_APELLIDO_RECEPTOR)
            .correoReceptor(UPDATED_CORREO_RECEPTOR)
            .nombreStartup(UPDATED_NOMBRE_STARTUP)
            .correoStartup(UPDATED_CORREO_STARTUP)
            .estado(UPDATED_ESTADO);

        restFacturasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFacturas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFacturas))
            )
            .andExpect(status().isOk());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
        Facturas testFacturas = facturasList.get(facturasList.size() - 1);
        assertThat(testFacturas.getMonto()).isEqualTo(DEFAULT_MONTO);
        assertThat(testFacturas.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFacturas.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testFacturas.getImpuesto()).isEqualTo(UPDATED_IMPUESTO);
        assertThat(testFacturas.getAdicional()).isEqualTo(UPDATED_ADICIONAL);
        assertThat(testFacturas.getNombreReceptor()).isEqualTo(UPDATED_NOMBRE_RECEPTOR);
        assertThat(testFacturas.getApellidoReceptor()).isEqualTo(UPDATED_APELLIDO_RECEPTOR);
        assertThat(testFacturas.getCorreoReceptor()).isEqualTo(UPDATED_CORREO_RECEPTOR);
        assertThat(testFacturas.getNombreStartup()).isEqualTo(UPDATED_NOMBRE_STARTUP);
        assertThat(testFacturas.getCorreoStartup()).isEqualTo(UPDATED_CORREO_STARTUP);
        assertThat(testFacturas.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateFacturasWithPatch() throws Exception {
        // Initialize the database
        facturasRepository.saveAndFlush(facturas);

        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();

        // Update the facturas using partial update
        Facturas partialUpdatedFacturas = new Facturas();
        partialUpdatedFacturas.setId(facturas.getId());

        partialUpdatedFacturas
            .monto(UPDATED_MONTO)
            .descripcion(UPDATED_DESCRIPCION)
            .fecha(UPDATED_FECHA)
            .impuesto(UPDATED_IMPUESTO)
            .adicional(UPDATED_ADICIONAL)
            .nombreReceptor(UPDATED_NOMBRE_RECEPTOR)
            .apellidoReceptor(UPDATED_APELLIDO_RECEPTOR)
            .correoReceptor(UPDATED_CORREO_RECEPTOR)
            .nombreStartup(UPDATED_NOMBRE_STARTUP)
            .correoStartup(UPDATED_CORREO_STARTUP)
            .estado(UPDATED_ESTADO);

        restFacturasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFacturas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFacturas))
            )
            .andExpect(status().isOk());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
        Facturas testFacturas = facturasList.get(facturasList.size() - 1);
        assertThat(testFacturas.getMonto()).isEqualTo(UPDATED_MONTO);
        assertThat(testFacturas.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFacturas.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testFacturas.getImpuesto()).isEqualTo(UPDATED_IMPUESTO);
        assertThat(testFacturas.getAdicional()).isEqualTo(UPDATED_ADICIONAL);
        assertThat(testFacturas.getNombreReceptor()).isEqualTo(UPDATED_NOMBRE_RECEPTOR);
        assertThat(testFacturas.getApellidoReceptor()).isEqualTo(UPDATED_APELLIDO_RECEPTOR);
        assertThat(testFacturas.getCorreoReceptor()).isEqualTo(UPDATED_CORREO_RECEPTOR);
        assertThat(testFacturas.getNombreStartup()).isEqualTo(UPDATED_NOMBRE_STARTUP);
        assertThat(testFacturas.getCorreoStartup()).isEqualTo(UPDATED_CORREO_STARTUP);
        assertThat(testFacturas.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingFacturas() throws Exception {
        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();
        facturas.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacturasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, facturas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(facturas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFacturas() throws Exception {
        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();
        facturas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFacturasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(facturas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFacturas() throws Exception {
        int databaseSizeBeforeUpdate = facturasRepository.findAll().size();
        facturas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFacturasMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(facturas)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Facturas in the database
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFacturas() throws Exception {
        // Initialize the database
        facturasRepository.saveAndFlush(facturas);

        int databaseSizeBeforeDelete = facturasRepository.findAll().size();

        // Delete the facturas
        restFacturasMockMvc
            .perform(delete(ENTITY_API_URL_ID, facturas.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Facturas> facturasList = facturasRepository.findAll();
        assertThat(facturasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
