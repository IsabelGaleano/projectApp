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
 * A Categorias.
 */
@Entity
@Table(name = "categorias")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Categorias implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "categoria", length = 50, nullable = false)
    private String categoria;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @OneToMany(mappedBy = "idCategoria")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = {
            "idMonedero",
            "planesInversions",
            "votos",
            "comentarios",
            "mensajes",
            "codigos",
            "facturas",
            "reuniones",
            "documentos",
            "paquetes",
            "donacionesPaquetes",
            "notificaciones",
            "idCategoria",
        },
        allowSetters = true
    )
    private Set<Startups> startups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Categorias id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public Categorias categoria(String categoria) {
        this.setCategoria(categoria);
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getEstado() {
        return this.estado;
    }

    public Categorias estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<Startups> getStartups() {
        return this.startups;
    }

    public void setStartups(Set<Startups> startups) {
        if (this.startups != null) {
            this.startups.forEach(i -> i.setIdCategoria(null));
        }
        if (startups != null) {
            startups.forEach(i -> i.setIdCategoria(this));
        }
        this.startups = startups;
    }

    public Categorias startups(Set<Startups> startups) {
        this.setStartups(startups);
        return this;
    }

    public Categorias addStartups(Startups startups) {
        this.startups.add(startups);
        startups.setIdCategoria(this);
        return this;
    }

    public Categorias removeStartups(Startups startups) {
        this.startups.remove(startups);
        startups.setIdCategoria(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Categorias)) {
            return false;
        }
        return id != null && id.equals(((Categorias) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Categorias{" +
            "id=" + getId() +
            ", categoria='" + getCategoria() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
