package com.project.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DonacionesPaquetes.
 */
@Entity
@Table(name = "donaciones_paquetes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DonacionesPaquetes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Column(name = "monto_envio")
    private Double montoEnvio;

    @Column(name = "monto_impuesto")
    private Double montoImpuesto;

    @Column(name = "monto_total")
    private Double montoTotal;

    @Column(name = "fecha_donacion")
    private ZonedDateTime fechaDonacion;

    @Column(name = "fecha_entrega")
    private ZonedDateTime fechaEntrega;

    @Column(name = "fecha_posible_entrega")
    private ZonedDateTime fechaPosibleEntrega;

    @Column(name = "fecha_inicial_envio")
    private ZonedDateTime fechaInicialEnvio;

    @Column(name = "dias_retraso")
    private Double diasRetraso;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @OneToMany(mappedBy = "idDonacionPaquete")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idDonacionPaquete" }, allowSetters = true)
    private Set<Rastreador> rastreadors = new HashSet<>();

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

    @ManyToOne
    @JsonIgnoreProperties(value = { "documentos", "donacionesPaquetes", "idStartup" }, allowSetters = true)
    private Paquetes idPaquete;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DonacionesPaquetes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public DonacionesPaquetes descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getMontoEnvio() {
        return this.montoEnvio;
    }

    public DonacionesPaquetes montoEnvio(Double montoEnvio) {
        this.setMontoEnvio(montoEnvio);
        return this;
    }

    public void setMontoEnvio(Double montoEnvio) {
        this.montoEnvio = montoEnvio;
    }

    public Double getMontoImpuesto() {
        return this.montoImpuesto;
    }

    public DonacionesPaquetes montoImpuesto(Double montoImpuesto) {
        this.setMontoImpuesto(montoImpuesto);
        return this;
    }

    public void setMontoImpuesto(Double montoImpuesto) {
        this.montoImpuesto = montoImpuesto;
    }

    public Double getMontoTotal() {
        return this.montoTotal;
    }

    public DonacionesPaquetes montoTotal(Double montoTotal) {
        this.setMontoTotal(montoTotal);
        return this;
    }

    public void setMontoTotal(Double montoTotal) {
        this.montoTotal = montoTotal;
    }

    public ZonedDateTime getFechaDonacion() {
        return this.fechaDonacion;
    }

    public DonacionesPaquetes fechaDonacion(ZonedDateTime fechaDonacion) {
        this.setFechaDonacion(fechaDonacion);
        return this;
    }

    public void setFechaDonacion(ZonedDateTime fechaDonacion) {
        this.fechaDonacion = fechaDonacion;
    }

    public ZonedDateTime getFechaEntrega() {
        return this.fechaEntrega;
    }

    public DonacionesPaquetes fechaEntrega(ZonedDateTime fechaEntrega) {
        this.setFechaEntrega(fechaEntrega);
        return this;
    }

    public void setFechaEntrega(ZonedDateTime fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public ZonedDateTime getFechaPosibleEntrega() {
        return this.fechaPosibleEntrega;
    }

    public DonacionesPaquetes fechaPosibleEntrega(ZonedDateTime fechaPosibleEntrega) {
        this.setFechaPosibleEntrega(fechaPosibleEntrega);
        return this;
    }

    public void setFechaPosibleEntrega(ZonedDateTime fechaPosibleEntrega) {
        this.fechaPosibleEntrega = fechaPosibleEntrega;
    }

    public ZonedDateTime getFechaInicialEnvio() {
        return this.fechaInicialEnvio;
    }

    public DonacionesPaquetes fechaInicialEnvio(ZonedDateTime fechaInicialEnvio) {
        this.setFechaInicialEnvio(fechaInicialEnvio);
        return this;
    }

    public void setFechaInicialEnvio(ZonedDateTime fechaInicialEnvio) {
        this.fechaInicialEnvio = fechaInicialEnvio;
    }

    public Double getDiasRetraso() {
        return this.diasRetraso;
    }

    public DonacionesPaquetes diasRetraso(Double diasRetraso) {
        this.setDiasRetraso(diasRetraso);
        return this;
    }

    public void setDiasRetraso(Double diasRetraso) {
        this.diasRetraso = diasRetraso;
    }

    public String getEstado() {
        return this.estado;
    }

    public DonacionesPaquetes estado(String estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Set<Rastreador> getRastreadors() {
        return this.rastreadors;
    }

    public void setRastreadors(Set<Rastreador> rastreadors) {
        if (this.rastreadors != null) {
            this.rastreadors.forEach(i -> i.setIdDonacionPaquete(null));
        }
        if (rastreadors != null) {
            rastreadors.forEach(i -> i.setIdDonacionPaquete(this));
        }
        this.rastreadors = rastreadors;
    }

    public DonacionesPaquetes rastreadors(Set<Rastreador> rastreadors) {
        this.setRastreadors(rastreadors);
        return this;
    }

    public DonacionesPaquetes addRastreador(Rastreador rastreador) {
        this.rastreadors.add(rastreador);
        rastreador.setIdDonacionPaquete(this);
        return this;
    }

    public DonacionesPaquetes removeRastreador(Rastreador rastreador) {
        this.rastreadors.remove(rastreador);
        rastreador.setIdDonacionPaquete(null);
        return this;
    }

    public Startups getIdStartup() {
        return this.idStartup;
    }

    public void setIdStartup(Startups startups) {
        this.idStartup = startups;
    }

    public DonacionesPaquetes idStartup(Startups startups) {
        this.setIdStartup(startups);
        return this;
    }

    public Usuarios getIdUsuario() {
        return this.idUsuario;
    }

    public void setIdUsuario(Usuarios usuarios) {
        this.idUsuario = usuarios;
    }

    public DonacionesPaquetes idUsuario(Usuarios usuarios) {
        this.setIdUsuario(usuarios);
        return this;
    }

    public Paquetes getIdPaquete() {
        return this.idPaquete;
    }

    public void setIdPaquete(Paquetes paquetes) {
        this.idPaquete = paquetes;
    }

    public DonacionesPaquetes idPaquete(Paquetes paquetes) {
        this.setIdPaquete(paquetes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DonacionesPaquetes)) {
            return false;
        }
        return id != null && id.equals(((DonacionesPaquetes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DonacionesPaquetes{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", montoEnvio=" + getMontoEnvio() +
            ", montoImpuesto=" + getMontoImpuesto() +
            ", montoTotal=" + getMontoTotal() +
            ", fechaDonacion='" + getFechaDonacion() + "'" +
            ", fechaEntrega='" + getFechaEntrega() + "'" +
            ", fechaPosibleEntrega='" + getFechaPosibleEntrega() + "'" +
            ", fechaInicialEnvio='" + getFechaInicialEnvio() + "'" +
            ", diasRetraso=" + getDiasRetraso() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
