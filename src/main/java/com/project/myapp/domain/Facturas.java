package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Facturas.
 */
@Entity
@Table(name = "facturas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Facturas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "monto")
    private Double monto;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Column(name = "impuesto")
    private Double impuesto;

    @Column(name = "adicional")
    private Double adicional;

    @Size(min = 1, max = 100)
    @Column(name = "nombre_receptor", length = 100)
    private String nombreReceptor;

    @Size(min = 1, max = 100)
    @Column(name = "apellido_receptor", length = 100)
    private String apellidoReceptor;

    @Size(min = 1, max = 300)
    @Column(name = "correo_receptor", length = 300)
    private String correoReceptor;

    @Size(min = 1, max = 100)
    @Column(name = "nombre_startup", length = 100)
    private String nombreStartup;

    @Size(min = 1, max = 300)
    @Column(name = "correo_startup", length = 300)
    private String correoStartup;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @JsonIgnoreProperties(value = { "rastreadors", "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private DonacionesPaquetes idDonacionPaquete;

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

    public Facturas id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMonto() {
        return this.monto;
    }

    public Facturas monto(Double monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Facturas descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public ZonedDateTime getFecha() {
        return this.fecha;
    }

    public Facturas fecha(ZonedDateTime fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Double getImpuesto() {
        return this.impuesto;
    }

    public Facturas impuesto(Double impuesto) {
        this.setImpuesto(impuesto);
        return this;
    }

    public void setImpuesto(Double impuesto) {
        this.impuesto = impuesto;
    }

    public Double getAdicional() {
        return this.adicional;
    }

    public Facturas adicional(Double adicional) {
        this.setAdicional(adicional);
        return this;
    }

    public void setAdicional(Double adicional) {
        this.adicional = adicional;
    }

    public String getNombreReceptor() {
        return this.nombreReceptor;
    }

    public Facturas nombreReceptor(String nombreReceptor) {
        this.setNombreReceptor(nombreReceptor);
        return this;
    }

    public void setNombreReceptor(String nombreReceptor) {
        this.nombreReceptor = nombreReceptor;
    }

    public String getApellidoReceptor() {
        return this.apellidoReceptor;
    }

    public Facturas apellidoReceptor(String apellidoReceptor) {
        this.setApellidoReceptor(apellidoReceptor);
        return this;
    }

    public void setApellidoReceptor(String apellidoReceptor) {
        this.apellidoReceptor = apellidoReceptor;
    }

    public String getCorreoReceptor() {
        return this.correoReceptor;
    }

    public Facturas correoReceptor(String correoReceptor) {
        this.setCorreoReceptor(correoReceptor);
        return this;
    }

    public void setCorreoReceptor(String correoReceptor) {
        this.correoReceptor = correoReceptor;
    }

    public String getNombreStartup() {
        return this.nombreStartup;
    }

    public Facturas nombreStartup(String nombreStartup) {
        this.setNombreStartup(nombreStartup);
        return this;
    }

    public void setNombreStartup(String nombreStartup) {
        this.nombreStartup = nombreStartup;
    }

    public String getCorreoStartup() {
        return this.correoStartup;
    }

    public Facturas correoStartup(String correoStartup) {
        this.setCorreoStartup(correoStartup);
        return this;
    }

    public void setCorreoStartup(String correoStartup) {
        this.correoStartup = correoStartup;
    }

    public String getEstado() {
        return this.estado;
    }

    public Facturas estado(String estado) {
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

    public Facturas idDonacionPaquete(DonacionesPaquetes donacionesPaquetes) {
        this.setIdDonacionPaquete(donacionesPaquetes);
        return this;
    }

    public Startups getIdStartup() {
        return this.idStartup;
    }

    public void setIdStartup(Startups startups) {
        this.idStartup = startups;
    }

    public Facturas idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    public Usuarios getIdUsuario() {
        return this.idUsuario;
    }

    public void setIdUsuario(Usuarios usuarios) {
        this.idUsuario = usuarios;
    }

    public Facturas idUsuario(Usuarios usuarios) {
        this.setIdUsuario(usuarios);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facturas)) {
            return false;
        }
        return id != null && id.equals(((Facturas) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Facturas{" +
            "id=" + getId() +
            ", monto=" + getMonto() +
            ", descripcion='" + getDescripcion() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", impuesto=" + getImpuesto() +
            ", adicional=" + getAdicional() +
            ", nombreReceptor='" + getNombreReceptor() + "'" +
            ", apellidoReceptor='" + getApellidoReceptor() + "'" +
            ", correoReceptor='" + getCorreoReceptor() + "'" +
            ", nombreStartup='" + getNombreStartup() + "'" +
            ", correoStartup='" + getCorreoStartup() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
