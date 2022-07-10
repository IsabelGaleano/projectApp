package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RolesUsuariosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolesUsuarios.class);
        RolesUsuarios rolesUsuarios1 = new RolesUsuarios();
        rolesUsuarios1.setId(1L);
        RolesUsuarios rolesUsuarios2 = new RolesUsuarios();
        rolesUsuarios2.setId(rolesUsuarios1.getId());
        assertThat(rolesUsuarios1).isEqualTo(rolesUsuarios2);
        rolesUsuarios2.setId(2L);
        assertThat(rolesUsuarios1).isNotEqualTo(rolesUsuarios2);
        rolesUsuarios1.setId(null);
        assertThat(rolesUsuarios1).isNotEqualTo(rolesUsuarios2);
    }
}
