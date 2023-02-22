package rw.gov.rw.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rw.gov.rw.domain.Institution;

/**
 * Spring Data JPA repository for the Institution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {}
