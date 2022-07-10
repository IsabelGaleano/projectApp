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
 * A Monederos.
 */
@Entity
@Table(name = "monederos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Monederos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 50)
    @Column(name = "tipo", length = 50)
    private String tipo;

    @Column(name = "saldo")
    private Double saldo;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @OneToMany(mappedBy = "idMonedero")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idMonedero" }, allowSetters = true)
    private Set<Movimientos> movimientos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Monederos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Monederos tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getSaldo() {
        return this.saldo;
    }

    public Monederos saldo(Double saldo) {
        this.setSaldo(saldo);
        return this;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public String getEstado() {
        return this.estado;
    }

    public Monederos estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<Movimientos> getMovimientos() {
        return this.movimientos;
    }

    public void setMovimientos(Set<Movimientos> movimientos) {
        if (this.movimientos != null) {
            this.movimientos.forEach(i -> i.setIdMonedero(null));
        }
        if (movimientos != null) {
            movimientos.forEach(i -> i.setIdMonedero(this));
        }
        this.movimientos = movimientos;
    }

    public Monederos movimientos(Set<Movimientos> movimientos) {
        this.setMovimientos(movimientos);
        return this;
    }

    public Monederos addMovimientos(Movimientos movimientos) {
        this.movimientos.add(movimientos);
        movimientos.setIdMonedero(this);
        return this;
    }

    public Monederos removeMovimientos(Movimientos movimientos) {
        this.movimientos.remove(movimientos);
        movimientos.setIdMonedero(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Monederos)) {
            return false;
        }
        return id != null && id.equals(((Monederos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Monederos{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", saldo=" + getSaldo() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
