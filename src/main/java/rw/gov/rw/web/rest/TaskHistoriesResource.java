package rw.gov.rw.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import rw.gov.rw.repository.TaskHistoriesRepository;
import rw.gov.rw.service.TaskHistoriesService;
import rw.gov.rw.service.dto.TaskHistoriesDTO;
import rw.gov.rw.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rw.gov.rw.domain.TaskHistories}.
 */
@RestController
@RequestMapping("/api")
public class TaskHistoriesResource {

    private final Logger log = LoggerFactory.getLogger(TaskHistoriesResource.class);

    private static final String ENTITY_NAME = "taskHistories";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskHistoriesService taskHistoriesService;

    private final TaskHistoriesRepository taskHistoriesRepository;

    public TaskHistoriesResource(TaskHistoriesService taskHistoriesService, TaskHistoriesRepository taskHistoriesRepository) {
        this.taskHistoriesService = taskHistoriesService;
        this.taskHistoriesRepository = taskHistoriesRepository;
    }

    /**
     * {@code POST  /task-histories} : Create a new taskHistories.
     *
     * @param taskHistoriesDTO the taskHistoriesDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskHistoriesDTO, or with status {@code 400 (Bad Request)} if the taskHistories has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task-histories")
    public ResponseEntity<TaskHistoriesDTO> createTaskHistories(@Valid @RequestBody TaskHistoriesDTO taskHistoriesDTO)
        throws URISyntaxException {
        log.debug("REST request to save TaskHistories : {}", taskHistoriesDTO);
        if (taskHistoriesDTO.getId() != null) {
            throw new BadRequestAlertException("A new taskHistories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskHistoriesDTO result = taskHistoriesService.save(taskHistoriesDTO);
        return ResponseEntity
            .created(new URI("/api/task-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-histories/:id} : Updates an existing taskHistories.
     *
     * @param id the id of the taskHistoriesDTO to save.
     * @param taskHistoriesDTO the taskHistoriesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskHistoriesDTO,
     * or with status {@code 400 (Bad Request)} if the taskHistoriesDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskHistoriesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/task-histories/{id}")
    public ResponseEntity<TaskHistoriesDTO> updateTaskHistories(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TaskHistoriesDTO taskHistoriesDTO
    ) throws URISyntaxException {
        log.debug("REST request to update TaskHistories : {}, {}", id, taskHistoriesDTO);
        if (taskHistoriesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskHistoriesDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskHistoriesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TaskHistoriesDTO result = taskHistoriesService.update(taskHistoriesDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskHistoriesDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /task-histories/:id} : Partial updates given fields of an existing taskHistories, field will ignore if it is null
     *
     * @param id the id of the taskHistoriesDTO to save.
     * @param taskHistoriesDTO the taskHistoriesDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskHistoriesDTO,
     * or with status {@code 400 (Bad Request)} if the taskHistoriesDTO is not valid,
     * or with status {@code 404 (Not Found)} if the taskHistoriesDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the taskHistoriesDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/task-histories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TaskHistoriesDTO> partialUpdateTaskHistories(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TaskHistoriesDTO taskHistoriesDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update TaskHistories partially : {}, {}", id, taskHistoriesDTO);
        if (taskHistoriesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, taskHistoriesDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!taskHistoriesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TaskHistoriesDTO> result = taskHistoriesService.partialUpdate(taskHistoriesDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskHistoriesDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /task-histories} : get all the taskHistories.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskHistories in body.
     */
    @GetMapping("/task-histories")
    public ResponseEntity<List<TaskHistoriesDTO>> getAllTaskHistories(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of TaskHistories");
        Page<TaskHistoriesDTO> page;
        if (eagerload) {
            page = taskHistoriesService.findAllWithEagerRelationships(pageable);
        } else {
            page = taskHistoriesService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /task-histories/:id} : get the "id" taskHistories.
     *
     * @param id the id of the taskHistoriesDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskHistoriesDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task-histories/{id}")
    public ResponseEntity<TaskHistoriesDTO> getTaskHistories(@PathVariable Long id) {
        log.debug("REST request to get TaskHistories : {}", id);
        Optional<TaskHistoriesDTO> taskHistoriesDTO = taskHistoriesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(taskHistoriesDTO);
    }

    /**
     * {@code DELETE  /task-histories/:id} : delete the "id" taskHistories.
     *
     * @param id the id of the taskHistoriesDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task-histories/{id}")
    public ResponseEntity<Void> deleteTaskHistories(@PathVariable Long id) {
        log.debug("REST request to delete TaskHistories : {}", id);
        taskHistoriesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
