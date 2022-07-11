package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PaquetesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paquetes.class);
        Paquetes paquetes1 = new Paquetes();
        paquetes1.setId(1L);
        Paquetes paquetes2 = new Paquetes();
        paquetes2.setId(paquetes1.getId());
        assertThat(paquetes1).isEqualTo(paquetes2);
        paquetes2.setId(2L);
        assertThat(paquetes1).isNotEqualTo(paquetes2);
        paquetes1.setId(null);
        assertThat(paquetes1).isNotEqualTo(paquetes2);
    }
}
