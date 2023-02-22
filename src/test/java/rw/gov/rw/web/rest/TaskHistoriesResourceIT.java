package rw.gov.rw.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import rw.gov.rw.IntegrationTest;
import rw.gov.rw.domain.TaskHistories;
import rw.gov.rw.domain.enumeration.Status;
import rw.gov.rw.repository.TaskHistoriesRepository;
import rw.gov.rw.service.TaskHistoriesService;
import rw.gov.rw.service.dto.TaskHistoriesDTO;
import rw.gov.rw.service.mapper.TaskHistoriesMapper;

/**
 * Integration tests for the {@link TaskHistoriesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class TaskHistoriesResourceIT {

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    private static final Status DEFAULT_STATUS = Status.COMPLETED;
    private static final Status UPDATED_STATUS = Status.ON_TRACK;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/task-histories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TaskHistoriesRepository taskHistoriesRepository;

    @Mock
    private TaskHistoriesRepository taskHistoriesRepositoryMock;

    @Autowired
    private TaskHistoriesMapper taskHistoriesMapper;

    @Mock
    private TaskHistoriesService taskHistoriesServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTaskHistoriesMockMvc;

    private TaskHistories taskHistories;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskHistories createEntity(EntityManager em) {
        TaskHistories taskHistories = new TaskHistories()
            .comment(DEFAULT_COMMENT)
            .status(DEFAULT_STATUS)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return taskHistories;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskHistories createUpdatedEntity(EntityManager em) {
        TaskHistories taskHistories = new TaskHistories()
            .comment(UPDATED_COMMENT)
            .status(UPDATED_STATUS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return taskHistories;
    }

    @BeforeEach
    public void initTest() {
        taskHistories = createEntity(em);
    }

    @Test
    @Transactional
    void createTaskHistories() throws Exception {
        int databaseSizeBeforeCreate = taskHistoriesRepository.findAll().size();
        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);
        restTaskHistoriesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isCreated());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeCreate + 1);
        TaskHistories testTaskHistories = taskHistoriesList.get(taskHistoriesList.size() - 1);
        assertThat(testTaskHistories.getComment()).isEqualTo(DEFAULT_COMMENT);
        assertThat(testTaskHistories.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTaskHistories.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTaskHistories.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    void createTaskHistoriesWithExistingId() throws Exception {
        // Create the TaskHistories with an existing ID
        taskHistories.setId(1L);
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        int databaseSizeBeforeCreate = taskHistoriesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskHistoriesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCommentIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskHistoriesRepository.findAll().size();
        // set the field null
        taskHistories.setComment(null);

        // Create the TaskHistories, which fails.
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        restTaskHistoriesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskHistoriesRepository.findAll().size();
        // set the field null
        taskHistories.setStatus(null);

        // Create the TaskHistories, which fails.
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        restTaskHistoriesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskHistoriesRepository.findAll().size();
        // set the field null
        taskHistories.setCreatedAt(null);

        // Create the TaskHistories, which fails.
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        restTaskHistoriesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUpdatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskHistoriesRepository.findAll().size();
        // set the field null
        taskHistories.setUpdatedAt(null);

        // Create the TaskHistories, which fails.
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        restTaskHistoriesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTaskHistories() throws Exception {
        // Initialize the database
        taskHistoriesRepository.saveAndFlush(taskHistories);

        // Get all the taskHistoriesList
        restTaskHistoriesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskHistories.getId().intValue())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTaskHistoriesWithEagerRelationshipsIsEnabled() throws Exception {
        when(taskHistoriesServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTaskHistoriesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(taskHistoriesServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTaskHistoriesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(taskHistoriesServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTaskHistoriesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(taskHistoriesRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getTaskHistories() throws Exception {
        // Initialize the database
        taskHistoriesRepository.saveAndFlush(taskHistories);

        // Get the taskHistories
        restTaskHistoriesMockMvc
            .perform(get(ENTITY_API_URL_ID, taskHistories.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(taskHistories.getId().intValue()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTaskHistories() throws Exception {
        // Get the taskHistories
        restTaskHistoriesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTaskHistories() throws Exception {
        // Initialize the database
        taskHistoriesRepository.saveAndFlush(taskHistories);

        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();

        // Update the taskHistories
        TaskHistories updatedTaskHistories = taskHistoriesRepository.findById(taskHistories.getId()).get();
        // Disconnect from session so that the updates on updatedTaskHistories are not directly saved in db
        em.detach(updatedTaskHistories);
        updatedTaskHistories.comment(UPDATED_COMMENT).status(UPDATED_STATUS).createdAt(UPDATED_CREATED_AT).updatedAt(UPDATED_UPDATED_AT);
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(updatedTaskHistories);

        restTaskHistoriesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskHistoriesDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isOk());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
        TaskHistories testTaskHistories = taskHistoriesList.get(taskHistoriesList.size() - 1);
        assertThat(testTaskHistories.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testTaskHistories.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTaskHistories.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTaskHistories.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void putNonExistingTaskHistories() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();
        taskHistories.setId(count.incrementAndGet());

        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskHistoriesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, taskHistoriesDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTaskHistories() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();
        taskHistories.setId(count.incrementAndGet());

        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskHistoriesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTaskHistories() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();
        taskHistories.setId(count.incrementAndGet());

        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskHistoriesMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTaskHistoriesWithPatch() throws Exception {
        // Initialize the database
        taskHistoriesRepository.saveAndFlush(taskHistories);

        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();

        // Update the taskHistories using partial update
        TaskHistories partialUpdatedTaskHistories = new TaskHistories();
        partialUpdatedTaskHistories.setId(taskHistories.getId());

        partialUpdatedTaskHistories
            .comment(UPDATED_COMMENT)
            .status(UPDATED_STATUS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restTaskHistoriesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskHistories.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskHistories))
            )
            .andExpect(status().isOk());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
        TaskHistories testTaskHistories = taskHistoriesList.get(taskHistoriesList.size() - 1);
        assertThat(testTaskHistories.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testTaskHistories.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTaskHistories.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTaskHistories.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void fullUpdateTaskHistoriesWithPatch() throws Exception {
        // Initialize the database
        taskHistoriesRepository.saveAndFlush(taskHistories);

        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();

        // Update the taskHistories using partial update
        TaskHistories partialUpdatedTaskHistories = new TaskHistories();
        partialUpdatedTaskHistories.setId(taskHistories.getId());

        partialUpdatedTaskHistories
            .comment(UPDATED_COMMENT)
            .status(UPDATED_STATUS)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restTaskHistoriesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTaskHistories.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTaskHistories))
            )
            .andExpect(status().isOk());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
        TaskHistories testTaskHistories = taskHistoriesList.get(taskHistoriesList.size() - 1);
        assertThat(testTaskHistories.getComment()).isEqualTo(UPDATED_COMMENT);
        assertThat(testTaskHistories.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTaskHistories.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTaskHistories.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    void patchNonExistingTaskHistories() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();
        taskHistories.setId(count.incrementAndGet());

        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskHistoriesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, taskHistoriesDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTaskHistories() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();
        taskHistories.setId(count.incrementAndGet());

        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskHistoriesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTaskHistories() throws Exception {
        int databaseSizeBeforeUpdate = taskHistoriesRepository.findAll().size();
        taskHistories.setId(count.incrementAndGet());

        // Create the TaskHistories
        TaskHistoriesDTO taskHistoriesDTO = taskHistoriesMapper.toDto(taskHistories);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTaskHistoriesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(taskHistoriesDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TaskHistories in the database
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTaskHistories() throws Exception {
        // Initialize the database
        taskHistoriesRepository.saveAndFlush(taskHistories);

        int databaseSizeBeforeDelete = taskHistoriesRepository.findAll().size();

        // Delete the taskHistories
        restTaskHistoriesMockMvc
            .perform(delete(ENTITY_API_URL_ID, taskHistories.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskHistories> taskHistoriesList = taskHistoriesRepository.findAll();
        assertThat(taskHistoriesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
