package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A RolesUsuarios.
 */
@Entity
@Table(name = "roles_usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RolesUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "rol", length = 50, nullable = false)
    private String rol;

    @OneToMany(mappedBy = "idRol")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = {
            "idMonedero",
            "votos",
            "comentarios",
            "mensajes",
            "codigos",
            "facturas",
            "reuniones",
            "documentos",
            "donacionesPaquetes",
            "notificaciones",
            "idRol",
        },
        allowSetters = true
    )
    private Set<Usuarios> usuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RolesUsuarios id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return this.rol;
    }

    public RolesUsuarios rol(String rol) {
        this.setRol(rol);
        return this;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Set<Usuarios> getUsuarios() {
        return this.usuarios;
    }

    public void setUsuarios(Set<Usuarios> usuarios) {
        if (this.usuarios != null) {
            this.usuarios.forEach(i -> i.setIdRol(null));
        }
        if (usuarios != null) {
            usuarios.forEach(i -> i.setIdRol(this));
        }
        this.usuarios = usuarios;
    }

    public RolesUsuarios usuarios(Set<Usuarios> usuarios) {
        this.setUsuarios(usuarios);
        return this;
    }

    public RolesUsuarios addUsuarios(Usuarios usuarios) {
        this.usuarios.add(usuarios);
        usuarios.setIdRol(this);
        return this;
    }

    public RolesUsuarios removeUsuarios(Usuarios usuarios) {
        this.usuarios.remove(usuarios);
        usuarios.setIdRol(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RolesUsuarios)) {
            return false;
        }
        return id != null && id.equals(((RolesUsuarios) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RolesUsuarios{" +
            "id=" + getId() +
            ", rol='" + getRol() + "'" +
            "}";
    }
}
