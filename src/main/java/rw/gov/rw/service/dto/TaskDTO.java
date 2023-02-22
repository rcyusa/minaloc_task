package rw.gov.rw.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;
import rw.gov.rw.domain.enumeration.Priority;
import rw.gov.rw.domain.enumeration.Progress;
import rw.gov.rw.domain.enumeration.Status;

/**
 * A DTO for the {@link rw.gov.rw.domain.Task} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    @NotNull
    private Status status;

    @NotNull
    private Priority priority;

    @NotNull
    private Progress progress;

    @NotNull
    private String description;

    @NotNull
    private Instant createdAt;

    @NotNull
    private Instant updatedAt;

    private Set<InstitutionDTO> institutions = new HashSet<>();

    private Set<PositionDTO> positions = new HashSet<>();

    private TaskTypeDTO taskType;

    private Nst1SectorDTO nst1Sector;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Progress getProgress() {
        return progress;
    }

    public void setProgress(Progress progress) {
        this.progress = progress;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Set<InstitutionDTO> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(Set<InstitutionDTO> institutions) {
        this.institutions = institutions;
    }

    public Set<PositionDTO> getPositions() {
        return positions;
    }

    public void setPositions(Set<PositionDTO> positions) {
        this.positions = positions;
    }

    public TaskTypeDTO getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskTypeDTO taskType) {
        this.taskType = taskType;
    }

    public Nst1SectorDTO getNst1Sector() {
        return nst1Sector;
    }

    public void setNst1Sector(Nst1SectorDTO nst1Sector) {
        this.nst1Sector = nst1Sector;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskDTO)) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, taskDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", progress='" + getProgress() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", institutions=" + getInstitutions() +
            ", positions=" + getPositions() +
            ", taskType=" + getTaskType() +
            ", nst1Sector=" + getNst1Sector() +
            "}";
    }
}
