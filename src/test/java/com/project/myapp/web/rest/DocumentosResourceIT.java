package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Documentos;
import com.project.myapp.repository.DocumentosRepository;
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
 * Integration tests for the {@link DocumentosResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class DocumentosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/documentos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DocumentosRepository documentosRepository;

    @Mock
    private DocumentosRepository documentosRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDocumentosMockMvc;

    private Documentos documentos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Documentos createEntity(EntityManager em) {
        Documentos documentos = new Documentos()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .url(DEFAULT_URL)
            .estado(DEFAULT_ESTADO);
        return documentos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Documentos createUpdatedEntity(EntityManager em) {
        Documentos documentos = new Documentos()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .url(UPDATED_URL)
            .estado(UPDATED_ESTADO);
        return documentos;
    }

    @BeforeEach
    public void initTest() {
        documentos = createEntity(em);
    }

    @Test
    @Transactional
    void createDocumentos() throws Exception {
        int databaseSizeBeforeCreate = documentosRepository.findAll().size();
        // Create the Documentos
        restDocumentosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentos)))
            .andExpect(status().isCreated());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeCreate + 1);
        Documentos testDocumentos = documentosList.get(documentosList.size() - 1);
        assertThat(testDocumentos.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testDocumentos.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDocumentos.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testDocumentos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createDocumentosWithExistingId() throws Exception {
        // Create the Documentos with an existing ID
        documentos.setId(1L);

        int databaseSizeBeforeCreate = documentosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentos)))
            .andExpect(status().isBadRequest());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        // Get all the documentosList
        restDocumentosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDocumentosWithEagerRelationshipsIsEnabled() throws Exception {
        when(documentosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDocumentosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(documentosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDocumentosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(documentosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDocumentosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(documentosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        // Get the documentos
        restDocumentosMockMvc
            .perform(get(ENTITY_API_URL_ID, documentos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(documentos.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingDocumentos() throws Exception {
        // Get the documentos
        restDocumentosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();

        // Update the documentos
        Documentos updatedDocumentos = documentosRepository.findById(documentos.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentos are not directly saved in db
        em.detach(updatedDocumentos);
        updatedDocumentos.nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION).url(UPDATED_URL).estado(UPDATED_ESTADO);

        restDocumentosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDocumentos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDocumentos))
            )
            .andExpect(status().isOk());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
        Documentos testDocumentos = documentosList.get(documentosList.size() - 1);
        assertThat(testDocumentos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testDocumentos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDocumentos.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testDocumentos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();
        documentos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, documentos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(documentos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();
        documentos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(documentos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();
        documentos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDocumentosWithPatch() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();

        // Update the documentos using partial update
        Documentos partialUpdatedDocumentos = new Documentos();
        partialUpdatedDocumentos.setId(documentos.getId());

        partialUpdatedDocumentos.nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION).url(UPDATED_URL);

        restDocumentosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDocumentos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDocumentos))
            )
            .andExpect(status().isOk());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
        Documentos testDocumentos = documentosList.get(documentosList.size() - 1);
        assertThat(testDocumentos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testDocumentos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDocumentos.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testDocumentos.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateDocumentosWithPatch() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();

        // Update the documentos using partial update
        Documentos partialUpdatedDocumentos = new Documentos();
        partialUpdatedDocumentos.setId(documentos.getId());

        partialUpdatedDocumentos.nombre(UPDATED_NOMBRE).descripcion(UPDATED_DESCRIPCION).url(UPDATED_URL).estado(UPDATED_ESTADO);

        restDocumentosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDocumentos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDocumentos))
            )
            .andExpect(status().isOk());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
        Documentos testDocumentos = documentosList.get(documentosList.size() - 1);
        assertThat(testDocumentos.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testDocumentos.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDocumentos.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testDocumentos.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();
        documentos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, documentos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(documentos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();
        documentos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(documentos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDocumentos() throws Exception {
        int databaseSizeBeforeUpdate = documentosRepository.findAll().size();
        documentos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentosMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(documentos))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Documentos in the database
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDocumentos() throws Exception {
        // Initialize the database
        documentosRepository.saveAndFlush(documentos);

        int databaseSizeBeforeDelete = documentosRepository.findAll().size();

        // Delete the documentos
        restDocumentosMockMvc
            .perform(delete(ENTITY_API_URL_ID, documentos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Documentos> documentosList = documentosRepository.findAll();
        assertThat(documentosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
