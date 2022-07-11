package com.project.myapp.web.rest;

import static com.project.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.myapp.IntegrationTest;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.repository.UsuariosRepository;
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
 * Integration tests for the {@link UsuariosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UsuariosResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CEDULA = "AAAAAAAAAA";
    private static final String UPDATED_CEDULA = "BBBBBBBBBB";

    private static final String DEFAULT_PRIMER_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_PRIMER_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_SEGUNDO_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_SEGUNDO_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO_ELECTRONICO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO_ELECTRONICO = "BBBBBBBBBB";

    private static final String DEFAULT_GENERO = "AAAAAAAAAA";
    private static final String UPDATED_GENERO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_NACIMIENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_NACIMIENTO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LATITUD_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_LATITUD_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUD_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUD_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGEN_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGEN_URL = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_USUARIO_FINAL = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_USUARIO_FINAL = "BBBBBBBBBB";

    private static final String DEFAULT_CONTRASENNIA = "AAAAAAAAAA";
    private static final String UPDATED_CONTRASENNIA = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuariosMockMvc;

    private Usuarios usuarios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuarios createEntity(EntityManager em) {
        Usuarios usuarios = new Usuarios()
            .nombre(DEFAULT_NOMBRE)
            .cedula(DEFAULT_CEDULA)
            .primerApellido(DEFAULT_PRIMER_APELLIDO)
            .segundoApellido(DEFAULT_SEGUNDO_APELLIDO)
            .correoElectronico(DEFAULT_CORREO_ELECTRONICO)
            .genero(DEFAULT_GENERO)
            .telefono(DEFAULT_TELEFONO)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .latitudDireccion(DEFAULT_LATITUD_DIRECCION)
            .longitudDireccion(DEFAULT_LONGITUD_DIRECCION)
            .imagenURL(DEFAULT_IMAGEN_URL)
            .tipoUsuarioFinal(DEFAULT_TIPO_USUARIO_FINAL)
            .contrasennia(DEFAULT_CONTRASENNIA)
            .estado(DEFAULT_ESTADO);
        return usuarios;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuarios createUpdatedEntity(EntityManager em) {
        Usuarios usuarios = new Usuarios()
            .nombre(UPDATED_NOMBRE)
            .cedula(UPDATED_CEDULA)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .genero(UPDATED_GENERO)
            .telefono(UPDATED_TELEFONO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .latitudDireccion(UPDATED_LATITUD_DIRECCION)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .imagenURL(UPDATED_IMAGEN_URL)
            .tipoUsuarioFinal(UPDATED_TIPO_USUARIO_FINAL)
            .contrasennia(UPDATED_CONTRASENNIA)
            .estado(UPDATED_ESTADO);
        return usuarios;
    }

    @BeforeEach
    public void initTest() {
        usuarios = createEntity(em);
    }

    @Test
    @Transactional
    void createUsuarios() throws Exception {
        int databaseSizeBeforeCreate = usuariosRepository.findAll().size();
        // Create the Usuarios
        restUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isCreated());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeCreate + 1);
        Usuarios testUsuarios = usuariosList.get(usuariosList.size() - 1);
        assertThat(testUsuarios.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testUsuarios.getCedula()).isEqualTo(DEFAULT_CEDULA);
        assertThat(testUsuarios.getPrimerApellido()).isEqualTo(DEFAULT_PRIMER_APELLIDO);
        assertThat(testUsuarios.getSegundoApellido()).isEqualTo(DEFAULT_SEGUNDO_APELLIDO);
        assertThat(testUsuarios.getCorreoElectronico()).isEqualTo(DEFAULT_CORREO_ELECTRONICO);
        assertThat(testUsuarios.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testUsuarios.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testUsuarios.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testUsuarios.getLatitudDireccion()).isEqualTo(DEFAULT_LATITUD_DIRECCION);
        assertThat(testUsuarios.getLongitudDireccion()).isEqualTo(DEFAULT_LONGITUD_DIRECCION);
        assertThat(testUsuarios.getImagenURL()).isEqualTo(DEFAULT_IMAGEN_URL);
        assertThat(testUsuarios.getTipoUsuarioFinal()).isEqualTo(DEFAULT_TIPO_USUARIO_FINAL);
        assertThat(testUsuarios.getContrasennia()).isEqualTo(DEFAULT_CONTRASENNIA);
        assertThat(testUsuarios.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    void createUsuariosWithExistingId() throws Exception {
        // Create the Usuarios with an existing ID
        usuarios.setId(1L);

        int databaseSizeBeforeCreate = usuariosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosRepository.findAll().size();
        // set the field null
        usuarios.setNombre(null);

        // Create the Usuarios, which fails.

        restUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isBadRequest());

        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCorreoElectronicoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosRepository.findAll().size();
        // set the field null
        usuarios.setCorreoElectronico(null);

        // Create the Usuarios, which fails.

        restUsuariosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isBadRequest());

        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        // Get all the usuariosList
        restUsuariosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].cedula").value(hasItem(DEFAULT_CEDULA)))
            .andExpect(jsonPath("$.[*].primerApellido").value(hasItem(DEFAULT_PRIMER_APELLIDO)))
            .andExpect(jsonPath("$.[*].segundoApellido").value(hasItem(DEFAULT_SEGUNDO_APELLIDO)))
            .andExpect(jsonPath("$.[*].correoElectronico").value(hasItem(DEFAULT_CORREO_ELECTRONICO)))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(sameInstant(DEFAULT_FECHA_NACIMIENTO))))
            .andExpect(jsonPath("$.[*].latitudDireccion").value(hasItem(DEFAULT_LATITUD_DIRECCION)))
            .andExpect(jsonPath("$.[*].longitudDireccion").value(hasItem(DEFAULT_LONGITUD_DIRECCION)))
            .andExpect(jsonPath("$.[*].imagenURL").value(hasItem(DEFAULT_IMAGEN_URL)))
            .andExpect(jsonPath("$.[*].tipoUsuarioFinal").value(hasItem(DEFAULT_TIPO_USUARIO_FINAL)))
            .andExpect(jsonPath("$.[*].contrasennia").value(hasItem(DEFAULT_CONTRASENNIA)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }

    @Test
    @Transactional
    void getUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        // Get the usuarios
        restUsuariosMockMvc
            .perform(get(ENTITY_API_URL_ID, usuarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuarios.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.cedula").value(DEFAULT_CEDULA))
            .andExpect(jsonPath("$.primerApellido").value(DEFAULT_PRIMER_APELLIDO))
            .andExpect(jsonPath("$.segundoApellido").value(DEFAULT_SEGUNDO_APELLIDO))
            .andExpect(jsonPath("$.correoElectronico").value(DEFAULT_CORREO_ELECTRONICO))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.fechaNacimiento").value(sameInstant(DEFAULT_FECHA_NACIMIENTO)))
            .andExpect(jsonPath("$.latitudDireccion").value(DEFAULT_LATITUD_DIRECCION))
            .andExpect(jsonPath("$.longitudDireccion").value(DEFAULT_LONGITUD_DIRECCION))
            .andExpect(jsonPath("$.imagenURL").value(DEFAULT_IMAGEN_URL))
            .andExpect(jsonPath("$.tipoUsuarioFinal").value(DEFAULT_TIPO_USUARIO_FINAL))
            .andExpect(jsonPath("$.contrasennia").value(DEFAULT_CONTRASENNIA))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingUsuarios() throws Exception {
        // Get the usuarios
        restUsuariosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();

        // Update the usuarios
        Usuarios updatedUsuarios = usuariosRepository.findById(usuarios.getId()).get();
        // Disconnect from session so that the updates on updatedUsuarios are not directly saved in db
        em.detach(updatedUsuarios);
        updatedUsuarios
            .nombre(UPDATED_NOMBRE)
            .cedula(UPDATED_CEDULA)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .genero(UPDATED_GENERO)
            .telefono(UPDATED_TELEFONO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .latitudDireccion(UPDATED_LATITUD_DIRECCION)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .imagenURL(UPDATED_IMAGEN_URL)
            .tipoUsuarioFinal(UPDATED_TIPO_USUARIO_FINAL)
            .contrasennia(UPDATED_CONTRASENNIA)
            .estado(UPDATED_ESTADO);

        restUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUsuarios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
        Usuarios testUsuarios = usuariosList.get(usuariosList.size() - 1);
        assertThat(testUsuarios.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testUsuarios.getCedula()).isEqualTo(UPDATED_CEDULA);
        assertThat(testUsuarios.getPrimerApellido()).isEqualTo(UPDATED_PRIMER_APELLIDO);
        assertThat(testUsuarios.getSegundoApellido()).isEqualTo(UPDATED_SEGUNDO_APELLIDO);
        assertThat(testUsuarios.getCorreoElectronico()).isEqualTo(UPDATED_CORREO_ELECTRONICO);
        assertThat(testUsuarios.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testUsuarios.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testUsuarios.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testUsuarios.getLatitudDireccion()).isEqualTo(UPDATED_LATITUD_DIRECCION);
        assertThat(testUsuarios.getLongitudDireccion()).isEqualTo(UPDATED_LONGITUD_DIRECCION);
        assertThat(testUsuarios.getImagenURL()).isEqualTo(UPDATED_IMAGEN_URL);
        assertThat(testUsuarios.getTipoUsuarioFinal()).isEqualTo(UPDATED_TIPO_USUARIO_FINAL);
        assertThat(testUsuarios.getContrasennia()).isEqualTo(UPDATED_CONTRASENNIA);
        assertThat(testUsuarios.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();
        usuarios.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, usuarios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();
        usuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();
        usuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUsuariosWithPatch() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();

        // Update the usuarios using partial update
        Usuarios partialUpdatedUsuarios = new Usuarios();
        partialUpdatedUsuarios.setId(usuarios.getId());

        partialUpdatedUsuarios
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .telefono(UPDATED_TELEFONO)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .imagenURL(UPDATED_IMAGEN_URL)
            .estado(UPDATED_ESTADO);

        restUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
        Usuarios testUsuarios = usuariosList.get(usuariosList.size() - 1);
        assertThat(testUsuarios.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testUsuarios.getCedula()).isEqualTo(DEFAULT_CEDULA);
        assertThat(testUsuarios.getPrimerApellido()).isEqualTo(UPDATED_PRIMER_APELLIDO);
        assertThat(testUsuarios.getSegundoApellido()).isEqualTo(UPDATED_SEGUNDO_APELLIDO);
        assertThat(testUsuarios.getCorreoElectronico()).isEqualTo(UPDATED_CORREO_ELECTRONICO);
        assertThat(testUsuarios.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testUsuarios.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testUsuarios.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testUsuarios.getLatitudDireccion()).isEqualTo(DEFAULT_LATITUD_DIRECCION);
        assertThat(testUsuarios.getLongitudDireccion()).isEqualTo(UPDATED_LONGITUD_DIRECCION);
        assertThat(testUsuarios.getImagenURL()).isEqualTo(UPDATED_IMAGEN_URL);
        assertThat(testUsuarios.getTipoUsuarioFinal()).isEqualTo(DEFAULT_TIPO_USUARIO_FINAL);
        assertThat(testUsuarios.getContrasennia()).isEqualTo(DEFAULT_CONTRASENNIA);
        assertThat(testUsuarios.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateUsuariosWithPatch() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();

        // Update the usuarios using partial update
        Usuarios partialUpdatedUsuarios = new Usuarios();
        partialUpdatedUsuarios.setId(usuarios.getId());

        partialUpdatedUsuarios
            .nombre(UPDATED_NOMBRE)
            .cedula(UPDATED_CEDULA)
            .primerApellido(UPDATED_PRIMER_APELLIDO)
            .segundoApellido(UPDATED_SEGUNDO_APELLIDO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .genero(UPDATED_GENERO)
            .telefono(UPDATED_TELEFONO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .latitudDireccion(UPDATED_LATITUD_DIRECCION)
            .longitudDireccion(UPDATED_LONGITUD_DIRECCION)
            .imagenURL(UPDATED_IMAGEN_URL)
            .tipoUsuarioFinal(UPDATED_TIPO_USUARIO_FINAL)
            .contrasennia(UPDATED_CONTRASENNIA)
            .estado(UPDATED_ESTADO);

        restUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuarios))
            )
            .andExpect(status().isOk());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
        Usuarios testUsuarios = usuariosList.get(usuariosList.size() - 1);
        assertThat(testUsuarios.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testUsuarios.getCedula()).isEqualTo(UPDATED_CEDULA);
        assertThat(testUsuarios.getPrimerApellido()).isEqualTo(UPDATED_PRIMER_APELLIDO);
        assertThat(testUsuarios.getSegundoApellido()).isEqualTo(UPDATED_SEGUNDO_APELLIDO);
        assertThat(testUsuarios.getCorreoElectronico()).isEqualTo(UPDATED_CORREO_ELECTRONICO);
        assertThat(testUsuarios.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testUsuarios.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testUsuarios.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testUsuarios.getLatitudDireccion()).isEqualTo(UPDATED_LATITUD_DIRECCION);
        assertThat(testUsuarios.getLongitudDireccion()).isEqualTo(UPDATED_LONGITUD_DIRECCION);
        assertThat(testUsuarios.getImagenURL()).isEqualTo(UPDATED_IMAGEN_URL);
        assertThat(testUsuarios.getTipoUsuarioFinal()).isEqualTo(UPDATED_TIPO_USUARIO_FINAL);
        assertThat(testUsuarios.getContrasennia()).isEqualTo(UPDATED_CONTRASENNIA);
        assertThat(testUsuarios.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();
        usuarios.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, usuarios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();
        usuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuarios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUsuarios() throws Exception {
        int databaseSizeBeforeUpdate = usuariosRepository.findAll().size();
        usuarios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuariosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(usuarios)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Usuarios in the database
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUsuarios() throws Exception {
        // Initialize the database
        usuariosRepository.saveAndFlush(usuarios);

        int databaseSizeBeforeDelete = usuariosRepository.findAll().size();

        // Delete the usuarios
        restUsuariosMockMvc
            .perform(delete(ENTITY_API_URL_ID, usuarios.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Usuarios> usuariosList = usuariosRepository.findAll();
        assertThat(usuariosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
