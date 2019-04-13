package com.cyrilberezovenko.controller;

import com.cyrilberezovenko.service.CalculatorService;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

@Data
@NoArgsConstructor
@RestController
@RequestMapping("/calc")
public class Controller {

    @Autowired
    private CalculatorService calculatorService;

    public static String readFile(String file) {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(file));
            StringBuilder str = new StringBuilder();
            reader.lines().forEach(s -> str.append(s).append("\n"));
            reader.close();
            return str.toString();
        } catch(Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @GetMapping("/")
    public ResponseEntity getHtml() {
        String body = readFile("./src/main/webapp/index.html");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/bundle.js")
    public ResponseEntity getJS() {
        String body = readFile("./src/main/webapp/dist/bundle.js");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/textFit.js")
    public ResponseEntity getTextFit() {
        String body = readFile("./src/main/webapp/js/lib/textFit.js");
        return ResponseEntity.ok(body);
    }

    @GetMapping("/service")
    public ResponseEntity calculate(@RequestParam(name = "first") double first
                                    ,@RequestParam(name = "second") double second
                                    ,@RequestParam(name = "op") String operation) {

        System.out.println(first + " " + second + " " + operation);
        String res = calculatorService.calculate(first, second, operation);
        System.out.println(res);
        return ResponseEntity.ok(res);
    }
}
