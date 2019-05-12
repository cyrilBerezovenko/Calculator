package com.cyrilberezovenko.service;

@FunctionalInterface
public interface Operation {

    String eval(String[] args);

    default boolean returnsNumber() {
        return true;
    }
}
