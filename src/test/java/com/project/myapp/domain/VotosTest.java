package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VotosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Votos.class);
        Votos votos1 = new Votos();
        votos1.setId(1L);
        Votos votos2 = new Votos();
        votos2.setId(votos1.getId());
        assertThat(votos1).isEqualTo(votos2);
        votos2.setId(2L);
        assertThat(votos1).isNotEqualTo(votos2);
        votos1.setId(null);
        assertThat(votos1).isNotEqualTo(votos2);
    }
}
