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
 * A Startups.
 */
@Entity
@Table(name = "startups")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Startups implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 1, max = 50)
    @Column(name = "nombre_corto", length = 50)
    private String nombreCorto;

    @Size(min = 1, max = 200)
    @Column(name = "nombre_largo", length = 200)
    private String nombreLargo;

    @NotNull
    @Size(min = 1, max = 300)
    @Column(name = "correo_electronico", length = 300, nullable = false, unique = true)
    private String correoElectronico;

    @Size(min = 1, max = 50)
    @Column(name = "telefono", length = 50)
    private String telefono;

    @Size(min = 1, max = 50)
    @Column(name = "contrasennia", length = 50)
    private String contrasennia;

    @Size(min = 1, max = 50)
    @Column(name = "latitud_direccion", length = 50)
    private String latitudDireccion;

    @Size(min = 1, max = 50)
    @Column(name = "longitud_direccion", length = 50)
    private String longitudDireccion;

    @Size(min = 1, max = 300)
    @Column(name = "descripcion", length = 300)
    private String descripcion;

    @Size(min = 1, max = 200)
    @Column(name = "descripcion_corta", length = 200)
    private String descripcionCorta;

    @Size(min = 1, max = 4000)
    @Column(name = "beneficios", length = 4000)
    private String beneficios;

    @Size(min = 1, max = 4000)
    @Column(name = "riesgos", length = 4000)
    private String riesgos;

    @Size(min = 1, max = 4000)
    @Column(name = "panorama_mercado", length = 4000)
    private String panoramaMercado;

    @Column(name = "monto_meta")
    private Double montoMeta;

    @Size(min = 1, max = 50)
    @Column(name = "tipo_meta", length = 50)
    private String tipoMeta;

    @Size(min = 1, max = 300)
    @Column(name = "link_sitio_web", length = 300)
    private String linkSitioWeb;

    @Size(min = 1, max = 300)
    @Column(name = "imagen_url", length = 300)
    private String imagenURL;

    @Column(name = "fecha_creacion")
    private ZonedDateTime fechaCreacion;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @JsonIgnoreProperties(value = { "movimientos" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Monederos idMonedero;

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup" }, allowSetters = true)
    private Set<PlanesInversion> planesInversions = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Votos> votos = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Comentarios> comentarios = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Mensajes> mensajes = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Codigos> codigos = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idDonacionPaquete", "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Facturas> facturas = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Reuniones> reuniones = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private Set<Documentos> documentos = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "documentos", "donacionesPaquetes", "idStartup" }, allowSetters = true)
    private Set<Paquetes> paquetes = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "rastreadors", "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private Set<DonacionesPaquetes> donacionesPaquetes = new HashSet<>();

    @OneToMany(mappedBy = "idStartup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Notificaciones> notificaciones = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "startups" }, allowSetters = true)
    private Categorias idCategoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Startups id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Startups nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getNombreLargo() {
        return this.nombreLargo;
    }

    public Startups nombreLargo(String nombreLargo) {
        this.setNombreLargo(nombreLargo);
        return this;
    }

    public void setNombreLargo(String nombreLargo) {
        this.nombreLargo = nombreLargo;
    }

    public String getCorreoElectronico() {
        return this.correoElectronico;
    }

    public Startups correoElectronico(String correoElectronico) {
        this.setCorreoElectronico(correoElectronico);
        return this;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Startups telefono(String telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getContrasennia() {
        return this.contrasennia;
    }

    public Startups contrasennia(String contrasennia) {
        this.setContrasennia(contrasennia);
        return this;
    }

    public void setContrasennia(String contrasennia) {
        this.contrasennia = contrasennia;
    }

    public String getLatitudDireccion() {
        return this.latitudDireccion;
    }

    public Startups latitudDireccion(String latitudDireccion) {
        this.setLatitudDireccion(latitudDireccion);
        return this;
    }

    public void setLatitudDireccion(String latitudDireccion) {
        this.latitudDireccion = latitudDireccion;
    }

    public String getLongitudDireccion() {
        return this.longitudDireccion;
    }

    public Startups longitudDireccion(String longitudDireccion) {
        this.setLongitudDireccion(longitudDireccion);
        return this;
    }

    public void setLongitudDireccion(String longitudDireccion) {
        this.longitudDireccion = longitudDireccion;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Startups descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcionCorta() {
        return this.descripcionCorta;
    }

    public Startups descripcionCorta(String descripcionCorta) {
        this.setDescripcionCorta(descripcionCorta);
        return this;
    }

    public void setDescripcionCorta(String descripcionCorta) {
        this.descripcionCorta = descripcionCorta;
    }

    public String getBeneficios() {
        return this.beneficios;
    }

    public Startups beneficios(String beneficios) {
        this.setBeneficios(beneficios);
        return this;
    }

    public void setBeneficios(String beneficios) {
        this.beneficios = beneficios;
    }

    public String getRiesgos() {
        return this.riesgos;
    }

    public Startups riesgos(String riesgos) {
        this.setRiesgos(riesgos);
        return this;
    }

    public void setRiesgos(String riesgos) {
        this.riesgos = riesgos;
    }

    public String getPanoramaMercado() {
        return this.panoramaMercado;
    }

    public Startups panoramaMercado(String panoramaMercado) {
        this.setPanoramaMercado(panoramaMercado);
        return this;
    }

    public void setPanoramaMercado(String panoramaMercado) {
        this.panoramaMercado = panoramaMercado;
    }

    public Double getMontoMeta() {
        return this.montoMeta;
    }

    public Startups montoMeta(Double montoMeta) {
        this.setMontoMeta(montoMeta);
        return this;
    }

    public void setMontoMeta(Double montoMeta) {
        this.montoMeta = montoMeta;
    }

    public String getTipoMeta() {
        return this.tipoMeta;
    }

    public Startups tipoMeta(String tipoMeta) {
        this.setTipoMeta(tipoMeta);
        return this;
    }

    public void setTipoMeta(String tipoMeta) {
        this.tipoMeta = tipoMeta;
    }

    public String getLinkSitioWeb() {
        return this.linkSitioWeb;
    }

    public Startups linkSitioWeb(String linkSitioWeb) {
        this.setLinkSitioWeb(linkSitioWeb);
        return this;
    }

    public void setLinkSitioWeb(String linkSitioWeb) {
        this.linkSitioWeb = linkSitioWeb;
    }

    public String getImagenURL() {
        return this.imagenURL;
    }

    public Startups imagenURL(String imagenURL) {
        this.setImagenURL(imagenURL);
        return this;
    }

    public void setImagenURL(String imagenURL) {
        this.imagenURL = imagenURL;
    }

    public ZonedDateTime getFechaCreacion() {
        return this.fechaCreacion;
    }

    public Startups fechaCreacion(ZonedDateTime fechaCreacion) {
        this.setFechaCreacion(fechaCreacion);
        return this;
    }

    public void setFechaCreacion(ZonedDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getEstado() {
        return this.estado;
    }

    public Startups estado(String estado) {
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

    public Startups idMonedero(Monederos monederos) {
        this.setIdMonedero(monederos);
        return this;
    }

    public Set<PlanesInversion> getPlanesInversions() {
        return this.planesInversions;
    }

    public void setPlanesInversions(Set<PlanesInversion> planesInversions) {
        if (this.planesInversions != null) {
            this.planesInversions.forEach(i -> i.setIdStartup(null));
        }
        if (planesInversions != null) {
            planesInversions.forEach(i -> i.setIdStartup(this));
        }
        this.planesInversions = planesInversions;
    }

    public Startups planesInversions(Set<PlanesInversion> planesInversions) {
        this.setPlanesInversions(planesInversions);
        return this;
    }

    public Startups addPlanesInversion(PlanesInversion planesInversion) {
        this.planesInversions.add(planesInversion);
        planesInversion.setIdStartup(this);
        return this;
    }

    public Startups removePlanesInversion(PlanesInversion planesInversion) {
        this.planesInversions.remove(planesInversion);
        planesInversion.setIdStartup(null);
        return this;
    }

    public Set<Votos> getVotos() {
        return this.votos;
    }

    public void setVotos(Set<Votos> votos) {
        if (this.votos != null) {
            this.votos.forEach(i -> i.setIdStartup(null));
        }
        if (votos != null) {
            votos.forEach(i -> i.setIdStartup(this));
        }
        this.votos = votos;
    }

    public Startups votos(Set<Votos> votos) {
        this.setVotos(votos);
        return this;
    }

    public Startups addVotos(Votos votos) {
        this.votos.add(votos);
        votos.setIdStartup(this);
        return this;
    }

    public Startups removeVotos(Votos votos) {
        this.votos.remove(votos);
        votos.setIdStartup(null);
        return this;
    }

    public Set<Comentarios> getComentarios() {
        return this.comentarios;
    }

    public void setComentarios(Set<Comentarios> comentarios) {
        if (this.comentarios != null) {
            this.comentarios.forEach(i -> i.setIdStartup(null));
        }
        if (comentarios != null) {
            comentarios.forEach(i -> i.setIdStartup(this));
        }
        this.comentarios = comentarios;
    }

    public Startups comentarios(Set<Comentarios> comentarios) {
        this.setComentarios(comentarios);
        return this;
    }

    public Startups addComentarios(Comentarios comentarios) {
        this.comentarios.add(comentarios);
        comentarios.setIdStartup(this);
        return this;
    }

    public Startups removeComentarios(Comentarios comentarios) {
        this.comentarios.remove(comentarios);
        comentarios.setIdStartup(null);
        return this;
    }

    public Set<Mensajes> getMensajes() {
        return this.mensajes;
    }

    public void setMensajes(Set<Mensajes> mensajes) {
        if (this.mensajes != null) {
            this.mensajes.forEach(i -> i.setIdStartup(null));
        }
        if (mensajes != null) {
            mensajes.forEach(i -> i.setIdStartup(this));
        }
        this.mensajes = mensajes;
    }

    public Startups mensajes(Set<Mensajes> mensajes) {
        this.setMensajes(mensajes);
        return this;
    }

    public Startups addMensajes(Mensajes mensajes) {
        this.mensajes.add(mensajes);
        mensajes.setIdStartup(this);
        return this;
    }

    public Startups removeMensajes(Mensajes mensajes) {
        this.mensajes.remove(mensajes);
        mensajes.setIdStartup(null);
        return this;
    }

    public Set<Codigos> getCodigos() {
        return this.codigos;
    }

    public void setCodigos(Set<Codigos> codigos) {
        if (this.codigos != null) {
            this.codigos.forEach(i -> i.setIdStartup(null));
        }
        if (codigos != null) {
            codigos.forEach(i -> i.setIdStartup(this));
        }
        this.codigos = codigos;
    }

    public Startups codigos(Set<Codigos> codigos) {
        this.setCodigos(codigos);
        return this;
    }

    public Startups addCodigos(Codigos codigos) {
        this.codigos.add(codigos);
        codigos.setIdStartup(this);
        return this;
    }

    public Startups removeCodigos(Codigos codigos) {
        this.codigos.remove(codigos);
        codigos.setIdStartup(null);
        return this;
    }

    public Set<Facturas> getFacturas() {
        return this.facturas;
    }

    public void setFacturas(Set<Facturas> facturas) {
        if (this.facturas != null) {
            this.facturas.forEach(i -> i.setIdStartup(null));
        }
        if (facturas != null) {
            facturas.forEach(i -> i.setIdStartup(this));
        }
        this.facturas = facturas;
    }

    public Startups facturas(Set<Facturas> facturas) {
        this.setFacturas(facturas);
        return this;
    }

    public Startups addFacturas(Facturas facturas) {
        this.facturas.add(facturas);
        facturas.setIdStartup(this);
        return this;
    }

    public Startups removeFacturas(Facturas facturas) {
        this.facturas.remove(facturas);
        facturas.setIdStartup(null);
        return this;
    }

    public Set<Reuniones> getReuniones() {
        return this.reuniones;
    }

    public void setReuniones(Set<Reuniones> reuniones) {
        if (this.reuniones != null) {
            this.reuniones.forEach(i -> i.setIdStartup(null));
        }
        if (reuniones != null) {
            reuniones.forEach(i -> i.setIdStartup(this));
        }
        this.reuniones = reuniones;
    }

    public Startups reuniones(Set<Reuniones> reuniones) {
        this.setReuniones(reuniones);
        return this;
    }

    public Startups addReuniones(Reuniones reuniones) {
        this.reuniones.add(reuniones);
        reuniones.setIdStartup(this);
        return this;
    }

    public Startups removeReuniones(Reuniones reuniones) {
        this.reuniones.remove(reuniones);
        reuniones.setIdStartup(null);
        return this;
    }

    public Set<Documentos> getDocumentos() {
        return this.documentos;
    }

    public void setDocumentos(Set<Documentos> documentos) {
        if (this.documentos != null) {
            this.documentos.forEach(i -> i.setIdStartup(null));
        }
        if (documentos != null) {
            documentos.forEach(i -> i.setIdStartup(this));
        }
        this.documentos = documentos;
    }

    public Startups documentos(Set<Documentos> documentos) {
        this.setDocumentos(documentos);
        return this;
    }

    public Startups addDocumentos(Documentos documentos) {
        this.documentos.add(documentos);
        documentos.setIdStartup(this);
        return this;
    }

    public Startups removeDocumentos(Documentos documentos) {
        this.documentos.remove(documentos);
        documentos.setIdStartup(null);
        return this;
    }

    public Set<Paquetes> getPaquetes() {
        return this.paquetes;
    }

    public void setPaquetes(Set<Paquetes> paquetes) {
        if (this.paquetes != null) {
            this.paquetes.forEach(i -> i.setIdStartup(null));
        }
        if (paquetes != null) {
            paquetes.forEach(i -> i.setIdStartup(this));
        }
        this.paquetes = paquetes;
    }

    public Startups paquetes(Set<Paquetes> paquetes) {
        this.setPaquetes(paquetes);
        return this;
    }

    public Startups addPaquetes(Paquetes paquetes) {
        this.paquetes.add(paquetes);
        paquetes.setIdStartup(this);
        return this;
    }

    public Startups removePaquetes(Paquetes paquetes) {
        this.paquetes.remove(paquetes);
        paquetes.setIdStartup(null);
        return this;
    }

    public Set<DonacionesPaquetes> getDonacionesPaquetes() {
        return this.donacionesPaquetes;
    }

    public void setDonacionesPaquetes(Set<DonacionesPaquetes> donacionesPaquetes) {
        if (this.donacionesPaquetes != null) {
            this.donacionesPaquetes.forEach(i -> i.setIdStartup(null));
        }
        if (donacionesPaquetes != null) {
            donacionesPaquetes.forEach(i -> i.setIdStartup(this));
        }
        this.donacionesPaquetes = donacionesPaquetes;
    }

    public Startups donacionesPaquetes(Set<DonacionesPaquetes> donacionesPaquetes) {
        this.setDonacionesPaquetes(donacionesPaquetes);
        return this;
    }

    public Startups addDonacionesPaquetes(DonacionesPaquetes donacionesPaquetes) {
        this.donacionesPaquetes.add(donacionesPaquetes);
        donacionesPaquetes.setIdStartup(this);
        return this;
    }

    public Startups removeDonacionesPaquetes(DonacionesPaquetes donacionesPaquetes) {
        this.donacionesPaquetes.remove(donacionesPaquetes);
        donacionesPaquetes.setIdStartup(null);
        return this;
    }

    public Set<Notificaciones> getNotificaciones() {
        return this.notificaciones;
    }

    public void setNotificaciones(Set<Notificaciones> notificaciones) {
        if (this.notificaciones != null) {
            this.notificaciones.forEach(i -> i.setIdStartup(null));
        }
        if (notificaciones != null) {
            notificaciones.forEach(i -> i.setIdStartup(this));
        }
        this.notificaciones = notificaciones;
    }

    public Startups notificaciones(Set<Notificaciones> notificaciones) {
        this.setNotificaciones(notificaciones);
        return this;
    }

    public Startups addNotificaciones(Notificaciones notificaciones) {
        this.notificaciones.add(notificaciones);
        notificaciones.setIdStartup(this);
        return this;
    }

    public Startups removeNotificaciones(Notificaciones notificaciones) {
        this.notificaciones.remove(notificaciones);
        notificaciones.setIdStartup(null);
        return this;
    }

    public Categorias getIdCategoria() {
        return this.idCategoria;
    }

    public void setIdCategoria(Categorias categorias) {
        this.idCategoria = categorias;
    }

    public Startups idCategoria(Categorias categorias) {
        this.setIdCategoria(categorias);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Startups)) {
            return false;
        }
        return id != null && id.equals(((Startups) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Startups{" +
            "id=" + getId() +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", nombreLargo='" + getNombreLargo() + "'" +
            ", correoElectronico='" + getCorreoElectronico() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", contrasennia='" + getContrasennia() + "'" +
            ", latitudDireccion='" + getLatitudDireccion() + "'" +
            ", longitudDireccion='" + getLongitudDireccion() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", descripcionCorta='" + getDescripcionCorta() + "'" +
            ", beneficios='" + getBeneficios() + "'" +
            ", riesgos='" + getRiesgos() + "'" +
            ", panoramaMercado='" + getPanoramaMercado() + "'" +
            ", montoMeta=" + getMontoMeta() +
            ", tipoMeta='" + getTipoMeta() + "'" +
            ", linkSitioWeb='" + getLinkSitioWeb() + "'" +
            ", imagenURL='" + getImagenURL() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
