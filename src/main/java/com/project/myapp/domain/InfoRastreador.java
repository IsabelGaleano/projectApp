package com.project.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InfoRastreador {

    private String titulo;
    private String descripcion;
    private String ubicacion;
    private String duracion;
    private String distancia;
    private Long idStartup;
    private Long idUsuario;
    private Long idDonacionPaquete;

    public InfoRastreador() {}

    public InfoRastreador(
        String titulo,
        String descripcion,
        String ubicacion,
        String duracion,
        String distancia,
        Long idStartup,
        Long idUsuario
    ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.duracion = duracion;
        this.distancia = distancia;
        this.idStartup = idStartup;
        this.idUsuario = idUsuario;
    }

    public InfoRastreador(
        String titulo,
        String descripcion,
        String ubicacion,
        String duracion,
        String distancia,
        Long idStartup,
        Long idUsuario,
        Long idDonacionPaquete
    ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.duracion = duracion;
        this.distancia = distancia;
        this.idStartup = idStartup;
        this.idUsuario = idUsuario;
        this.idDonacionPaquete = idDonacionPaquete;
    }

    public InfoRastreador(String titulo, String descripcion, Long idStartup, Long idUsuario, Long idDonacionPaquete) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.idStartup = idStartup;
        this.idUsuario = idUsuario;
        this.idDonacionPaquete = idDonacionPaquete;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getDistancia() {
        return distancia;
    }

    public void setDistancia(String distancia) {
        this.distancia = distancia;
    }

    public Long getIdStartup() {
        return idStartup;
    }

    public void setIdStartup(Long idStartup) {
        this.idStartup = idStartup;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdDonacionPaquete() {
        return idDonacionPaquete;
    }

    public void setIdDonacionPaquete(Long idDonacionPaquete) {
        this.idDonacionPaquete = idDonacionPaquete;
    }
}
