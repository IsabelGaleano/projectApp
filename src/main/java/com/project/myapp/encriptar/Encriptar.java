package com.project.myapp.encriptar;

public class Encriptar {

    public String encripta(String str) {
        String abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        String strCodificado = "";
        char caracter;
        for (int i = 0; i < str.length(); i++) {
            caracter = str.charAt(i);
            int pos = abecedario.indexOf(caracter);
            if (pos == -1) {
                strCodificado += caracter;
            } else {
                strCodificado += abecedario.charAt((pos + 3) % abecedario.length());
            }
        }

        return strCodificado;
    }

    public String desencripta(String s) {
        String abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        String strDescodificado = "";
        char caracter;
        for (int i = 0; i < s.length(); i++) {
            caracter = s.charAt(i);
            int pos = abecedario.indexOf(caracter);
            if (pos == -1) {
                strDescodificado += caracter;
            } else {
                if (pos - 3 < 0) {
                    strDescodificado += abecedario.charAt(abecedario.length() + (pos - 3));
                } else {
                    strDescodificado += abecedario.charAt((pos - 3) % abecedario.length());
                }
            }
        }

        return strDescodificado;
    }
}
