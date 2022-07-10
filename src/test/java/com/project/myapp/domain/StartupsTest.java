package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StartupsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Startups.class);
        Startups startups1 = new Startups();
        startups1.setId(1L);
        Startups startups2 = new Startups();
        startups2.setId(startups1.getId());
        assertThat(startups1).isEqualTo(startups2);
        startups2.setId(2L);
        assertThat(startups1).isNotEqualTo(startups2);
        startups1.setId(null);
        assertThat(startups1).isNotEqualTo(startups2);
    }
}
