package rw.gov.rw.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import rw.gov.rw.web.rest.TestUtil;

class Nst1SectorDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nst1SectorDTO.class);
        Nst1SectorDTO nst1SectorDTO1 = new Nst1SectorDTO();
        nst1SectorDTO1.setId(1L);
        Nst1SectorDTO nst1SectorDTO2 = new Nst1SectorDTO();
        assertThat(nst1SectorDTO1).isNotEqualTo(nst1SectorDTO2);
        nst1SectorDTO2.setId(nst1SectorDTO1.getId());
        assertThat(nst1SectorDTO1).isEqualTo(nst1SectorDTO2);
        nst1SectorDTO2.setId(2L);
        assertThat(nst1SectorDTO1).isNotEqualTo(nst1SectorDTO2);
        nst1SectorDTO1.setId(null);
        assertThat(nst1SectorDTO1).isNotEqualTo(nst1SectorDTO2);
    }
}
