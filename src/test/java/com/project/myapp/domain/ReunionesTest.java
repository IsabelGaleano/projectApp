package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReunionesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reuniones.class);
        Reuniones reuniones1 = new Reuniones();
        reuniones1.setId(1L);
        Reuniones reuniones2 = new Reuniones();
        reuniones2.setId(reuniones1.getId());
        assertThat(reuniones1).isEqualTo(reuniones2);
        reuniones2.setId(2L);
        assertThat(reuniones1).isNotEqualTo(reuniones2);
        reuniones1.setId(null);
        assertThat(reuniones1).isNotEqualTo(reuniones2);
    }
}
