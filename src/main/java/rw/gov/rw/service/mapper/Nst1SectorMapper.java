package rw.gov.rw.service.mapper;

import org.mapstruct.*;
import rw.gov.rw.domain.Nst1Sector;
import rw.gov.rw.service.dto.Nst1SectorDTO;

/**
 * Mapper for the entity {@link Nst1Sector} and its DTO {@link Nst1SectorDTO}.
 */
@Mapper(componentModel = "spring")
public interface Nst1SectorMapper extends EntityMapper<Nst1SectorDTO, Nst1Sector> {}
