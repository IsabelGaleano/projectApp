package com.project.myapp.sendgrid;

import com.project.myapp.domain.InfoRastreador;
import com.project.myapp.encriptar.Encriptar;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import java.io.IOException;

public class SendEmail {

    public void correoVerificacionUsuario(int codigo, String correo) {
        String templateId = "d-708a8389bb764fc8b2566d28ba78a19e";
        Mail mail = new Mail();
        mail.setFrom(new Email("dcoto37@gmail.com", "StartupSafe"));
        mail.setTemplateId(templateId);
        Personalization personalization = new Personalization();
        personalization.addDynamicTemplateData("header", String.valueOf(codigo));
        personalization.addTo(new Email(correo));
        mail.addPersonalization(personalization);
        sendInternal(mail);
    }

    private void sendInternal(Mail mail) {
        Encriptar encriptar = new Encriptar();
        SendGrid sg = new SendGrid(encriptar.desencripta("VJ.Ñ86z0oVUTmiKe5kbF5Y53g.ikV2SWm989rIK7ZDVyssxKj3YXwzAFZ7O3hj_eX8-SH"));
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void correoFacturaDonacionesPaquetes(
        String correo,
        String nombreStartup,
        String idDonacion,
        String montoDonacion,
        String montoEnvio,
        String montoImpuesto,
        String total
    ) {
        String templateId = "d-3187dd310cfa40efb46066c35d5262fe";
        Mail mail = new Mail();
        mail.setFrom(new Email("dcoto37@gmail.com", "StartupSafe"));
        mail.setTemplateId(templateId);
        Personalization personalization = new Personalization();
        personalization.addDynamicTemplateData("nombreStartup", nombreStartup);
        personalization.addDynamicTemplateData("codigoDonacion", idDonacion);
        personalization.addDynamicTemplateData("montoDonacion", montoDonacion);
        personalization.addDynamicTemplateData("montoEnvio", montoEnvio);
        personalization.addDynamicTemplateData("montoImpuesto", montoImpuesto);
        personalization.addDynamicTemplateData("total", total);
        personalization.addTo(new Email(correo));
        mail.addPersonalization(personalization);
        sendInternal(mail);
    }

    public void correoNotificacionesRastreador(InfoRastreador infoRastreador, String correo) {
        String templateId = "d-463c1420b6b24acc9ab4b16947961597";
        Mail mail = new Mail();
        mail.setFrom(new Email("dcoto37@gmail.com", "StartupSafe"));
        mail.setTemplateId(templateId);
        Personalization personalization = new Personalization();
        infoRastreador.getUbicacion().trim();
        personalization.addDynamicTemplateData("titulo", infoRastreador.getTitulo().toString());
        personalization.addDynamicTemplateData("descripcion", infoRastreador.getDescripcion().toString());
        personalization.addDynamicTemplateData("ubicacion", infoRastreador.getUbicacion().toString());
        personalization.addDynamicTemplateData("distancia", infoRastreador.getDistancia().toString());
        personalization.addDynamicTemplateData("duracion", infoRastreador.getDuracion().toString());
        personalization.addTo(new Email(correo));
        mail.addPersonalization(personalization);
        sendInternal(mail);
    }
}
