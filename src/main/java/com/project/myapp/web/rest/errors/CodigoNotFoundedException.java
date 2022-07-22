package com.project.myapp.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class CodigoNotFoundedException extends AbstractThrowableProblem {

    public CodigoNotFoundedException() {
        super(ErrorConstants.ERR_FINDING_CODIGO, "Código incorrecto, trate nuevamente", Status.INTERNAL_SERVER_ERROR);
    }
}
