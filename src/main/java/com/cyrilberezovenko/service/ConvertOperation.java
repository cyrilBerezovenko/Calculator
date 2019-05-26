package com.cyrilberezovenko.service;

import com.google.gson.Gson;

import java.util.HashMap;

public class ConvertOperation implements Operation {



    @Override
    public String eval(String... args) {
        long value = Long.parseLong(args[0]);
        HashMap<Integer, String> map = new HashMap<Integer, String>();
        for(int i = 1; i < args.length; i++) {
            long base = Long.parseLong(args[i]);

            map.put((int)base, value >= 0 ? convertPositive(value, base) : convertNegative(value, base));
        }
        Gson gson = new Gson();
        return gson.toJson(map);
    }

    private String convertPositive(long val, long base) {
        StringBuilder res = new StringBuilder();

        while(val > 0) {
            char m = (char)('0' + (val % base));
            if(m > '9') m = (char)('A' + m - '0' - 10);
            res.append(m);
            val /= base;
        }

        return res.length() == 0 ? "0" : res.reverse().toString();
    }

    private String convertNegative(long val, long base) {
        String r = convertPositive(Long.MAX_VALUE, base);
        r = longSum(r, "1", (int)base);
        r = longSum(r, convertPositive(Long.MAX_VALUE + val + 1, base), (int)base);
        return r;
    }

    private String longSum(String a, String b, int base) {

        if (a.length() > b.length()) {
            String t = a;
            a = b;
            b = t;
        }

        StringBuilder str = new StringBuilder();

        int n1 = a.length(), n2 = b.length();

        a = new StringBuilder(a).reverse().toString();
        b = new StringBuilder(b).reverse().toString();

        int carry = 0;
        for (int i = 0; i < n1; i++) {
            int sum = (toDigit(a.charAt(i)) + toDigit(b.charAt(i)) + carry);
            str.append(toChar(sum % base));
            carry = sum / base;
        }

        for (int i = n1; i < n2; i++) {
            int sum = toDigit(b.charAt(i)) + carry;
            str.append(toChar(sum % base));
            carry = sum / base;
        }

        if (carry > 0)
            str.append(toChar(carry));

        return str.reverse().toString();
    }

    private int toDigit(char c) {
        return '0' <= c && c <= '9' ? c - '0' : c - 'A' + 10;
    }

    private char toChar(int d) {
        return (char)(0 <= d && d <= 9 ? d + '0' : d + 'A' - 10);
    }

    @Override
    public boolean returnsNumber() {
        return false;
    }
}
 