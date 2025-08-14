package com.sunbeam.entities;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EvidenceFilesSimpleConverter implements AttributeConverter<List<String>, String> {

    private static final String DELIM = "|";

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null || attribute.isEmpty()) return null;

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < attribute.size(); i++) {
            String s = attribute.get(i);
            if (s != null) {
                
                String escaped = s.replace(DELIM, "\\" + DELIM);
                sb.append(escaped);
            }
            if (i < attribute.size() - 1) {
                sb.append(DELIM);
            }
        }
        return sb.toString();
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) return Collections.emptyList();

        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean escaping = false;

        for (int i = 0; i < dbData.length(); i++) {
            char ch = dbData.charAt(i);
            if (escaping) {
                // previous was escape, take literal
                current.append(ch);
                escaping = false;
            } else if (ch == '\\') {
                // start escape
                escaping = true;
            } else if (String.valueOf(ch).equals(DELIM)) {
                // delimiter (not escaped): split here
                result.add(current.toString());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }
        // add last segment
        result.add(current.toString());
        return result;
    }
}