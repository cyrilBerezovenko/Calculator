package com.cyrilberezovenko.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.function.BiFunction;
import java.util.stream.Stream;

@Data
@Component
public class CalculatorService {

    private static int MAX_DECIMAL_PLACES = 14;

    @Autowired
    private OperationFactory operationFactory;

    public String calculate(String[] args, String operation, Mode mode) {
        Operation op = operationFactory.getOperation(operation, mode);
        if(op == null) return "Error";
        String str = op.eval(args);
        if("Error".equals(str)) return str;

        if(!op.returnsNumber() || !Double.isFinite(Double.parseDouble(str))) return str;

        if(str.length() > 1 && str.substring(str.length()-2, str.length()).equals(".0"))
            str = str.substring(0, str.length()-2);

        if(mode == Mode.STANDARD) {
            str = round(str);
            str = str.replace(',', '.')
                     .replace('E', 'e');
        }

        return str;
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
