package rw.gov.rw.service.mapper;

import org.mapstruct.*;
import rw.gov.rw.domain.Department;
import rw.gov.rw.service.dto.DepartmentDTO;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring")
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {}
