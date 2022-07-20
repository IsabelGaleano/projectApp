package com.project.myapp.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class MailServiceException extends AbstractThrowableProblem  {

    public MailServiceException() {
        super(ErrorConstants.ERR_SENDING_EMAIL, "Error al enviar el correo", Status.INTERNAL_SERVER_ERROR);
    }
}
