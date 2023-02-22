package rw.gov.rw.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import rw.gov.rw.web.rest.TestUtil;

class TaskHistoriesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskHistories.class);
        TaskHistories taskHistories1 = new TaskHistories();
        taskHistories1.setId(1L);
        TaskHistories taskHistories2 = new TaskHistories();
        taskHistories2.setId(taskHistories1.getId());
        assertThat(taskHistories1).isEqualTo(taskHistories2);
        taskHistories2.setId(2L);
        assertThat(taskHistories1).isNotEqualTo(taskHistories2);
        taskHistories1.setId(null);
        assertThat(taskHistories1).isNotEqualTo(taskHistories2);
    }
}
