package rw.gov.rw.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import rw.gov.rw.web.rest.TestUtil;

class Nst1SectorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nst1Sector.class);
        Nst1Sector nst1Sector1 = new Nst1Sector();
        nst1Sector1.setId(1L);
        Nst1Sector nst1Sector2 = new Nst1Sector();
        nst1Sector2.setId(nst1Sector1.getId());
        assertThat(nst1Sector1).isEqualTo(nst1Sector2);
        nst1Sector2.setId(2L);
        assertThat(nst1Sector1).isNotEqualTo(nst1Sector2);
        nst1Sector1.setId(null);
        assertThat(nst1Sector1).isNotEqualTo(nst1Sector2);
    }
}
