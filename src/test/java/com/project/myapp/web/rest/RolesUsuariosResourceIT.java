package com.project.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.RolesUsuarios;
import com.project.myapp.repository.RolesUsuariosRepository;
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
 * Integration tests for the {@link RolesUsuariosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RolesUsuariosResourceIT {

    private static final String DEFAULT_ROL = "AAAAAAAAAA";
    private static final String UPDATED_ROL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/roles-usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RolesUsuariosRepository rolesUsuariosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRolesUsuariosMockMvc;

    private RolesUsuarios rolesUsuarios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolesUsuarios createEntity(EntityManager em) {
        RolesUsuarios rolesUsuarios = new RolesUsuarios().rol(DEFAULT_ROL);
        return rolesUsuarios;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RolesUsuarios createUpdatedEntity(EntityManager em) {
        RolesUsuarios rolesUsuarios = new RolesUsuarios().rol(UPDATED_ROL);
        return rolesUsuarios;
    }

    @BeforeEach
    public void initTest() {
        rolesUsuarios = createEntity(em);
    }

    @Test
    @Transactional
    void createRolesUsuarios() throws Exception {
        int databaseSizeBeforeCreate = rolesUsuariosRepository.findAll().size();
        // Create the RolesUsuarios
        restRolesUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolesUsuarios)))
            .andExpect(status().isCreated());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeCreate + 1);
        RolesUsuarios testRolesUsuarios = rolesUsuariosList.get(rolesUsuariosList.size() - 1);
        assertThat(testRolesUsuarios.getRol()).isEqualTo(DEFAULT_ROL);
    }

    @Test
    @Transactional
    void createRolesUsuariosWithExistingId() throws Exception {
        // Create the RolesUsuarios with an existing ID
        rolesUsuarios.setId(1L);

        int databaseSizeBeforeCreate = rolesUsuariosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolesUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolesUsuarios)))
            .andExpect(status().isBadRequest());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkRolIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesUsuariosRepository.findAll().size();
        // set the field null
        rolesUsuarios.setRol(null);

        // Create the RolesUsuarios, which fails.

        restRolesUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolesUsuarios)))
            .andExpect(status().isBadRequest());

        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRolesUsuarios() throws Exception {
        // Initialize the database
        rolesUsuariosRepository.saveAndFlush(rolesUsuarios);

        // Get all the rolesUsuariosList
        restRolesUsuariosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rolesUsuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].rol").value(hasItem(DEFAULT_ROL)));
    }

    @Test
    @Transactional
    void getRolesUsuarios() throws Exception {
        // Initialize the database
        rolesUsuariosRepository.saveAndFlush(rolesUsuarios);

        // Get the rolesUsuarios
        restRolesUsuariosMockMvc
            .perform(get(ENTITY_API_URL_ID, rolesUsuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rolesUsuarios.getId().intValue()))
            .andExpect(jsonPath("$.rol").value(DEFAULT_ROL));
    }

    @Test
    @Transactional
    void getNonExistingRolesUsuarios() throws Exception {
        // Get the rolesUsuarios
        restRolesUsuariosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRolesUsuarios() throws Exception {
        // Initialize the database
        rolesUsuariosRepository.saveAndFlush(rolesUsuarios);

        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();

        // Update the rolesUsuarios
        RolesUsuarios updatedRolesUsuarios = rolesUsuariosRepository.findById(rolesUsuarios.getId()).get();
        // Disconnect from session so that the updates on updatedRolesUsuarios are not directly saved in db
        em.detach(updatedRolesUsuarios);
        updatedRolesUsuarios.rol(UPDATED_ROL);

        restRolesUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRolesUsuarios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRolesUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
        RolesUsuarios testRolesUsuarios = rolesUsuariosList.get(rolesUsuariosList.size() - 1);
        assertThat(testRolesUsuarios.getRol()).isEqualTo(UPDATED_ROL);
    }

    @Test
    @Transactional
    void putNonExistingRolesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();
        rolesUsuarios.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolesUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rolesUsuarios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rolesUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRolesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();
        rolesUsuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolesUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rolesUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRolesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();
        rolesUsuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolesUsuariosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rolesUsuarios)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRolesUsuariosWithPatch() throws Exception {
        // Initialize the database
        rolesUsuariosRepository.saveAndFlush(rolesUsuarios);

        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();

        // Update the rolesUsuarios using partial update
        RolesUsuarios partialUpdatedRolesUsuarios = new RolesUsuarios();
        partialUpdatedRolesUsuarios.setId(rolesUsuarios.getId());

        restRolesUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRolesUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRolesUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
        RolesUsuarios testRolesUsuarios = rolesUsuariosList.get(rolesUsuariosList.size() - 1);
        assertThat(testRolesUsuarios.getRol()).isEqualTo(DEFAULT_ROL);
    }

    @Test
    @Transactional
    void fullUpdateRolesUsuariosWithPatch() throws Exception {
        // Initialize the database
        rolesUsuariosRepository.saveAndFlush(rolesUsuarios);

        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();

        // Update the rolesUsuarios using partial update
        RolesUsuarios partialUpdatedRolesUsuarios = new RolesUsuarios();
        partialUpdatedRolesUsuarios.setId(rolesUsuarios.getId());

        partialUpdatedRolesUsuarios.rol(UPDATED_ROL);

        restRolesUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRolesUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRolesUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
        RolesUsuarios testRolesUsuarios = rolesUsuariosList.get(rolesUsuariosList.size() - 1);
        assertThat(testRolesUsuarios.getRol()).isEqualTo(UPDATED_ROL);
    }

    @Test
    @Transactional
    void patchNonExistingRolesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();
        rolesUsuarios.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolesUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rolesUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rolesUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRolesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();
        rolesUsuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolesUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rolesUsuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRolesUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = rolesUsuariosRepository.findAll().size();
        rolesUsuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRolesUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rolesUsuarios))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RolesUsuarios in the database
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRolesUsuarios() throws Exception {
        // Initialize the database
        rolesUsuariosRepository.saveAndFlush(rolesUsuarios);

        int databaseSizeBeforeDelete = rolesUsuariosRepository.findAll().size();

        // Delete the rolesUsuarios
        restRolesUsuariosMockMvc
            .perform(delete(ENTITY_API_URL_ID, rolesUsuarios.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RolesUsuarios> rolesUsuariosList = rolesUsuariosRepository.findAll();
        assertThat(rolesUsuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
