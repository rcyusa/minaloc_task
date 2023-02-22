package rw.gov.rw.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
import rw.gov.rw.IntegrationTest;
import rw.gov.rw.domain.Nst1Sector;
import rw.gov.rw.repository.Nst1SectorRepository;
import rw.gov.rw.service.dto.Nst1SectorDTO;
import rw.gov.rw.service.mapper.Nst1SectorMapper;

/**
 * Integration tests for the {@link Nst1SectorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class Nst1SectorResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/nst-1-sectors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private Nst1SectorRepository nst1SectorRepository;

    @Autowired
    private Nst1SectorMapper nst1SectorMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNst1SectorMockMvc;

    private Nst1Sector nst1Sector;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nst1Sector createEntity(EntityManager em) {
        Nst1Sector nst1Sector = new Nst1Sector()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return nst1Sector;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nst1Sector createUpdatedEntity(EntityManager em) {
        Nst1Sector nst1Sector = new Nst1Sector()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return nst1Sector;
    }

    @BeforeEach
    public void initTest() {
        nst1Sector = createEntity(em);
    }

    @Test
    @Transactional
    void createNst1Sector() throws Exception {
        int databaseSizeBeforeCreate = nst1SectorRepository.findAll().size();
        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);
        restNst1SectorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isCreated());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeCreate + 1);
        Nst1Sector testNst1Sector = nst1SectorList.get(nst1SectorList.size() - 1);
        assertThat(testNst1Sector.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNst1Sector.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNst1Sector.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testNst1Sector.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    void createNst1SectorWithExistingId() throws Exception {
        // Create the Nst1Sector with an existing ID
        nst1Sector.setId(1L);
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        int databaseSizeBeforeCreate = nst1SectorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNst1SectorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nst1SectorRepository.findAll().size();
        // set the field null
        nst1Sector.setName(null);

        // Create the Nst1Sector, which fails.
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        restNst1SectorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isBadRequest());

        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = nst1SectorRepository.findAll().size();
        // set the field null
        nst1Sector.setDescription(null);

        // Create the Nst1Sector, which fails.
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        restNst1SectorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isBadRequest());

        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = nst1SectorRepository.findAll().size();
        // set the field null
        nst1Sector.setCreatedAt(null);

        // Create the Nst1Sector, which fails.
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        restNst1SectorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isBadRequest());

        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUpdatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = nst1SectorRepository.findAll().size();
        // set the field null
        nst1Sector.setUpdatedAt(null);

        // Create the Nst1Sector, which fails.
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        restNst1SectorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isBadRequest());

        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllNst1Sectors() throws Exception {
        // Initialize the database
        nst1SectorRepository.saveAndFlush(nst1Sector);

        // Get all the nst1SectorList
        restNst1SectorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nst1Sector.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    void getNst1Sector() throws Exception {
        // Initialize the database
        nst1SectorRepository.saveAndFlush(nst1Sector);

        // Get the nst1Sector
        restNst1SectorMockMvc
            .perform(get(ENTITY_API_URL_ID, nst1Sector.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nst1Sector.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingNst1Sector() throws Exception {
        // Get the nst1Sector
        restNst1SectorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNst1Sector() throws Exception {
        // Initialize the database
        nst1SectorRepository.saveAndFlush(nst1Sector);

        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();

        // Update the nst1Sector
        Nst1Sector updatedNst1Sector = nst1SectorRepository.findById(nst1Sector.getId()).get();
        // Disconnect from session so that the updates on updatedNst1Sector are not directly saved in db
        em.detach(updatedNst1Sector);
        updatedNst1Sector.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).createdAt(UPDATED_CREATED_AT).updatedAt(UPDATED_UPDATED_AT);
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(updatedNst1Sector);

        restNst1SectorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, nst1SectorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO))
            )
            .andExpect(status().isOk());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
        Nst1Sector testNst1Sector = nst1SectorList.get(nst1SectorList.size() - 1);
        assertThat(testNst1Sector.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNst1Sector.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNst1Sector.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testNst1Sector.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void putNonExistingNst1Sector() throws Exception {
        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();
        nst1Sector.setId(count.incrementAndGet());

        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNst1SectorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, nst1SectorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNst1Sector() throws Exception {
        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();
        nst1Sector.setId(count.incrementAndGet());

        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNst1SectorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNst1Sector() throws Exception {
        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();
        nst1Sector.setId(count.incrementAndGet());

        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNst1SectorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNst1SectorWithPatch() throws Exception {
        // Initialize the database
        nst1SectorRepository.saveAndFlush(nst1Sector);

        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();

        // Update the nst1Sector using partial update
        Nst1Sector partialUpdatedNst1Sector = new Nst1Sector();
        partialUpdatedNst1Sector.setId(nst1Sector.getId());

        partialUpdatedNst1Sector.description(UPDATED_DESCRIPTION).createdAt(UPDATED_CREATED_AT);

        restNst1SectorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNst1Sector.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNst1Sector))
            )
            .andExpect(status().isOk());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
        Nst1Sector testNst1Sector = nst1SectorList.get(nst1SectorList.size() - 1);
        assertThat(testNst1Sector.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNst1Sector.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNst1Sector.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testNst1Sector.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    void fullUpdateNst1SectorWithPatch() throws Exception {
        // Initialize the database
        nst1SectorRepository.saveAndFlush(nst1Sector);

        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();

        // Update the nst1Sector using partial update
        Nst1Sector partialUpdatedNst1Sector = new Nst1Sector();
        partialUpdatedNst1Sector.setId(nst1Sector.getId());

        partialUpdatedNst1Sector
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restNst1SectorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNst1Sector.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNst1Sector))
            )
            .andExpect(status().isOk());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
        Nst1Sector testNst1Sector = nst1SectorList.get(nst1SectorList.size() - 1);
        assertThat(testNst1Sector.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNst1Sector.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNst1Sector.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testNst1Sector.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void patchNonExistingNst1Sector() throws Exception {
        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();
        nst1Sector.setId(count.incrementAndGet());

        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNst1SectorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, nst1SectorDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNst1Sector() throws Exception {
        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();
        nst1Sector.setId(count.incrementAndGet());

        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNst1SectorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNst1Sector() throws Exception {
        int databaseSizeBeforeUpdate = nst1SectorRepository.findAll().size();
        nst1Sector.setId(count.incrementAndGet());

        // Create the Nst1Sector
        Nst1SectorDTO nst1SectorDTO = nst1SectorMapper.toDto(nst1Sector);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNst1SectorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(nst1SectorDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Nst1Sector in the database
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNst1Sector() throws Exception {
        // Initialize the database
        nst1SectorRepository.saveAndFlush(nst1Sector);

        int databaseSizeBeforeDelete = nst1SectorRepository.findAll().size();

        // Delete the nst1Sector
        restNst1SectorMockMvc
            .perform(delete(ENTITY_API_URL_ID, nst1Sector.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nst1Sector> nst1SectorList = nst1SectorRepository.findAll();
        assertThat(nst1SectorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
