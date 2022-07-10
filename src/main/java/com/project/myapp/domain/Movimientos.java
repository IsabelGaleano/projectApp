package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Movimientos.
 */
@Entity
@Table(name = "movimientos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Movimientos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Column(name = "monto")
    private Double monto;

    @Size(min = 1, max = 50)
    @Column(name = "tipo", length = 50)
    private String tipo;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @ManyToOne
    @JsonIgnoreProperties(value = { "movimientos" }, allowSetters = true)
    private Monederos idMonedero;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Movimientos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public Movimientos fecha(ZonedDateTime fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Double getMonto() {
        return this.monto;
    }

    public Movimientos monto(Double monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Movimientos tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Movimientos descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return this.estado;
    }

    public Movimientos estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Monederos getIdMonedero() {
        return this.idMonedero;
    }

    public void setIdMonedero(Monederos monederos) {
        this.idMonedero = monederos;
    }

    public Movimientos idMonedero(Monederos monederos) {
        this.setIdMonedero(monederos);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movimientos)) {
            return false;
        }
        return id != null && id.equals(((Movimientos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Movimientos{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", monto=" + getMonto() +
            ", tipo='" + getTipo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
