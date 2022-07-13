package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Votos.
 */
@Entity
@Table(name = "votos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Votos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "votos")
    private Integer votos;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @ManyToOne
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
    private Startups idStartup;

    @ManyToOne
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
    private Usuarios idUsuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Votos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVotos() {
        return this.votos;
    }

    public Votos votos(Integer votos) {
        this.setVotos(votos);
        return this;
    }

    public void setVotos(Integer votos) {
        this.votos = votos;
    }

    public String getEstado() {
        return this.estado;
    }

    public Votos estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public Votos fecha(ZonedDateTime fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Startups getIdStartup() {
        return this.idStartup;
    }

    public void setIdStartup(Startups startups) {
        this.idStartup = startups;
    }

    public Votos idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    public Usuarios getIdUsuario() {
        return this.idUsuario;
    }

    public void setIdUsuario(Usuarios usuarios) {
        this.idUsuario = usuarios;
    }

    public Votos idUsuario(Usuarios usuarios) {
        this.setIdUsuario(usuarios);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Votos)) {
            return false;
        }
        return id != null && id.equals(((Votos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Votos{" +
            "id=" + getId() +
            ", votos=" + getVotos() +
            ", estado='" + getEstado() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
