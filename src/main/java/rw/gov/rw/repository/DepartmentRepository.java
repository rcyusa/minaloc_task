package rw.gov.rw.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rw.gov.rw.domain.Department;

/**
 * Spring Data JPA repository for the Department entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {}
