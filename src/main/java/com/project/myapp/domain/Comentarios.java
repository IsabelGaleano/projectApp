package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Comentarios.
 */
@Entity
@Table(name = "comentarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Comentarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 1000)
    @Column(name = "comentario", length = 1000)
    private String comentario;

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

    public Comentarios id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComentario() {
        return this.comentario;
    }

    public Comentarios comentario(String comentario) {
        this.setComentario(comentario);
        return this;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getEstado() {
        return this.estado;
    }

    public Comentarios estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public Comentarios fecha(ZonedDateTime fecha) {
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

    public Comentarios idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    public Usuarios getIdUsuario() {
        return this.idUsuario;
    }

    public void setIdUsuario(Usuarios usuarios) {
        this.idUsuario = usuarios;
    }

    public Comentarios idUsuario(Usuarios usuarios) {
        this.setIdUsuario(usuarios);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comentarios)) {
            return false;
        }
        return id != null && id.equals(((Comentarios) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Comentarios{" +
            "id=" + getId() +
            ", comentario='" + getComentario() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
