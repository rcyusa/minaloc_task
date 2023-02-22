package rw.gov.rw.service.mapper;

import org.mapstruct.*;
import rw.gov.rw.domain.Institution;
import rw.gov.rw.service.dto.InstitutionDTO;

/**
 * Mapper for the entity {@link Institution} and its DTO {@link InstitutionDTO}.
 */
@Mapper(componentModel = "spring")
public interface InstitutionMapper extends EntityMapper<InstitutionDTO, Institution> {}
