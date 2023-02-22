package rw.gov.rw.service.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import rw.gov.rw.domain.Institution;
import rw.gov.rw.domain.Nst1Sector;
import rw.gov.rw.domain.Position;
import rw.gov.rw.domain.Task;
import rw.gov.rw.domain.TaskType;
import rw.gov.rw.service.dto.InstitutionDTO;
import rw.gov.rw.service.dto.Nst1SectorDTO;
import rw.gov.rw.service.dto.PositionDTO;
import rw.gov.rw.service.dto.TaskDTO;
import rw.gov.rw.service.dto.TaskTypeDTO;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {
    @Mapping(target = "institutions", source = "institutions", qualifiedByName = "institutionNameSet")
    @Mapping(target = "positions", source = "positions", qualifiedByName = "positionNameSet")
    @Mapping(target = "taskType", source = "taskType", qualifiedByName = "taskTypeTitle")
    @Mapping(target = "nst1Sector", source = "nst1Sector", qualifiedByName = "nst1SectorName")
    TaskDTO toDto(Task s);

    @Mapping(target = "removeInstitution", ignore = true)
    @Mapping(target = "removePosition", ignore = true)
    Task toEntity(TaskDTO taskDTO);

    @Named("institutionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    InstitutionDTO toDtoInstitutionName(Institution institution);

    @Named("institutionNameSet")
    default Set<InstitutionDTO> toDtoInstitutionNameSet(Set<Institution> institution) {
        return institution.stream().map(this::toDtoInstitutionName).collect(Collectors.toSet());
    }

    @Named("positionName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    PositionDTO toDtoPositionName(Position position);

    @Named("positionNameSet")
    default Set<PositionDTO> toDtoPositionNameSet(Set<Position> position) {
        return position.stream().map(this::toDtoPositionName).collect(Collectors.toSet());
    }

    @Named("taskTypeTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    TaskTypeDTO toDtoTaskTypeTitle(TaskType taskType);

    @Named("nst1SectorName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    Nst1SectorDTO toDtoNst1SectorName(Nst1Sector nst1Sector);
}
