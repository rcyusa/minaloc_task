package rw.gov.rw.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.gov.rw.domain.TaskHistories;

/**
 * Spring Data JPA repository for the TaskHistories entity.
 */
@Repository
public interface TaskHistoriesRepository extends JpaRepository<TaskHistories, Long> {
    default Optional<TaskHistories> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<TaskHistories> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<TaskHistories> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct taskHistories from TaskHistories taskHistories left join fetch taskHistories.task",
        countQuery = "select count(distinct taskHistories) from TaskHistories taskHistories"
    )
    Page<TaskHistories> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct taskHistories from TaskHistories taskHistories left join fetch taskHistories.task")
    List<TaskHistories> findAllWithToOneRelationships();

    @Query("select taskHistories from TaskHistories taskHistories left join fetch taskHistories.task where taskHistories.id =:id")
    Optional<TaskHistories> findOneWithToOneRelationships(@Param("id") Long id);
}
