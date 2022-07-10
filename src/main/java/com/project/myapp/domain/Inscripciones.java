package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Inscripciones.
 */
@Entity
@Table(name = "inscripciones")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Inscripciones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @Size(min = 1, max = 200)
    @Column(name = "descripcion", length = 200)
    private String descripcion;

    @Column(name = "monto")
    private Double monto;

    @Size(min = 1, max = 50)
    @Column(name = "tipo", length = 50)
    private String tipo;

    @Column(name = "fecha_inicial")
    private ZonedDateTime fechaInicial;

    @Column(name = "fecha_final")
    private ZonedDateTime fechaFinal;

    @Size(min = 1, max = 4000)
    @Column(name = "beneficios", length = 4000)
    private String beneficios;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @Column(name = "num_inscripcion")
    private Integer numInscripcion;

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
    @OneToOne
    @JoinColumn(unique = true)
    private Startups idStartup;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Inscripciones id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Inscripciones nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Inscripciones descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getMonto() {
        return this.monto;
    }

    public Inscripciones monto(Double monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getTipo() {
        return this.tipo;
    }

    public Inscripciones tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public ZonedDateTime getFechaInicial() {
        return this.fechaInicial;
    }

    public Inscripciones fechaInicial(ZonedDateTime fechaInicial) {
        this.setFechaInicial(fechaInicial);
        return this;
    }

    public void setFechaInicial(ZonedDateTime fechaInicial) {
        this.fechaInicial = fechaInicial;
    }

    public ZonedDateTime getFechaFinal() {
        return this.fechaFinal;
    }

    public Inscripciones fechaFinal(ZonedDateTime fechaFinal) {
        this.setFechaFinal(fechaFinal);
        return this;
    }

    public void setFechaFinal(ZonedDateTime fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public String getBeneficios() {
        return this.beneficios;
    }

    public Inscripciones beneficios(String beneficios) {
        this.setBeneficios(beneficios);
        return this;
    }

    public void setBeneficios(String beneficios) {
        this.beneficios = beneficios;
    }

    public String getEstado() {
        return this.estado;
    }

    public Inscripciones estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getNumInscripcion() {
        return this.numInscripcion;
    }

    public Inscripciones numInscripcion(Integer numInscripcion) {
        this.setNumInscripcion(numInscripcion);
        return this;
    }

    public void setNumInscripcion(Integer numInscripcion) {
        this.numInscripcion = numInscripcion;
    }

    public Startups getIdStartup() {
        return this.idStartup;
    }

    public void setIdStartup(Startups startups) {
        this.idStartup = startups;
    }

    public Inscripciones idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inscripciones)) {
            return false;
        }
        return id != null && id.equals(((Inscripciones) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Inscripciones{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", monto=" + getMonto() +
            ", tipo='" + getTipo() + "'" +
            ", fechaInicial='" + getFechaInicial() + "'" +
            ", fechaFinal='" + getFechaFinal() + "'" +
            ", beneficios='" + getBeneficios() + "'" +
            ", estado='" + getEstado() + "'" +
            ", numInscripcion=" + getNumInscripcion() +
            "}";
    }
}
