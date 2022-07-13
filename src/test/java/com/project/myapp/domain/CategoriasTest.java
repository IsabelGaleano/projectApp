package com.project.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.project.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CategoriasTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Categorias.class);
        Categorias categorias1 = new Categorias();
        categorias1.setId(1L);
        Categorias categorias2 = new Categorias();
        categorias2.setId(categorias1.getId());
        assertThat(categorias1).isEqualTo(categorias2);
        categorias2.setId(2L);
        assertThat(categorias1).isNotEqualTo(categorias2);
        categorias1.setId(null);
        assertThat(categorias1).isNotEqualTo(categorias2);
    }
}
