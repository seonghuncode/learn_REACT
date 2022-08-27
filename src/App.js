import axios from "axios";
import React from "react";
import "./App.css";

//프론트엔드4-3일차 수업-------------------------------------------------------------------------

function App() {
  const getData = async () => {
    //jaquery async : false(동기) : 위에서 아래로 흐르는 것 개발자가 유추가능한 것
    //자바스크립트 에서 비동기를 어떻게 동기로 바꾸나??
    //axio는 비동기 인데 동기로 바꾸기 위해서는 함수 앞에 async를 적어주고 axios앞에 await을 적어주면 된다
    //async, awail은 짝꿍이다
    //async awail : 이게 제일 간단하고 보기 쉬운 방법이다(callback, generator방법이 있는데 어렵다)
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        //성공하면 then을 실행
        console.log(response.data);
      })
      .catch(() => {
        //실패하면 catch를 실행
        console.log("error");
      }); //서버주서를 적어 준다
    console.log("안녕하세요");
  };

  React.useEffect(() => {
    // alert("안녕");
    getData();
  }, []);
}

export default App;
