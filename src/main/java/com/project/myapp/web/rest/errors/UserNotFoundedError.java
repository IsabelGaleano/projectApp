package com.project.myapp.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class UserNotFoundedError extends AbstractThrowableProblem {

    public UserNotFoundedError() {
        super(ErrorConstants.ERR_FINDING_USER, "Usuario no encontrado", Status.INTERNAL_SERVER_ERROR);
    }
}
