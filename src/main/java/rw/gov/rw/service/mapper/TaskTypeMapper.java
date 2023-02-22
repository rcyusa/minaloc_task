package rw.gov.rw.service.mapper;

import org.mapstruct.*;
import rw.gov.rw.domain.TaskType;
import rw.gov.rw.service.dto.TaskTypeDTO;

/**
 * Mapper for the entity {@link TaskType} and its DTO {@link TaskTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskTypeMapper extends EntityMapper<TaskTypeDTO, TaskType> {}
