package rw.gov.rw.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TaskHistoriesMapperTest {

    private TaskHistoriesMapper taskHistoriesMapper;

    @BeforeEach
    public void setUp() {
        taskHistoriesMapper = new TaskHistoriesMapperImpl();
    }
}
