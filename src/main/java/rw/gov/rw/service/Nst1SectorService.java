package rw.gov.rw.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.gov.rw.service.dto.Nst1SectorDTO;

/**
 * Service Interface for managing {@link rw.gov.rw.domain.Nst1Sector}.
 */
public interface Nst1SectorService {
    /**
     * Save a nst1Sector.
     *
     * @param nst1SectorDTO the entity to save.
     * @return the persisted entity.
     */
    Nst1SectorDTO save(Nst1SectorDTO nst1SectorDTO);

    /**
     * Updates a nst1Sector.
     *
     * @param nst1SectorDTO the entity to update.
     * @return the persisted entity.
     */
    Nst1SectorDTO update(Nst1SectorDTO nst1SectorDTO);

    /**
     * Partially updates a nst1Sector.
     *
     * @param nst1SectorDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Nst1SectorDTO> partialUpdate(Nst1SectorDTO nst1SectorDTO);

    /**
     * Get all the nst1Sectors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Nst1SectorDTO> findAll(Pageable pageable);

    /**
     * Get the "id" nst1Sector.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Nst1SectorDTO> findOne(Long id);

    /**
     * Delete the "id" nst1Sector.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
