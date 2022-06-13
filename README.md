# :incoming_envelope: Silverlining-Chatapp

- Silverlining 어플리케이션의 부속 기능인 유저간 채팅 기능을 개발한 프로젝트.
- Non-blocking IO 방식으로 작동하는 Spring Webflux-Netty 기반 프로젝트로 구현하여,<br>
  Flux 객체를 통해 새로운 채팅 데이터가 발생해도 끊임없이 데이터가 흘러들어올 수 있도록 함.
- DB 또한 같은 비동기 방식으로 동작하는 MongoDB를 사용하였다.
- 또한 별도의 설정이 필요한 웹소켓보다 간단하게 기존의 HTTP 프로토콜을 기반으로 최초연결 이후에 서버에서 <br>
  클라이언트로 데이터를 지속적으로 realtime streaming 할 수 있는 SSE 프로토콜을 적용, <br>
  DB에 채팅이 저장되는 event가 발생할 때마다 채팅 페이지를 초기화해 방금 전송된 채팅을 렌더링할 수 있도록 구현하였다.

## 기술 스택
    1) Server 
        - Spring Webflux & Netty 
        - AWS EC2 & Ubuntu
        - Docker
    2) Database 
        - MongoDB
    3) View
        - HTML & CSS & JavaScript

## 실행 화면
![image](https://user-images.githubusercontent.com/65891711/173414807-a176b8dc-8afa-4480-b695-f0972c248eb6.png)


:point_down: 전체 프로젝트 관련 정보는 하단 Github 링크에서 확인 <br>
:arrow_right: [Silverlining Project link](https://github.com/ashlovesliitea/silverlining-BE)