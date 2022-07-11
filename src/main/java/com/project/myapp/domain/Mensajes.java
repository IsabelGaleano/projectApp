package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Mensajes.
 */
@Entity
@Table(name = "mensajes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Mensajes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 2000)
    @Column(name = "mensaje", length = 2000)
    private String mensaje;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Size(min = 1, max = 50)
    @Column(name = "tipo_remitente", length = 50)
    private String tipoRemitente;

    @Size(min = 1, max = 50)
    @Column(name = "tipo_receptor", length = 50)
    private String tipoReceptor;

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

    public Mensajes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMensaje() {
        return this.mensaje;
    }

    public Mensajes mensaje(String mensaje) {
        this.setMensaje(mensaje);
        return this;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public Mensajes fecha(ZonedDateTime fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public String getTipoRemitente() {
        return this.tipoRemitente;
    }

    public Mensajes tipoRemitente(String tipoRemitente) {
        this.setTipoRemitente(tipoRemitente);
        return this;
    }

    public void setTipoRemitente(String tipoRemitente) {
        this.tipoRemitente = tipoRemitente;
    }

    public String getTipoReceptor() {
        return this.tipoReceptor;
    }

    public Mensajes tipoReceptor(String tipoReceptor) {
        this.setTipoReceptor(tipoReceptor);
        return this;
    }

    public void setTipoReceptor(String tipoReceptor) {
        this.tipoReceptor = tipoReceptor;
    }

    public String getEstado() {
        return this.estado;
    }

    public Mensajes estado(String estado) {
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

    public Mensajes idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    public Usuarios getIdUsuario() {
        return this.idUsuario;
    }

    public void setIdUsuario(Usuarios usuarios) {
        this.idUsuario = usuarios;
    }

    public Mensajes idUsuario(Usuarios usuarios) {
        this.setIdUsuario(usuarios);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mensajes)) {
            return false;
        }
        return id != null && id.equals(((Mensajes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Mensajes{" +
            "id=" + getId() +
            ", mensaje='" + getMensaje() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", tipoRemitente='" + getTipoRemitente() + "'" +
            ", tipoReceptor='" + getTipoReceptor() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
