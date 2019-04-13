package com.cyrilberezovenko.service;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.stream.Stream;

@Data
@Component
public class CalculatorService {

    private static int MAX_DECIMAL_PLACES = 14;

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
        String str = String.valueOf(res);
        if(!Double.isFinite(Double.parseDouble(str))) return str;
        if(str.substring(str.length()-2, str.length()).equals(".0"))
            str = str.substring(0, str.length()-2);
        str = round(str);
        return str.replace(',', '.')
                  .replace('E', 'e');
    }

    private String round(String s) {
        String pattern = "#." + Stream.of(new Object[MAX_DECIMAL_PLACES])
                                .map(b -> "#")
                                .reduce(String::concat).get();

        double d = Double.parseDouble(s);
        if(d % 1 == 0 && s.length() > MAX_DECIMAL_PLACES) {
            DecimalFormat f = new DecimalFormat(pattern + "E00");
            return f.format(d);
        }

        DecimalFormat f = new DecimalFormat(pattern);
        int ind = s.length()-1;
        for(; ind >= 0 && s.charAt(ind) != 'E'; ind--);
        if(ind == -1) return f.format(Double.parseDouble(s));
        double sub = Double.parseDouble(s.substring(0, ind));
        return f.format(sub) + s.substring(ind);
    }
}
