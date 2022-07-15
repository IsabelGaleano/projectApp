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
 * A Usuarios.
 */
@Entity
@Table(name = "usuarios")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Usuarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Size(min = 1, max = 50)
    @Column(name = "cedula", length = 50)
    private String cedula;

    @Size(min = 1, max = 100)
    @Column(name = "primer_apellido", length = 100)
    private String primerApellido;

    @Size(min = 1, max = 100)
    @Column(name = "segundo_apellido", length = 100)
    private String segundoApellido;

    @NotNull
    @Size(min = 1, max = 300)
    @Column(name = "correo_electronico", length = 300, nullable = false, unique = true)
    private String correoElectronico;

    @Column(name = "genero")
    private String genero;

    @Size(min = 1, max = 50)
    @Column(name = "telefono", length = 50)
    private String telefono;

    @Column(name = "fecha_nacimiento")
    private ZonedDateTime fechaNacimiento;

    @Size(min = 1, max = 50)
    @Column(name = "latitud_direccion", length = 50)
    private String latitudDireccion;

    @Size(min = 1, max = 50)
    @Column(name = "longitud_direccion", length = 50)
    private String longitudDireccion;

    @Size(min = 1, max = 300)
    @Column(name = "imagen_url", length = 300)
    private String imagenURL;

    @Size(min = 1, max = 50)
    @Column(name = "tipo_usuario_final", length = 50)
    private String tipoUsuarioFinal;

    @Size(min = 1, max = 50)
    @Column(name = "contrasennia", length = 50)
    private String contrasennia;

    @Size(min = 1, max = 50)
    @Column(name = "estado", length = 50)
    private String estado;

    @JsonIgnoreProperties(value = { "movimientos" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Monederos idMonedero;

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Votos> votos = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Comentarios> comentarios = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Mensajes> mensajes = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Codigos> codigos = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idDonacionPaquete", "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Facturas> facturas = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Reuniones> reuniones = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private Set<Documentos> documentos = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "rastreadors", "idStartup", "idUsuario", "idPaquete" }, allowSetters = true)
    private Set<DonacionesPaquetes> donacionesPaquetes = new HashSet<>();

    @OneToMany(mappedBy = "idUsuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "idStartup", "idUsuario" }, allowSetters = true)
    private Set<Notificaciones> notificaciones = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "usuarios" }, allowSetters = true)
    private RolesUsuarios idRol;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Usuarios() {}

    public Usuarios(
        String nombre,
        String cedula,
        String primerApellido,
        String segundoApellido,
        String correoElectronico,
        String genero,
        String telefono,
        ZonedDateTime fechaNacimiento,
        String latitudDireccion,
        String longitudDireccion,
        String imagenURL,
        String tipoUsuarioFinal,
        String contrasennia,
        String estado,
        Monederos idMonedero,
        RolesUsuarios idRol
    ) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.correoElectronico = correoElectronico;
        this.genero = genero;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.latitudDireccion = latitudDireccion;
        this.longitudDireccion = longitudDireccion;
        this.imagenURL = imagenURL;
        this.tipoUsuarioFinal = tipoUsuarioFinal;
        this.contrasennia = contrasennia;
        this.estado = estado;
        this.idMonedero = idMonedero;
        this.idRol = idRol;
    }

    public Long getId() {
        return this.id;
    }

    public Usuarios id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Usuarios nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedula() {
        return this.cedula;
    }

    public Usuarios cedula(String cedula) {
        this.setCedula(cedula);
        return this;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getPrimerApellido() {
        return this.primerApellido;
    }

    public Usuarios primerApellido(String primerApellido) {
        this.setPrimerApellido(primerApellido);
        return this;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return this.segundoApellido;
    }

    public Usuarios segundoApellido(String segundoApellido) {
        this.setSegundoApellido(segundoApellido);
        return this;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getCorreoElectronico() {
        return this.correoElectronico;
    }

    public Usuarios correoElectronico(String correoElectronico) {
        this.setCorreoElectronico(correoElectronico);
        return this;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getGenero() {
        return this.genero;
    }

    public Usuarios genero(String genero) {
        this.setGenero(genero);
        return this;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Usuarios telefono(String telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public ZonedDateTime getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    public Usuarios fechaNacimiento(ZonedDateTime fechaNacimiento) {
        this.setFechaNacimiento(fechaNacimiento);
        return this;
    }

    public void setFechaNacimiento(ZonedDateTime fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getLatitudDireccion() {
        return this.latitudDireccion;
    }

    public Usuarios latitudDireccion(String latitudDireccion) {
        this.setLatitudDireccion(latitudDireccion);
        return this;
    }

    public void setLatitudDireccion(String latitudDireccion) {
        this.latitudDireccion = latitudDireccion;
    }

    public String getLongitudDireccion() {
        return this.longitudDireccion;
    }

    public Usuarios longitudDireccion(String longitudDireccion) {
        this.setLongitudDireccion(longitudDireccion);
        return this;
    }

    public void setLongitudDireccion(String longitudDireccion) {
        this.longitudDireccion = longitudDireccion;
    }

    public String getImagenURL() {
        return this.imagenURL;
    }

    public Usuarios imagenURL(String imagenURL) {
        this.setImagenURL(imagenURL);
        return this;
    }

    public void setImagenURL(String imagenURL) {
        this.imagenURL = imagenURL;
    }

    public String getTipoUsuarioFinal() {
        return this.tipoUsuarioFinal;
    }

    public Usuarios tipoUsuarioFinal(String tipoUsuarioFinal) {
        this.setTipoUsuarioFinal(tipoUsuarioFinal);
        return this;
    }

    public void setTipoUsuarioFinal(String tipoUsuarioFinal) {
        this.tipoUsuarioFinal = tipoUsuarioFinal;
    }

    public String getContrasennia() {
        return this.contrasennia;
    }

    public Usuarios contrasennia(String contrasennia) {
        this.setContrasennia(contrasennia);
        return this;
    }

    public void setContrasennia(String contrasennia) {
        this.contrasennia = contrasennia;
    }

    public String getEstado() {
        return this.estado;
    }

    public Usuarios estado(String estado) {
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

    public Usuarios idMonedero(Monederos monederos) {
        this.setIdMonedero(monederos);
        return this;
    }

    public Set<Votos> getVotos() {
        return this.votos;
    }

    public void setVotos(Set<Votos> votos) {
        if (this.votos != null) {
            this.votos.forEach(i -> i.setIdUsuario(null));
        }
        if (votos != null) {
            votos.forEach(i -> i.setIdUsuario(this));
        }
        this.votos = votos;
    }

    public Usuarios votos(Set<Votos> votos) {
        this.setVotos(votos);
        return this;
    }

    public Usuarios addVotos(Votos votos) {
        this.votos.add(votos);
        votos.setIdUsuario(this);
        return this;
    }

    public Usuarios removeVotos(Votos votos) {
        this.votos.remove(votos);
        votos.setIdUsuario(null);
        return this;
    }

    public Set<Comentarios> getComentarios() {
        return this.comentarios;
    }

    public void setComentarios(Set<Comentarios> comentarios) {
        if (this.comentarios != null) {
            this.comentarios.forEach(i -> i.setIdUsuario(null));
        }
        if (comentarios != null) {
            comentarios.forEach(i -> i.setIdUsuario(this));
        }
        this.comentarios = comentarios;
    }

    public Usuarios comentarios(Set<Comentarios> comentarios) {
        this.setComentarios(comentarios);
        return this;
    }

    public Usuarios addComentarios(Comentarios comentarios) {
        this.comentarios.add(comentarios);
        comentarios.setIdUsuario(this);
        return this;
    }

    public Usuarios removeComentarios(Comentarios comentarios) {
        this.comentarios.remove(comentarios);
        comentarios.setIdUsuario(null);
        return this;
    }

    public Set<Mensajes> getMensajes() {
        return this.mensajes;
    }

    public void setMensajes(Set<Mensajes> mensajes) {
        if (this.mensajes != null) {
            this.mensajes.forEach(i -> i.setIdUsuario(null));
        }
        if (mensajes != null) {
            mensajes.forEach(i -> i.setIdUsuario(this));
        }
        this.mensajes = mensajes;
    }

    public Usuarios mensajes(Set<Mensajes> mensajes) {
        this.setMensajes(mensajes);
        return this;
    }

    public Usuarios addMensajes(Mensajes mensajes) {
        this.mensajes.add(mensajes);
        mensajes.setIdUsuario(this);
        return this;
    }

    public Usuarios removeMensajes(Mensajes mensajes) {
        this.mensajes.remove(mensajes);
        mensajes.setIdUsuario(null);
        return this;
    }

    public Set<Codigos> getCodigos() {
        return this.codigos;
    }

    public void setCodigos(Set<Codigos> codigos) {
        if (this.codigos != null) {
            this.codigos.forEach(i -> i.setIdUsuario(null));
        }
        if (codigos != null) {
            codigos.forEach(i -> i.setIdUsuario(this));
        }
        this.codigos = codigos;
    }

    public Usuarios codigos(Set<Codigos> codigos) {
        this.setCodigos(codigos);
        return this;
    }

    public Usuarios addCodigos(Codigos codigos) {
        this.codigos.add(codigos);
        codigos.setIdUsuario(this);
        return this;
    }

    public Usuarios removeCodigos(Codigos codigos) {
        this.codigos.remove(codigos);
        codigos.setIdUsuario(null);
        return this;
    }

    public Set<Facturas> getFacturas() {
        return this.facturas;
    }

    public void setFacturas(Set<Facturas> facturas) {
        if (this.facturas != null) {
            this.facturas.forEach(i -> i.setIdUsuario(null));
        }
        if (facturas != null) {
            facturas.forEach(i -> i.setIdUsuario(this));
        }
        this.facturas = facturas;
    }

    public Usuarios facturas(Set<Facturas> facturas) {
        this.setFacturas(facturas);
        return this;
    }

    public Usuarios addFacturas(Facturas facturas) {
        this.facturas.add(facturas);
        facturas.setIdUsuario(this);
        return this;
    }

    public Usuarios removeFacturas(Facturas facturas) {
        this.facturas.remove(facturas);
        facturas.setIdUsuario(null);
        return this;
    }

    public Set<Reuniones> getReuniones() {
        return this.reuniones;
    }

    public void setReuniones(Set<Reuniones> reuniones) {
        if (this.reuniones != null) {
            this.reuniones.forEach(i -> i.setIdUsuario(null));
        }
        if (reuniones != null) {
            reuniones.forEach(i -> i.setIdUsuario(this));
        }
        this.reuniones = reuniones;
    }

    public Usuarios reuniones(Set<Reuniones> reuniones) {
        this.setReuniones(reuniones);
        return this;
    }

    public Usuarios addReuniones(Reuniones reuniones) {
        this.reuniones.add(reuniones);
        reuniones.setIdUsuario(this);
        return this;
    }

    public Usuarios removeReuniones(Reuniones reuniones) {
        this.reuniones.remove(reuniones);
        reuniones.setIdUsuario(null);
        return this;
    }

    public Set<Documentos> getDocumentos() {
        return this.documentos;
    }

    public void setDocumentos(Set<Documentos> documentos) {
        if (this.documentos != null) {
            this.documentos.forEach(i -> i.setIdUsuario(null));
        }
        if (documentos != null) {
            documentos.forEach(i -> i.setIdUsuario(this));
        }
        this.documentos = documentos;
    }

    public Usuarios documentos(Set<Documentos> documentos) {
        this.setDocumentos(documentos);
        return this;
    }

    public Usuarios addDocumentos(Documentos documentos) {
        this.documentos.add(documentos);
        documentos.setIdUsuario(this);
        return this;
    }

    public Usuarios removeDocumentos(Documentos documentos) {
        this.documentos.remove(documentos);
        documentos.setIdUsuario(null);
        return this;
    }

    public Set<DonacionesPaquetes> getDonacionesPaquetes() {
        return this.donacionesPaquetes;
    }

    public void setDonacionesPaquetes(Set<DonacionesPaquetes> donacionesPaquetes) {
        if (this.donacionesPaquetes != null) {
            this.donacionesPaquetes.forEach(i -> i.setIdUsuario(null));
        }
        if (donacionesPaquetes != null) {
            donacionesPaquetes.forEach(i -> i.setIdUsuario(this));
        }
        this.donacionesPaquetes = donacionesPaquetes;
    }

    public Usuarios donacionesPaquetes(Set<DonacionesPaquetes> donacionesPaquetes) {
        this.setDonacionesPaquetes(donacionesPaquetes);
        return this;
    }

    public Usuarios addDonacionesPaquetes(DonacionesPaquetes donacionesPaquetes) {
        this.donacionesPaquetes.add(donacionesPaquetes);
        donacionesPaquetes.setIdUsuario(this);
        return this;
    }

    public Usuarios removeDonacionesPaquetes(DonacionesPaquetes donacionesPaquetes) {
        this.donacionesPaquetes.remove(donacionesPaquetes);
        donacionesPaquetes.setIdUsuario(null);
        return this;
    }

    public Set<Notificaciones> getNotificaciones() {
        return this.notificaciones;
    }

    public void setNotificaciones(Set<Notificaciones> notificaciones) {
        if (this.notificaciones != null) {
            this.notificaciones.forEach(i -> i.setIdUsuario(null));
        }
        if (notificaciones != null) {
            notificaciones.forEach(i -> i.setIdUsuario(this));
        }
        this.notificaciones = notificaciones;
    }

    public Usuarios notificaciones(Set<Notificaciones> notificaciones) {
        this.setNotificaciones(notificaciones);
        return this;
    }

    public Usuarios addNotificaciones(Notificaciones notificaciones) {
        this.notificaciones.add(notificaciones);
        notificaciones.setIdUsuario(this);
        return this;
    }

    public Usuarios removeNotificaciones(Notificaciones notificaciones) {
        this.notificaciones.remove(notificaciones);
        notificaciones.setIdUsuario(null);
        return this;
    }

    public RolesUsuarios getIdRol() {
        return this.idRol;
    }

    public void setIdRol(RolesUsuarios rolesUsuarios) {
        this.idRol = rolesUsuarios;
    }

    public Usuarios idRol(RolesUsuarios rolesUsuarios) {
        this.setIdRol(rolesUsuarios);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuarios)) {
            return false;
        }
        return id != null && id.equals(((Usuarios) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuarios{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", cedula='" + getCedula() + "'" +
            ", primerApellido='" + getPrimerApellido() + "'" +
            ", segundoApellido='" + getSegundoApellido() + "'" +
            ", correoElectronico='" + getCorreoElectronico() + "'" +
            ", genero='" + getGenero() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", latitudDireccion='" + getLatitudDireccion() + "'" +
            ", longitudDireccion='" + getLongitudDireccion() + "'" +
            ", imagenURL='" + getImagenURL() + "'" +
            ", tipoUsuarioFinal='" + getTipoUsuarioFinal() + "'" +
            ", contrasennia='" + getContrasennia() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
