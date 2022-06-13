package com.example.chatapp;

import org.junit.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class DateTimeTest {
    @Test
    public void test(){
    System.out.println(LocalDateTime.now(ZoneId.of("Asia/Seoul")).toString());
    }
}
