package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Rastreador.
 */
@Entity
@Table(name = "rastreador")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Rastreador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Size(min = 1, max = 50)
    @Column(name = "latitud", length = 50)
    private String latitud;

    @Size(min = 1, max = 50)
    @Column(name = "longitud", length = 50)
    private String longitud;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @ManyToOne
    @JsonIgnoreProperties(value = { "rastreadors", "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private DonacionesPaquetes idDonacionPaquete;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Rastreador id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Rastreador descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLatitud() {
        return this.latitud;
    }

    public Rastreador latitud(String latitud) {
        this.setLatitud(latitud);
        return this;
    }

    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }

    public String getLongitud() {
        return this.longitud;
    }

    public Rastreador longitud(String longitud) {
        this.setLongitud(longitud);
        return this;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public Rastreador fecha(ZonedDateTime fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return this.estado;
    }

    public Rastreador estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public DonacionesPaquetes getIdDonacionPaquete() {
        return this.idDonacionPaquete;
    }

    public void setIdDonacionPaquete(DonacionesPaquetes donacionesPaquetes) {
        this.idDonacionPaquete = donacionesPaquetes;
    }

    public Rastreador idDonacionPaquete(DonacionesPaquetes donacionesPaquetes) {
        this.setIdDonacionPaquete(donacionesPaquetes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rastreador)) {
            return false;
        }
        return id != null && id.equals(((Rastreador) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rastreador{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", latitud='" + getLatitud() + "'" +
            ", longitud='" + getLongitud() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
