package rw.gov.rw.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.gov.rw.domain.TaskHistories;
import rw.gov.rw.repository.TaskHistoriesRepository;
import rw.gov.rw.service.TaskHistoriesService;
import rw.gov.rw.service.dto.TaskHistoriesDTO;
import rw.gov.rw.service.mapper.TaskHistoriesMapper;

/**
 * Service Implementation for managing {@link TaskHistories}.
 */
@Service
@Transactional
public class TaskHistoriesServiceImpl implements TaskHistoriesService {

    private final Logger log = LoggerFactory.getLogger(TaskHistoriesServiceImpl.class);

    private final TaskHistoriesRepository taskHistoriesRepository;

    private final TaskHistoriesMapper taskHistoriesMapper;

    public TaskHistoriesServiceImpl(TaskHistoriesRepository taskHistoriesRepository, TaskHistoriesMapper taskHistoriesMapper) {
        this.taskHistoriesRepository = taskHistoriesRepository;
        this.taskHistoriesMapper = taskHistoriesMapper;
    }

    @Override
    public TaskHistoriesDTO save(TaskHistoriesDTO taskHistoriesDTO) {
        log.debug("Request to save TaskHistories : {}", taskHistoriesDTO);
        TaskHistories taskHistories = taskHistoriesMapper.toEntity(taskHistoriesDTO);
        taskHistories = taskHistoriesRepository.save(taskHistories);
        return taskHistoriesMapper.toDto(taskHistories);
    }

    @Override
    public TaskHistoriesDTO update(TaskHistoriesDTO taskHistoriesDTO) {
        log.debug("Request to update TaskHistories : {}", taskHistoriesDTO);
        TaskHistories taskHistories = taskHistoriesMapper.toEntity(taskHistoriesDTO);
        taskHistories = taskHistoriesRepository.save(taskHistories);
        return taskHistoriesMapper.toDto(taskHistories);
    }

    @Override
    public Optional<TaskHistoriesDTO> partialUpdate(TaskHistoriesDTO taskHistoriesDTO) {
        log.debug("Request to partially update TaskHistories : {}", taskHistoriesDTO);

        return taskHistoriesRepository
            .findById(taskHistoriesDTO.getId())
            .map(existingTaskHistories -> {
                taskHistoriesMapper.partialUpdate(existingTaskHistories, taskHistoriesDTO);

                return existingTaskHistories;
            })
            .map(taskHistoriesRepository::save)
            .map(taskHistoriesMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskHistoriesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TaskHistories");
        return taskHistoriesRepository.findAll(pageable).map(taskHistoriesMapper::toDto);
    }

    public Page<TaskHistoriesDTO> findAllWithEagerRelationships(Pageable pageable) {
        return taskHistoriesRepository.findAllWithEagerRelationships(pageable).map(taskHistoriesMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TaskHistoriesDTO> findOne(Long id) {
        log.debug("Request to get TaskHistories : {}", id);
        return taskHistoriesRepository.findOneWithEagerRelationships(id).map(taskHistoriesMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TaskHistories : {}", id);
        taskHistoriesRepository.deleteById(id);
    }
}
