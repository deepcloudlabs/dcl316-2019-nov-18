package com.example.hr.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TcKimlikNoValidator.class)
public @interface TcKimlikNo {
    String message() default "{validation.identityNo}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
