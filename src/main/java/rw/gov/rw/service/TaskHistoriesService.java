package rw.gov.rw.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.gov.rw.service.dto.TaskHistoriesDTO;

/**
 * Service Interface for managing {@link rw.gov.rw.domain.TaskHistories}.
 */
public interface TaskHistoriesService {
    /**
     * Save a taskHistories.
     *
     * @param taskHistoriesDTO the entity to save.
     * @return the persisted entity.
     */
    TaskHistoriesDTO save(TaskHistoriesDTO taskHistoriesDTO);

    /**
     * Updates a taskHistories.
     *
     * @param taskHistoriesDTO the entity to update.
     * @return the persisted entity.
     */
    TaskHistoriesDTO update(TaskHistoriesDTO taskHistoriesDTO);

    /**
     * Partially updates a taskHistories.
     *
     * @param taskHistoriesDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TaskHistoriesDTO> partialUpdate(TaskHistoriesDTO taskHistoriesDTO);

    /**
     * Get all the taskHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TaskHistoriesDTO> findAll(Pageable pageable);

    /**
     * Get all the taskHistories with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TaskHistoriesDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" taskHistories.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TaskHistoriesDTO> findOne(Long id);

    /**
     * Delete the "id" taskHistories.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
