package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MonederosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Monederos.class);
        Monederos monederos1 = new Monederos();
        monederos1.setId(1L);
        Monederos monederos2 = new Monederos();
        monederos2.setId(monederos1.getId());
        assertThat(monederos1).isEqualTo(monederos2);
        monederos2.setId(2L);
        assertThat(monederos1).isNotEqualTo(monederos2);
        monederos1.setId(null);
        assertThat(monederos1).isNotEqualTo(monederos2);
    }
}
