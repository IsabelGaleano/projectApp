package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlanesInversionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanesInversion.class);
        PlanesInversion planesInversion1 = new PlanesInversion();
        planesInversion1.setId(1L);
        PlanesInversion planesInversion2 = new PlanesInversion();
        planesInversion2.setId(planesInversion1.getId());
        assertThat(planesInversion1).isEqualTo(planesInversion2);
        planesInversion2.setId(2L);
        assertThat(planesInversion1).isNotEqualTo(planesInversion2);
        planesInversion1.setId(null);
        assertThat(planesInversion1).isNotEqualTo(planesInversion2);
    }
}
