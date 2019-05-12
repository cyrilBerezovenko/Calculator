package com.cyrilberezovenko.service;

import com.google.gson.Gson;

import java.util.HashMap;

public class ConvertOperation implements Operation {

    @Override
    public String eval(String... args) {
        long value = Long.parseLong(args[0]);
        HashMap<Integer, String> map = new HashMap<Integer, String>();
        for(int i = 1; i < args.length; i++) {
            long val = value;
            long base = Long.parseLong(args[i]);
            StringBuilder res = new StringBuilder();

            while(val > 0) {
                char m = (char)('0' + (val % base));
                if(m > '9') m = (char)('A' + m - '0' - 10);
                res.append(m);
                val /= base;
            }

            map.put(Integer.parseInt(args[i]), res.length() == 0 ? "0" : res.reverse().toString());
        }
        Gson gson = new Gson();
        return gson.toJson(map);
    }

    @Override
    public boolean returnsNumber() {
        return false;
    }
}
 