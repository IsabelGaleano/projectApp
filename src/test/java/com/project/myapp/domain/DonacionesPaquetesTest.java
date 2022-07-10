package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DonacionesPaquetesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DonacionesPaquetes.class);
        DonacionesPaquetes donacionesPaquetes1 = new DonacionesPaquetes();
        donacionesPaquetes1.setId(1L);
        DonacionesPaquetes donacionesPaquetes2 = new DonacionesPaquetes();
        donacionesPaquetes2.setId(donacionesPaquetes1.getId());
        assertThat(donacionesPaquetes1).isEqualTo(donacionesPaquetes2);
        donacionesPaquetes2.setId(2L);
        assertThat(donacionesPaquetes1).isNotEqualTo(donacionesPaquetes2);
        donacionesPaquetes1.setId(null);
        assertThat(donacionesPaquetes1).isNotEqualTo(donacionesPaquetes2);
    }
}
