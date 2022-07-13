package com.project.myapp.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.project.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.project.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.project.myapp.domain.User.class.getName());
            createCache(cm, com.project.myapp.domain.Authority.class.getName());
            createCache(cm, com.project.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName());
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".votos");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".comentarios");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".mensajes");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".codigos");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".facturas");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".reuniones");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".documentos");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".donacionesPaquetes");
            createCache(cm, com.project.myapp.domain.Usuarios.class.getName() + ".notificaciones");
            createCache(cm, com.project.myapp.domain.Startups.class.getName());
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".planesInversions");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".votos");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".comentarios");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".mensajes");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".codigos");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".facturas");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".reuniones");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".documentos");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".paquetes");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".donacionesPaquetes");
            createCache(cm, com.project.myapp.domain.Startups.class.getName() + ".notificaciones");
            createCache(cm, com.project.myapp.domain.RolesUsuarios.class.getName());
            createCache(cm, com.project.myapp.domain.RolesUsuarios.class.getName() + ".usuarios");
            createCache(cm, com.project.myapp.domain.Monederos.class.getName());
            createCache(cm, com.project.myapp.domain.Monederos.class.getName() + ".movimientos");
            createCache(cm, com.project.myapp.domain.Movimientos.class.getName());
            createCache(cm, com.project.myapp.domain.Codigos.class.getName());
            createCache(cm, com.project.myapp.domain.Inscripciones.class.getName());
            createCache(cm, com.project.myapp.domain.PlanesInversion.class.getName());
            createCache(cm, com.project.myapp.domain.Notificaciones.class.getName());
            createCache(cm, com.project.myapp.domain.Categorias.class.getName());
            createCache(cm, com.project.myapp.domain.Categorias.class.getName() + ".startups");
            createCache(cm, com.project.myapp.domain.Paquetes.class.getName());
            createCache(cm, com.project.myapp.domain.Paquetes.class.getName() + ".documentos");
            createCache(cm, com.project.myapp.domain.Paquetes.class.getName() + ".donacionesPaquetes");
            createCache(cm, com.project.myapp.domain.DonacionesPaquetes.class.getName());
            createCache(cm, com.project.myapp.domain.DonacionesPaquetes.class.getName() + ".rastreadors");
            createCache(cm, com.project.myapp.domain.Rastreador.class.getName());
            createCache(cm, com.project.myapp.domain.Documentos.class.getName());
            createCache(cm, com.project.myapp.domain.Votos.class.getName());
            createCache(cm, com.project.myapp.domain.Comentarios.class.getName());
            createCache(cm, com.project.myapp.domain.Mensajes.class.getName());
            createCache(cm, com.project.myapp.domain.Facturas.class.getName());
            createCache(cm, com.project.myapp.domain.Reuniones.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
