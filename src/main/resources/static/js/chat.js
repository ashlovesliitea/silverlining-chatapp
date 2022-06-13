//한 페이지에는 (1,이지윤,1) 다른페이지에는 (5, 이종혁,1) 넣으면 테스트 데이터 확인 가능
const searchParams=new URLSearchParams(location.search);


let userIdx=searchParams.get('user-idx') //채팅방 조회 api로 세개 다 넘어올 예정-> prompt는 사용하지 않고 대체할 것
let userName=searchParams.get('user-name'); //userIdx, userName : 자기 자신 회원 idx, 이름
let roomNum=searchParams.get('room-num') // 채팅방 번호
let otherName=searchParams.get('other-name')//이건 채팅방 목록 조회 api에서 넘어옵니다
console.log(userIdx)

document.querySelector("#username").innerHTML = `${otherName}님과 채팅중입니다.`;
//SSE 연결 - DB에 새로운 채팅 내역이 들어올때마다 event 발생 (초기화)
let eventSite= "http://43.200.81.158/app/chats"
const eventSource= new EventSource(`${eventSite}/chatrooms/${roomNum}`);
//채팅내역: http://3.37.86.115/app/chats/chatrooms/${roomNum} 으로 조회할것
// 계속 데이터가 흘러들어오므로 postman에서 테스트 X, 그냥 url 그대로 접속



eventSource.onmessage=(event)=>{
    const data=JSON.parse(event.data);
    //상대방으로부터 메세지가 전송되는 이벤트가 발생하면 DB에 저장된 데이터를 불러온다.
    if(data.sender_idx==userIdx){ //전송자가 내가 아니면 다른사람이므로 반대쪽에 렌더링하면 됨
        //파란박스 (내가 보낸 메세지)
        initMyMessage(data);
    }
    else{
        //회색박스 (상대방이 보낸 메세지)
        initYourMessage(data);
    }


}

function getSendMsgBox(data) {

    let md = data.createdAt.substring(5, 10)
    let tm = data.createdAt.substring(11, 16)
    convertTime = tm + " | " + md
    //내가 입력한 채팅 박스 생성하기
    return `
    <div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertTime} / <b>${data.sender_name}</b> </span>
    </div>
    `;
}

function getReceivedMsgBox(data) {

    let md = data.createdAt.substring(5, 10)
    let tm = data.createdAt.substring(11, 16)
    convertTime = tm + " | " + md
    //상대편에서 보낸 채팅 박스 생성하기
    return `
    <div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertTime} / <b>${data.sender_name}</b></span>
    </div>
    `;
}

//최초 채팅방 로드시 이전 DB 저장 내역 불러오며 초기화

function initMyMessage(data){
    //내가 보낸 메세지 초기화
    let chatBox= document.querySelector("#chat-box");

    let chatOutGoingBox =document.createElement("div");
    chatOutGoingBox.className="outgoing_msg";

    chatOutGoingBox.innerHTML=getSendMsgBox(data);
    chatBox.append(chatOutGoingBox);
    document.documentElement.scrollTop = document.body.scrollHeight;

}

function initYourMessage(data){
    //상대 쪽으로부터 메세지가 전송되면 DB로부터 불러옴
    let chatBox= document.querySelector("#chat-box");

    let chatReceivedBox =document.createElement("div");
    chatReceivedBox.className="received_msg";

    chatReceivedBox.innerHTML=getReceivedMsgBox(data);
    chatBox.append(chatReceivedBox);
    document.documentElement.scrollTop = document.body.scrollHeight;
}


//AJAX로 채팅 메세지 전송

async function newChat(){
    //DB에 insert하면 자동으로 event가 발생하면서 chatroom의 다른 상대방에게 보내짐 (다중 채팅도 가능)

    let msgInput=document.querySelector("#chat-outgoing-msg");


    let date=new Date();
    let now= date.getHours()+":"+date.getMinutes()+" | "+date.getMonth()+"- "+date.getDate();

    let chat={
        sender_idx:userIdx,
        sender_name:userName,
        room_num:roomNum,
        msg: msgInput.value
    };

    fetch(`${eventSite}`,{
        method:"post",//http post 메소드 (새로운 데이터를 write할때 사용)
        body:JSON.stringify(chat),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }

    });

    msgInput.value="";
}

//채팅 전송 버튼 누를 시
document.querySelector("#chat-send").addEventListener("click",()=>{
    newChat();
})


//enter 누를 시
document.querySelector("#chat-outgoing-msg").addEventListener("keydown",(e)=>{
    if(e.keyCode==13){
        newChat();
    }
})