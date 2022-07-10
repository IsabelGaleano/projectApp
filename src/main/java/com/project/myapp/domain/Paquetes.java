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
 * A Paquetes.
 */
@Entity
@Table(name = "paquetes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Paquetes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 200)
    @Column(name = "nombre", length = 200)
    private String nombre;

    @Column(name = "monto")
    private Double monto;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Size(min = 1, max = 50)
    @Column(name = "dimensiones", length = 50)
    private String dimensiones;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @OneToMany(mappedBy = "idPaquete")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private Set<Documentos> documentos = new HashSet<>();

    @OneToMany(mappedBy = "idPaquete")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "rastreadors", "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private Set<DonacionesPaquetes> donacionesPaquetes = new HashSet<>();

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

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Paquetes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Paquetes nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getMonto() {
        return this.monto;
    }

    public Paquetes monto(Double monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Paquetes descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDimensiones() {
        return this.dimensiones;
    }

    public Paquetes dimensiones(String dimensiones) {
        this.setDimensiones(dimensiones);
        return this;
    }

    public void setDimensiones(String dimensiones) {
        this.dimensiones = dimensiones;
    }

    public String getEstado() {
        return this.estado;
    }

    public Paquetes estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<Documentos> getDocumentos() {
        return this.documentos;
    }

    public void setDocumentos(Set<Documentos> documentos) {
        if (this.documentos != null) {
            this.documentos.forEach(i -> i.setIdPaquete(null));
        }
        if (documentos != null) {
            documentos.forEach(i -> i.setIdPaquete(this));
        }
        this.documentos = documentos;
    }

    public Paquetes documentos(Set<Documentos> documentos) {
        this.setDocumentos(documentos);
        return this;
    }

    public Paquetes addDocumentos(Documentos documentos) {
        this.documentos.add(documentos);
        documentos.setIdPaquete(this);
        return this;
    }

    public Paquetes removeDocumentos(Documentos documentos) {
        this.documentos.remove(documentos);
        documentos.setIdPaquete(null);
        return this;
    }

    public Set<DonacionesPaquetes> getDonacionesPaquetes() {
        return this.donacionesPaquetes;
    }

    public void setDonacionesPaquetes(Set<DonacionesPaquetes> donacionesPaquetes) {
        if (this.donacionesPaquetes != null) {
            this.donacionesPaquetes.forEach(i -> i.setIdPaquete(null));
        }
        if (donacionesPaquetes != null) {
            donacionesPaquetes.forEach(i -> i.setIdPaquete(this));
        }
        this.donacionesPaquetes = donacionesPaquetes;
    }

    public Paquetes donacionesPaquetes(Set<DonacionesPaquetes> donacionesPaquetes) {
        this.setDonacionesPaquetes(donacionesPaquetes);
        return this;
    }

    public Paquetes addDonacionesPaquetes(DonacionesPaquetes donacionesPaquetes) {
        this.donacionesPaquetes.add(donacionesPaquetes);
        donacionesPaquetes.setIdPaquete(this);
        return this;
    }

    public Paquetes removeDonacionesPaquetes(DonacionesPaquetes donacionesPaquetes) {
        this.donacionesPaquetes.remove(donacionesPaquetes);
        donacionesPaquetes.setIdPaquete(null);
        return this;
    }

    public Startups getIdStartup() {
        return this.idStartup;
    }

    public void setIdStartup(Startups startups) {
        this.idStartup = startups;
    }

    public Paquetes idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paquetes)) {
            return false;
        }
        return id != null && id.equals(((Paquetes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Paquetes{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", monto=" + getMonto() +
            ", descripcion='" + getDescripcion() + "'" +
            ", dimensiones='" + getDimensiones() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
