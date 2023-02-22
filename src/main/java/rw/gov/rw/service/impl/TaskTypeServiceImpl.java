package rw.gov.rw.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.gov.rw.domain.TaskType;
import rw.gov.rw.repository.TaskTypeRepository;
import rw.gov.rw.service.TaskTypeService;
import rw.gov.rw.service.dto.TaskTypeDTO;
import rw.gov.rw.service.mapper.TaskTypeMapper;

/**
 * Service Implementation for managing {@link TaskType}.
 */
@Service
@Transactional
public class TaskTypeServiceImpl implements TaskTypeService {

    private final Logger log = LoggerFactory.getLogger(TaskTypeServiceImpl.class);

    private final TaskTypeRepository taskTypeRepository;

    private final TaskTypeMapper taskTypeMapper;

    public TaskTypeServiceImpl(TaskTypeRepository taskTypeRepository, TaskTypeMapper taskTypeMapper) {
        this.taskTypeRepository = taskTypeRepository;
        this.taskTypeMapper = taskTypeMapper;
    }

    @Override
    public TaskTypeDTO save(TaskTypeDTO taskTypeDTO) {
        log.debug("Request to save TaskType : {}", taskTypeDTO);
        TaskType taskType = taskTypeMapper.toEntity(taskTypeDTO);
        taskType = taskTypeRepository.save(taskType);
        return taskTypeMapper.toDto(taskType);
    }

    @Override
    public TaskTypeDTO update(TaskTypeDTO taskTypeDTO) {
        log.debug("Request to update TaskType : {}", taskTypeDTO);
        TaskType taskType = taskTypeMapper.toEntity(taskTypeDTO);
        taskType = taskTypeRepository.save(taskType);
        return taskTypeMapper.toDto(taskType);
    }

    @Override
    public Optional<TaskTypeDTO> partialUpdate(TaskTypeDTO taskTypeDTO) {
        log.debug("Request to partially update TaskType : {}", taskTypeDTO);

        return taskTypeRepository
            .findById(taskTypeDTO.getId())
            .map(existingTaskType -> {
                taskTypeMapper.partialUpdate(existingTaskType, taskTypeDTO);

                return existingTaskType;
            })
            .map(taskTypeRepository::save)
            .map(taskTypeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TaskTypes");
        return taskTypeRepository.findAll(pageable).map(taskTypeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TaskTypeDTO> findOne(Long id) {
        log.debug("Request to get TaskType : {}", id);
        return taskTypeRepository.findById(id).map(taskTypeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TaskType : {}", id);
        taskTypeRepository.deleteById(id);
    }
}
