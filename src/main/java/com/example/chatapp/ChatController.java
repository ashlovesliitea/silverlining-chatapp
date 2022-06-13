package com.example.chatapp;

import com.example.chatapp.model.Chat;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@RequiredArgsConstructor
@RequestMapping("/app/chats")
@RestController //데이터 리턴 서버
public class ChatController {
    private final ChatRepository chatRepository;

    //귓속말 할때 사용
    @CrossOrigin
    @GetMapping(value="/sender/{sender}/receiver/{receiver}",produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> getMsg(@PathVariable Integer sender,
                             @PathVariable Integer receiver){
        return chatRepository.mFindBySender(sender,receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }

    @CrossOrigin
    @GetMapping(value="/chatrooms/{roomNum}",produces= MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> findByRoomNum(@PathVariable Integer roomNum){
        return chatRepository.mFindByRoomNum(roomNum)
                .subscribeOn(Schedulers.boundedElastic());
    }


    @CrossOrigin
    @PostMapping("")
    public Mono<Chat> setMsg(@RequestBody Chat chat){
        chat.setCreatedAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")).toString());
        return chatRepository.save(chat);
    }



}
