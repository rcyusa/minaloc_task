package rw.gov.rw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import rw.gov.rw.domain.enumeration.Priority;
import rw.gov.rw.domain.enumeration.Progress;
import rw.gov.rw.domain.enumeration.Status;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "progress", nullable = false)
    private Progress progress;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "task")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "task" }, allowSetters = true)
    private Set<TaskHistories> taskHistories = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_task__institution",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "institution_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tasks" }, allowSetters = true)
    private Set<Institution> institutions = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_task__position",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "position_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "department", "tasks" }, allowSetters = true)
    private Set<Position> positions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "tasks" }, allowSetters = true)
    private TaskType taskType;

    @ManyToOne
    @JsonIgnoreProperties(value = { "tasks" }, allowSetters = true)
    private Nst1Sector nst1Sector;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Task id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Task title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getStartDate() {
        return this.startDate;
    }

    public Task startDate(Instant startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return this.endDate;
    }

    public Task endDate(Instant endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Status getStatus() {
        return this.status;
    }

    public Task status(Status status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return this.priority;
    }

    public Task priority(Priority priority) {
        this.setPriority(priority);
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Progress getProgress() {
        return this.progress;
    }

    public Task progress(Progress progress) {
        this.setProgress(progress);
        return this;
    }

    public void setProgress(Progress progress) {
        this.progress = progress;
    }

    public String getDescription() {
        return this.description;
    }

    public Task description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public Task createdAt(Instant createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return this.updatedAt;
    }

    public Task updatedAt(Instant updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<TaskHistories> getTaskHistories() {
        return this.taskHistories;
    }

    public void setTaskHistories(Set<TaskHistories> taskHistories) {
        if (this.taskHistories != null) {
            this.taskHistories.forEach(i -> i.setTask(null));
        }
        if (taskHistories != null) {
            taskHistories.forEach(i -> i.setTask(this));
        }
        this.taskHistories = taskHistories;
    }

    public Task taskHistories(Set<TaskHistories> taskHistories) {
        this.setTaskHistories(taskHistories);
        return this;
    }

    public Task addTaskHistories(TaskHistories taskHistories) {
        this.taskHistories.add(taskHistories);
        taskHistories.setTask(this);
        return this;
    }

    public Task removeTaskHistories(TaskHistories taskHistories) {
        this.taskHistories.remove(taskHistories);
        taskHistories.setTask(null);
        return this;
    }

    public Set<Institution> getInstitutions() {
        return this.institutions;
    }

    public void setInstitutions(Set<Institution> institutions) {
        this.institutions = institutions;
    }

    public Task institutions(Set<Institution> institutions) {
        this.setInstitutions(institutions);
        return this;
    }

    public Task addInstitution(Institution institution) {
        this.institutions.add(institution);
        institution.getTasks().add(this);
        return this;
    }

    public Task removeInstitution(Institution institution) {
        this.institutions.remove(institution);
        institution.getTasks().remove(this);
        return this;
    }

    public Set<Position> getPositions() {
        return this.positions;
    }

    public void setPositions(Set<Position> positions) {
        this.positions = positions;
    }

    public Task positions(Set<Position> positions) {
        this.setPositions(positions);
        return this;
    }

    public Task addPosition(Position position) {
        this.positions.add(position);
        position.getTasks().add(this);
        return this;
    }

    public Task removePosition(Position position) {
        this.positions.remove(position);
        position.getTasks().remove(this);
        return this;
    }

    public TaskType getTaskType() {
        return this.taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public Task taskType(TaskType taskType) {
        this.setTaskType(taskType);
        return this;
    }

    public Nst1Sector getNst1Sector() {
        return this.nst1Sector;
    }

    public void setNst1Sector(Nst1Sector nst1Sector) {
        this.nst1Sector = nst1Sector;
    }

    public Task nst1Sector(Nst1Sector nst1Sector) {
        this.setNst1Sector(nst1Sector);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Task{" +
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
            "}";
    }
}
