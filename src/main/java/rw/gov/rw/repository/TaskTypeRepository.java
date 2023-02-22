package rw.gov.rw.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import rw.gov.rw.domain.TaskType;

/**
 * Spring Data JPA repository for the TaskType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Long> {}
