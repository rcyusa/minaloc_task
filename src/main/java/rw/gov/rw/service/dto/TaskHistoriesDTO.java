package rw.gov.rw.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import javax.validation.constraints.*;
import rw.gov.rw.domain.enumeration.Status;

/**
 * A DTO for the {@link rw.gov.rw.domain.TaskHistories} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskHistoriesDTO implements Serializable {

    private Long id;

    @NotNull
    private String comment;

    @NotNull
    private Status status;

    @NotNull
    private Instant createdAt;

    @NotNull
    private Instant updatedAt;

    private TaskDTO task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public TaskDTO getTask() {
        return task;
    }

    public void setTask(TaskDTO task) {
        this.task = task;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskHistoriesDTO)) {
            return false;
        }

        TaskHistoriesDTO taskHistoriesDTO = (TaskHistoriesDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, taskHistoriesDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskHistoriesDTO{" +
            "id=" + getId() +
            ", comment='" + getComment() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", task=" + getTask() +
            "}";
    }
}
