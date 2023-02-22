package rw.gov.rw.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.gov.rw.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
