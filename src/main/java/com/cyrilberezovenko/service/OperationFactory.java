package com.cyrilberezovenko.service;

import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class OperationFactory {

    private HashMap<String, Operation> standardMap = new HashMap<String, Operation>() {{

        put("sum",  a -> String.valueOf(Double.parseDouble(a[0]) + Double.parseDouble(a[1])));
        put("sub",  a -> String.valueOf(Double.parseDouble(a[0]) - Double.parseDouble(a[1])));
        put("prod", a -> String.valueOf(Double.parseDouble(a[0]) * Double.parseDouble(a[1])));
        put("div",  a -> String.valueOf(Double.parseDouble(a[0]) / Double.parseDouble(a[1])));

    }};

    private HashMap<String, Operation> programmerMap = new HashMap<String, Operation>() {{

        put("sum",  a -> String.valueOf(Long.parseLong(a[0]) + Long.parseLong(a[1])));
        put("sub",  a -> String.valueOf(Long.parseLong(a[0]) - Long.parseLong(a[1])));
        put("prod", a -> String.valueOf(Long.parseLong(a[0]) * Long.parseLong(a[1])));
        put("div",  a -> {
            if(Long.parseLong(a[1]) == 0) return "Error";
            return String.valueOf(Long.parseLong(a[0]) / Long.parseLong(a[1]));
        });

        put("convert", new ConvertOperation());

    }};

    public Operation getOperation(String name, Mode mode) {
        return (mode == Mode.STANDARD ? standardMap : programmerMap).get(name);
    }
}
