package rw.gov.rw.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rw.gov.rw.domain.Nst1Sector;

/**
 * Spring Data JPA repository for the Nst1Sector entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Nst1SectorRepository extends JpaRepository<Nst1Sector, Long> {}
