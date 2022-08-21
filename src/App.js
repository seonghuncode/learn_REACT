import React from "react";
import "./App.css";

// App : 컴포넌트(Component)
// 재사용성이 좋다
// element를 return한다

//필수 개념
//1. useState
//2. useEffect

function App() {
  /* 

  //데이터를 바꾸면 html은 자동으로 반영 된다

  // const number = React.useState(0);
  //number은 화면에 보여주는 값, setNumber은 number을 변경할 수 있는 값이라고 생각
  let [number, setNumber] = React.useState(0);
  console.log(number, setNumber); //setNumber의 역할은 닶을 바꿀 수 있다.
  //0번째 내가 넣은 값, 1:

  const 증가 = () => {
    setNumber((number += 1));
  };

  const 감소 = () => {
    setNumber((number -= 1));
  };

  return (
    <div>
      숫자 : {number}
      <button onClick={증가}>증가</button> <button onClick={감소}>감소</button>
    </div>
  );

  */
  /*

  //예시2번 객체의 경우
  const [people, setPeople] = React.useState({
    name: "kevin",
    age: 20,
  });

  const copyPeople = { ...people };

  //불변성을 항상 지켜주어야 한다 state값은 그냥 두어야 한다
  const 증가2 = () => {
    //오류1
    // people.age += 1; //불변성 침해로 안된다 대놓고 1을 증가 시켜주면 안됨
    //오류2
    //const copyPeople = people; //원래 있던 값은 변하면 안된다
    //shallow copy를 사용 --> 비로서 오류가 나지 않는다.(고유한 값을 침해 하지 않는다
    copyPeople.age += 1;

    //21이 된다.
    setPeople(copyPeople);
    console.log(copyPeople);
  };

  const 감소 = () => {
    copyPeople.age -= 1;

    setPeople(copyPeople);
    console.log(copyPeople);
  };

  return (
    <div>
      나이 : {copyPeople.age}
      <button onClick={증가2}>증가</button> <button onClick={감소}>감소</button>
    </div>
  ); //데이터를 바꾸면 html은 자동으로 반영 된다


  */
  /*

  //예시3 배열의 경우
  const [people1, setPeople1] = React.useState([
    {
      name: "길동",
      age: 15,
    },
    {
      name: "미순",
      age: 20,
    },
    {
      name: "영지",
      age: 23,
    },
  ]);

  const 회원삭제 = () => {
    const deleteAge = 20;
    const newPeople = [...people1].filter((value) => {
      //스프레이드 문법으로 해주는 습관을 들이는 것이 좋다 ==. 불변성을 침해하지 않기 위해
      return value.age !== deleteAge;
    });
    console.log(newPeople);
    setPeople1(newPeople);
  };

  // return할때 key값을 주어야 한다 key값은 고유한 값으로 해야 한다
  // 키를 주는 이유는
  return (
    <div>
      {people1.map((value, index) => {
        return <div key={index}>{value.name}</div>;
      })}
      <button onClick={회원삭제}>삭제</button>
    </div>
  );


  */
  /*
  //다른 예시?
  const [people1, setPeople1] = React.useState([
    {
      name: "길동",
      age: 15,
    },
    {
      name: "미순",
      age: 20,
    },
    {
      name: "영지",
      age: 23,
    },
  ]);

  const 회원삭제1 = () => {
    const deleteAge1 = 20;

    const newPeople1 = [...people1].filter((value) => {
      return value.age !== deleteAge1;
    });
    setPeople1(newPeople1);
    console.log(newPeople1);
  };

  console.log("===============t시작===================");

  //useEffect사용 예시
  React.useEffect(() => {
    console.log("괄호 사용");
  }, []); //괄호를 적으면 초기 한번만 나오고 지우면 값이 변할때 마다 계속 나온다
  //,[]를 지우면 똑같이 나온다. 하지만 빈괄호를 사용하면 react가 실행되면 한번 나오고
  //지우면 로드 될때마다 계속 나온다. 지울경우 아래 처럼 차이가 있다.
  //state값(people)이 바뀌면 제 렌더링 된다(태그들을 지우고 다시 그려서 띄운다
  //제렌더링 : 다시 html태그를 그려주는 것
  //ajax에서 데이터를 불러 올때 빈괄호를 사용한다(맨처음 한번만 실행된느 차이)
  //($(document).ready(function{}))이랑 비슷하다고 생각 하면 된다
  //괄호 안에 값을 넣으면 해당 값이 바뀔때 마다 재실행 한다(해당 함수를)
  //비어있으면 처음 딱 한번만 실행, [people]를 넣으면 people값이 바뀔때 마다 재실행

  React.useEffect(() => {
    console.log("괄호 사용X");
  });

  console.log("삭제, console.log()");
  console.log("===============끝===================");

  return (
    <div>
      {people1.map((value, index) => {
        return <div key={index}>{value.name}</div>;
      })}
      <button onClick={회원삭제1}>삭제</button>
    </div>
  );
  */
  //위의 내용은 9일차 수업 내용 ------------------------------------------------------------------------------
}

export default App;
