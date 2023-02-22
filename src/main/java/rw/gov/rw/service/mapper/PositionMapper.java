package rw.gov.rw.service.mapper;

import org.mapstruct.*;
import rw.gov.rw.domain.Department;
import rw.gov.rw.domain.Position;
import rw.gov.rw.service.dto.DepartmentDTO;
import rw.gov.rw.service.dto.PositionDTO;

/**
 * Mapper for the entity {@link Position} and its DTO {@link PositionDTO}.
 */
@Mapper(componentModel = "spring")
public interface PositionMapper extends EntityMapper<PositionDTO, Position> {
    @Mapping(target = "department", source = "department", qualifiedByName = "departmentName")
    PositionDTO toDto(Position s);

    @Named("departmentName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    DepartmentDTO toDtoDepartmentName(Department department);
}
