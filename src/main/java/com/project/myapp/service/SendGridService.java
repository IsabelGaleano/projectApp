package com.project.myapp.service;
import java.io.IOException;

import com.sendgrid.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@Service
public class SendGridService {
    private static final Logger logger = LoggerFactory.getLogger(MailService.class);

    public static String send() throws IOException {
        // the sender email should be the same as we used to Create a Single Sender Verification
        Email from = new Email("add the sender email");
        String subject = "The subject";
        Email to = new Email("reciver");
        Content content = new Content("text/plain", "This is a test email");
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid("SENDGRID_API_KEY");
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            logger.info(response.getBody());
            return response.getBody();
        } catch (IOException ex) {
            throw ex;
        }
    }
}

