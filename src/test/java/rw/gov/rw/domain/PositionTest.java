package rw.gov.rw.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import rw.gov.rw.web.rest.TestUtil;

class PositionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Position.class);
        Position position1 = new Position();
        position1.setId(1L);
        Position position2 = new Position();
        position2.setId(position1.getId());
        assertThat(position1).isEqualTo(position2);
        position2.setId(2L);
        assertThat(position1).isNotEqualTo(position2);
        position1.setId(null);
        assertThat(position1).isNotEqualTo(position2);
    }
}
