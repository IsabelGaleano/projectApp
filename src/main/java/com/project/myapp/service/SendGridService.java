package com.project.myapp.service;

import com.project.myapp.domain.Codigos;
import com.project.myapp.domain.User;
import com.project.myapp.domain.Usuarios;
import com.project.myapp.encriptar.Encriptar;
import com.project.myapp.repository.CodigosRepository;
import com.project.myapp.web.rest.errors.MailServiceException;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;


@Service
public class SendGridService {

    private Encriptar encriptar;
    private CodigosRepository codigosRepository;

    public SendGridService(CodigosRepository codigosRepository) {
        this.codigosRepository = codigosRepository;
    }

    public SendGridService() {
    }

    public String sendOTP(String correo, Usuarios usuarios) {
        try{
            if (!Objects.isNull(usuarios)) {
                int OTPCode = Integer.parseInt(generateOTP());
                String templateId = "d-708a8389bb764fc8b2566d28ba78a19e";
                Mail mail = new Mail();
                mail.setFrom(new Email("dcoto37@gmail.com", "Tripnary"));
                mail.setTemplateId(templateId);
                Personalization personalization = new Personalization();
                personalization.addDynamicTemplateData("header", OTPCode);
                personalization.addTo(new Email(correo));
                mail.addPersonalization(personalization);
                sendInternal(mail);
                Codigos codigos = new Codigos();
                codigos.setIdUsuario(usuarios);
                codigos.setEstado("Activo");
                codigos.setCodigo(String.valueOf(OTPCode));
                this.codigosRepository.save(codigos);
            }
            return ("ok");
        }catch (Exception e){
            throw new MailServiceException();
        }
    }


        private void sendInternal(Mail mail) {
            encriptar = new Encriptar();
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

        public String generateOTP() {
            return new DecimalFormat("000000").format(new Random().nextInt(999999));
        }
    }

