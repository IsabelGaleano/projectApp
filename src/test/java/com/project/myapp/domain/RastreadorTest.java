package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RastreadorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rastreador.class);
        Rastreador rastreador1 = new Rastreador();
        rastreador1.setId(1L);
        Rastreador rastreador2 = new Rastreador();
        rastreador2.setId(rastreador1.getId());
        assertThat(rastreador1).isEqualTo(rastreador2);
        rastreador2.setId(2L);
        assertThat(rastreador1).isNotEqualTo(rastreador2);
        rastreador1.setId(null);
        assertThat(rastreador1).isNotEqualTo(rastreador2);
    }
}
