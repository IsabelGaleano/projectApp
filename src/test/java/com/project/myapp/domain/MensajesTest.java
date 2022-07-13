package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MensajesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mensajes.class);
        Mensajes mensajes1 = new Mensajes();
        mensajes1.setId(1L);
        Mensajes mensajes2 = new Mensajes();
        mensajes2.setId(mensajes1.getId());
        assertThat(mensajes1).isEqualTo(mensajes2);
        mensajes2.setId(2L);
        assertThat(mensajes1).isNotEqualTo(mensajes2);
        mensajes1.setId(null);
        assertThat(mensajes1).isNotEqualTo(mensajes2);
    }
}
