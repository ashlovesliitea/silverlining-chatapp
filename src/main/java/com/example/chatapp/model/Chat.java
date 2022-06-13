package com.example.chatapp.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@Document(collection="chat-app")
public class Chat {
    @Id
    private String id;
    private String msg;
    private Integer sender_idx;
    private String sender_name;
    private Integer receiver_idx;
    private Integer room_num;
    private String createdAt;
}
