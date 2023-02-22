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
import rw.gov.rw.domain.TaskType;
import rw.gov.rw.repository.TaskTypeRepository;
import rw.gov.rw.service.dto.TaskTypeDTO;
import rw.gov.rw.service.mapper.TaskTypeMapper;

/**
 * Integration tests for the {@link TaskTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TaskTypeResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/task-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TaskTypeRepository taskTypeRepository;

    @Autowired
    private TaskTypeMapper taskTypeMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskTypeMockMvc;

    private TaskType taskType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskType createEntity(EntityManager em) {
        TaskType taskType = new TaskType()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return taskType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskType createUpdatedEntity(EntityManager em) {
        TaskType taskType = new TaskType()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return taskType;
    }

    @BeforeEach
    public void initTest() {
        taskType = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskType() throws Exception {
        int databaseSizeBeforeCreate = taskTypeRepository.findAll().size();
        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);
        restTaskTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TaskType testTaskType = taskTypeList.get(taskTypeList.size() - 1);
        assertThat(testTaskType.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTaskType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTaskType.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTaskType.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    void createTaskTypeWithExistingId() throws Exception {
        // Create the TaskType with an existing ID
        taskType.setId(1L);
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        int databaseSizeBeforeCreate = taskTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskTypeRepository.findAll().size();
        // set the field null
        taskType.setTitle(null);

        // Create the TaskType, which fails.
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        restTaskTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isBadRequest());

        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskTypeRepository.findAll().size();
        // set the field null
        taskType.setDescription(null);

        // Create the TaskType, which fails.
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        restTaskTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isBadRequest());

        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskTypeRepository.findAll().size();
        // set the field null
        taskType.setCreatedAt(null);

        // Create the TaskType, which fails.
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        restTaskTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isBadRequest());

        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUpdatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskTypeRepository.findAll().size();
        // set the field null
        taskType.setUpdatedAt(null);

        // Create the TaskType, which fails.
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        restTaskTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isBadRequest());

        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTaskTypes() throws Exception {
        // Initialize the database
        taskTypeRepository.saveAndFlush(taskType);

        // Get all the taskTypeList
        restTaskTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskType.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    void getTaskType() throws Exception {
        // Initialize the database
        taskTypeRepository.saveAndFlush(taskType);

        // Get the taskType
        restTaskTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, taskType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskType.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTaskType() throws Exception {
        // Get the taskType
        restTaskTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTaskType() throws Exception {
        // Initialize the database
        taskTypeRepository.saveAndFlush(taskType);

        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();

        // Update the taskType
        TaskType updatedTaskType = taskTypeRepository.findById(taskType.getId()).get();
        // Disconnect from session so that the updates on updatedTaskType are not directly saved in db
        em.detach(updatedTaskType);
        updatedTaskType.title(UPDATED_TITLE).description(UPDATED_DESCRIPTION).createdAt(UPDATED_CREATED_AT).updatedAt(UPDATED_UPDATED_AT);
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(updatedTaskType);

        restTaskTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskTypeDTO))
            )
            .andExpect(status().isOk());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
        TaskType testTaskType = taskTypeList.get(taskTypeList.size() - 1);
        assertThat(testTaskType.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTaskType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTaskType.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTaskType.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void putNonExistingTaskType() throws Exception {
        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();
        taskType.setId(count.incrementAndGet());

        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTaskType() throws Exception {
        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();
        taskType.setId(count.incrementAndGet());

        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTaskType() throws Exception {
        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();
        taskType.setId(count.incrementAndGet());

        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskTypeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskTypeWithPatch() throws Exception {
        // Initialize the database
        taskTypeRepository.saveAndFlush(taskType);

        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();

        // Update the taskType using partial update
        TaskType partialUpdatedTaskType = new TaskType();
        partialUpdatedTaskType.setId(taskType.getId());

        partialUpdatedTaskType.title(UPDATED_TITLE).createdAt(UPDATED_CREATED_AT).updatedAt(UPDATED_UPDATED_AT);

        restTaskTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskType))
            )
            .andExpect(status().isOk());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
        TaskType testTaskType = taskTypeList.get(taskTypeList.size() - 1);
        assertThat(testTaskType.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTaskType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTaskType.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTaskType.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void fullUpdateTaskTypeWithPatch() throws Exception {
        // Initialize the database
        taskTypeRepository.saveAndFlush(taskType);

        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();

        // Update the taskType using partial update
        TaskType partialUpdatedTaskType = new TaskType();
        partialUpdatedTaskType.setId(taskType.getId());

        partialUpdatedTaskType
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restTaskTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskType))
            )
            .andExpect(status().isOk());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
        TaskType testTaskType = taskTypeList.get(taskTypeList.size() - 1);
        assertThat(testTaskType.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTaskType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTaskType.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTaskType.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void patchNonExistingTaskType() throws Exception {
        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();
        taskType.setId(count.incrementAndGet());

        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskTypeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTaskType() throws Exception {
        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();
        taskType.setId(count.incrementAndGet());

        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTaskType() throws Exception {
        int databaseSizeBeforeUpdate = taskTypeRepository.findAll().size();
        taskType.setId(count.incrementAndGet());

        // Create the TaskType
        TaskTypeDTO taskTypeDTO = taskTypeMapper.toDto(taskType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskTypeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(taskTypeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskType in the database
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTaskType() throws Exception {
        // Initialize the database
        taskTypeRepository.saveAndFlush(taskType);

        int databaseSizeBeforeDelete = taskTypeRepository.findAll().size();

        // Delete the taskType
        restTaskTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, taskType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskType> taskTypeList = taskTypeRepository.findAll();
        assertThat(taskTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
