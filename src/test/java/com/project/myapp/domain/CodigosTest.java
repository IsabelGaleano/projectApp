package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CodigosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Codigos.class);
        Codigos codigos1 = new Codigos();
        codigos1.setId(1L);
        Codigos codigos2 = new Codigos();
        codigos2.setId(codigos1.getId());
        assertThat(codigos1).isEqualTo(codigos2);
        codigos2.setId(2L);
        assertThat(codigos1).isNotEqualTo(codigos2);
        codigos1.setId(null);
        assertThat(codigos1).isNotEqualTo(codigos2);
    }
}
