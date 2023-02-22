package rw.gov.rw.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.gov.rw.service.dto.TaskTypeDTO;

/**
 * Service Interface for managing {@link rw.gov.rw.domain.TaskType}.
 */
public interface TaskTypeService {
    /**
     * Save a taskType.
     *
     * @param taskTypeDTO the entity to save.
     * @return the persisted entity.
     */
    TaskTypeDTO save(TaskTypeDTO taskTypeDTO);

    /**
     * Updates a taskType.
     *
     * @param taskTypeDTO the entity to update.
     * @return the persisted entity.
     */
    TaskTypeDTO update(TaskTypeDTO taskTypeDTO);

    /**
     * Partially updates a taskType.
     *
     * @param taskTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TaskTypeDTO> partialUpdate(TaskTypeDTO taskTypeDTO);

    /**
     * Get all the taskTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TaskTypeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" taskType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TaskTypeDTO> findOne(Long id);

    /**
     * Delete the "id" taskType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
