package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Reuniones.
 */
@Entity
@Table(name = "reuniones")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reuniones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 500)
    @Column(name = "url", length = 500)
    private String url;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Column(name = "fecha_solicitada")
    private ZonedDateTime fechaSolicitada;

    @Column(name = "fecha_reunion")
    private ZonedDateTime fechaReunion;

    @Column(name = "hora_reunion")
    private ZonedDateTime horaReunion;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

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

    public Reuniones id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return this.url;
    }

    public Reuniones url(String url) {
        this.setUrl(url);
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Reuniones descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public ZonedDateTime getFechaSolicitada() {
        return this.fechaSolicitada;
    }

    public Reuniones fechaSolicitada(ZonedDateTime fechaSolicitada) {
        this.setFechaSolicitada(fechaSolicitada);
        return this;
    }

    public void setFechaSolicitada(ZonedDateTime fechaSolicitada) {
        this.fechaSolicitada = fechaSolicitada;
    }

    public ZonedDateTime getFechaReunion() {
        return this.fechaReunion;
    }

    public Reuniones fechaReunion(ZonedDateTime fechaReunion) {
        this.setFechaReunion(fechaReunion);
        return this;
    }

    public void setFechaReunion(ZonedDateTime fechaReunion) {
        this.fechaReunion = fechaReunion;
    }

    public ZonedDateTime getHoraReunion() {
        return this.horaReunion;
    }

    public Reuniones horaReunion(ZonedDateTime horaReunion) {
        this.setHoraReunion(horaReunion);
        return this;
    }

    public void setHoraReunion(ZonedDateTime horaReunion) {
        this.horaReunion = horaReunion;
    }

    public String getEstado() {
        return this.estado;
    }

    public Reuniones estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Startups getIdStartup() {
        return this.idStartup;
    }

    public void setIdStartup(Startups startups) {
        this.idStartup = startups;
    }

    public Reuniones idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    public Usuarios getIdUsuario() {
        return this.idUsuario;
    }

    public void setIdUsuario(Usuarios usuarios) {
        this.idUsuario = usuarios;
    }

    public Reuniones idUsuario(Usuarios usuarios) {
        this.setIdUsuario(usuarios);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reuniones)) {
            return false;
        }
        return id != null && id.equals(((Reuniones) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reuniones{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaSolicitada='" + getFechaSolicitada() + "'" +
            ", fechaReunion='" + getFechaReunion() + "'" +
            ", horaReunion='" + getHoraReunion() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
