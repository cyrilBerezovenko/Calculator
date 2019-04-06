package com.cyrilberezovenko.service;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class CalculatorService {

    public String calculate(double first, double second, String operation) {
        double res;
        switch(operation) {
            case "sum":
                res = first + second; break;
            case "sub":
                res = first - second; break;
            case "prod":
                res = first * second; break;
            case "div":
                res = first / second; break;
            default:
                throw new RuntimeException("Invalid operation : " + operation);
        }
        if(!Double.isFinite(res))
            return "Infinity";
        String str = String.valueOf(res);
        if(str.substring(str.length()-2, str.length()).equals(".0"))
            str = str.substring(0, str.length()-2);
        return str;
    }
}
