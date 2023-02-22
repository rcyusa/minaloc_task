package rw.gov.rw.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import rw.gov.rw.web.rest.TestUtil;

class TaskHistoriesDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskHistoriesDTO.class);
        TaskHistoriesDTO taskHistoriesDTO1 = new TaskHistoriesDTO();
        taskHistoriesDTO1.setId(1L);
        TaskHistoriesDTO taskHistoriesDTO2 = new TaskHistoriesDTO();
        assertThat(taskHistoriesDTO1).isNotEqualTo(taskHistoriesDTO2);
        taskHistoriesDTO2.setId(taskHistoriesDTO1.getId());
        assertThat(taskHistoriesDTO1).isEqualTo(taskHistoriesDTO2);
        taskHistoriesDTO2.setId(2L);
        assertThat(taskHistoriesDTO1).isNotEqualTo(taskHistoriesDTO2);
        taskHistoriesDTO1.setId(null);
        assertThat(taskHistoriesDTO1).isNotEqualTo(taskHistoriesDTO2);
    }
}
