package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PlanesInversion.
 */
@Entity
@Table(name = "planes_inversion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PlanesInversion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 100)
    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "monto")
    private Double monto;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Size(min = 1, max = 4000)
    @Column(name = "beneficios", length = 4000)
    private String beneficios;

    @Column(name = "porcentaje_empresarial")
    private Double porcentajeEmpresarial;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public PlanesInversion() {}

    public PlanesInversion(
        String nombre,
        Double monto,
        String descripcion,
        String beneficios,
        Double porcentajeEmpresarial,
        String estado,
        Startups idStartup
    ) {
        this.nombre = nombre;
        this.monto = monto;
        this.descripcion = descripcion;
        this.beneficios = beneficios;
        this.porcentajeEmpresarial = porcentajeEmpresarial;
        this.estado = estado;
        this.idStartup = idStartup;
    }

    public Long getId() {
        return this.id;
    }

    public PlanesInversion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public PlanesInversion nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getMonto() {
        return this.monto;
    }

    public PlanesInversion monto(Double monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public PlanesInversion descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getBeneficios() {
        return this.beneficios;
    }

    public PlanesInversion beneficios(String beneficios) {
        this.setBeneficios(beneficios);
        return this;
    }

    public void setBeneficios(String beneficios) {
        this.beneficios = beneficios;
    }

    public Double getPorcentajeEmpresarial() {
        return this.porcentajeEmpresarial;
    }

    public PlanesInversion porcentajeEmpresarial(Double porcentajeEmpresarial) {
        this.setPorcentajeEmpresarial(porcentajeEmpresarial);
        return this;
    }

    public void setPorcentajeEmpresarial(Double porcentajeEmpresarial) {
        this.porcentajeEmpresarial = porcentajeEmpresarial;
    }

    public String getEstado() {
        return this.estado;
    }

    public PlanesInversion estado(String estado) {
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

    public PlanesInversion idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanesInversion)) {
            return false;
        }
        return id != null && id.equals(((PlanesInversion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanesInversion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", monto=" + getMonto() +
            ", descripcion='" + getDescripcion() + "'" +
            ", beneficios='" + getBeneficios() + "'" +
            ", porcentajeEmpresarial=" + getPorcentajeEmpresarial() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
