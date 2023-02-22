package rw.gov.rw.service.impl;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.gov.rw.domain.Nst1Sector;
import rw.gov.rw.repository.Nst1SectorRepository;
import rw.gov.rw.service.Nst1SectorService;
import rw.gov.rw.service.dto.Nst1SectorDTO;
import rw.gov.rw.service.mapper.Nst1SectorMapper;

/**
 * Service Implementation for managing {@link Nst1Sector}.
 */
@Service
@Transactional
public class Nst1SectorServiceImpl implements Nst1SectorService {

    private final Logger log = LoggerFactory.getLogger(Nst1SectorServiceImpl.class);

    private final Nst1SectorRepository nst1SectorRepository;

    private final Nst1SectorMapper nst1SectorMapper;

    public Nst1SectorServiceImpl(Nst1SectorRepository nst1SectorRepository, Nst1SectorMapper nst1SectorMapper) {
        this.nst1SectorRepository = nst1SectorRepository;
        this.nst1SectorMapper = nst1SectorMapper;
    }

    @Override
    public Nst1SectorDTO save(Nst1SectorDTO nst1SectorDTO) {
        log.debug("Request to save Nst1Sector : {}", nst1SectorDTO);
        Nst1Sector nst1Sector = nst1SectorMapper.toEntity(nst1SectorDTO);
        nst1Sector = nst1SectorRepository.save(nst1Sector);
        return nst1SectorMapper.toDto(nst1Sector);
    }

    @Override
    public Nst1SectorDTO update(Nst1SectorDTO nst1SectorDTO) {
        log.debug("Request to update Nst1Sector : {}", nst1SectorDTO);
        Nst1Sector nst1Sector = nst1SectorMapper.toEntity(nst1SectorDTO);
        nst1Sector = nst1SectorRepository.save(nst1Sector);
        return nst1SectorMapper.toDto(nst1Sector);
    }

    @Override
    public Optional<Nst1SectorDTO> partialUpdate(Nst1SectorDTO nst1SectorDTO) {
        log.debug("Request to partially update Nst1Sector : {}", nst1SectorDTO);

        return nst1SectorRepository
            .findById(nst1SectorDTO.getId())
            .map(existingNst1Sector -> {
                nst1SectorMapper.partialUpdate(existingNst1Sector, nst1SectorDTO);

                return existingNst1Sector;
            })
            .map(nst1SectorRepository::save)
            .map(nst1SectorMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Nst1SectorDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Nst1Sectors");
        return nst1SectorRepository.findAll(pageable).map(nst1SectorMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Nst1SectorDTO> findOne(Long id) {
        log.debug("Request to get Nst1Sector : {}", id);
        return nst1SectorRepository.findById(id).map(nst1SectorMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Nst1Sector : {}", id);
        nst1SectorRepository.deleteById(id);
    }
}
