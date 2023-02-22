package rw.gov.rw.service.mapper;

import org.mapstruct.*;
import rw.gov.rw.domain.Task;
import rw.gov.rw.domain.TaskHistories;
import rw.gov.rw.service.dto.TaskDTO;
import rw.gov.rw.service.dto.TaskHistoriesDTO;

/**
 * Mapper for the entity {@link TaskHistories} and its DTO {@link TaskHistoriesDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskHistoriesMapper extends EntityMapper<TaskHistoriesDTO, TaskHistories> {
    @Mapping(target = "task", source = "task", qualifiedByName = "taskTitle")
    TaskHistoriesDTO toDto(TaskHistories s);

    @Named("taskTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    TaskDTO toDtoTaskTitle(Task task);
}
