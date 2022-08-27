import axios from "axios";
import React from "react";
import "./App.css";

//프론트엔드4-3일차 수업-------------------------------------------------------------------------

import { Icon, Table } from "semantic-ui-react";

//1.조건부 렌더링
//2. props를 통해 컴포넌트 한테 데이터를 전달
//3. React.memo
//4. React.useCallback

function App() {
  const [loading, setLoadind] = React.useState(true);
  const [todos, setTodos] = React.useState([]);
  const getData = async () => {
    //jaquery async : false(동기) : 위에서 아래로 흐르는 것 개발자가 유추가능한 것
    //자바스크립트 에서 비동기를 어떻게 동기로 바꾸나??
    //axio는 비동기 인데 동기로 바꾸기 위해서는 함수 앞에 async를 적어주고 axios앞에 await을 적어주면 된다
    //async, awail은 짝꿍이다
    //async awail : 이게 제일 간단하고 보기 쉬운 방법이다(callback, generator방법이 있는데 어렵다)
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        //위의 주소에 있는 data이다
        //성공하면 then을 실행(호출)
        setTodos(response.data); //todos안에 response 데이터가 들어 간다(서버에서 가지고 온 데이터)
        // console.log(response.data);
      })
      .catch(() => {
        //실패하면 catch를 실행
        console.log("error");
      }); //서버주서를 적어 준다
    setLoadind(false);
    console.log("안녕하세요");
  };

  React.useEffect(() => {
    // alert("안녕");
    getData();
  }, []);

  //
  const changeCheckbox = (checkedIndex, event) => {
    // alert(event.target.checked); //항상 확인 하면서 잘 되는지 확인하고 다음으로 넘어가기
    //alert(checkedIndex)
    // console.log(todos[checkedIndex]); //
    const cloneTodos = [...todos];
    cloneTodos[checkedIndex].completed = event.target.checked; //alert or console.log로 찍어 보기 빈 것을 클릭하면 true를 체크 되어 있는 것을 클릭 하면 false를 리턴한다
    setTodos(cloneTodos);
  };
  //
  const checkedAll = (event) => {
    const newTodos = [...todos].map((value, index) => {
      value.completed = event.target.checked;
      return value;
    });
    setTodos(newTodos);
  };

  if (loading === true) {
    return (
      <div>
        <h1>로딩중 입니다.</h1>
      </div>
    );
  }

  //Step1 문제
  //1. 체크박스에 이벤트 넣기 => onChange (카멜형식으로 만들어 준다)
  //[리엑트 에서능 항상 카멜 표기법 ex myname(X) -> myNmae(O)]
  //2. event라는 매개변수를 받을 수 있다 (event.target.checked === ture면 체크 된 것)
  //3. 내가 선택한 녀석의 index를 알아내야 한다(해당 index만 변경 하기 위해서)
  //4. todos[베열] => objrct[객체].completed =>얘를 바꾸어 주어야 한다 true or false로 (체크하는 index를 알아야 해당 index만 변경 가능 하다)

  //Step2 문제
  //맨 상단의 체크 박스를 클릭 하면 전체 선택 or 전체 해제 되게 하기

  return (
    /*반복문을 돌지 않고 한법만 돌아야 하는 것들만 반복문 밖에 빼놓았다. */
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              체크박스
              <input type="checkbox" onChange={checkedAll} />
            </Table.HeaderCell>
            <Table.HeaderCell>번호</Table.HeaderCell>
            <Table.HeaderCell>상태</Table.HeaderCell>
            <Table.HeaderCell>제목</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos &&
            todos.map((value, index) => {
              return (
                /* 최상단 부모가 하나 이여야 하기 때문에 <React.Fragment key={index}  ==> 쓸모 없는 부모를 만들어 줄때 사용한다>로 감싼 것 이다, 반복문은 항상 키가 있어야 한다
                키값을 주지 않아도 될때는 <>로만 최상단 부모로 만들어 주어도 된다 하지만 여기서는 키값이 필요*/
                <React.Fragment key={index}>
                  <Table.Row>
                    <Table.Cell>
                      <input
                        type="checkbox"
                        checked={value.completed}
                        onChange={changeCheckbox.bind(this, index)} //this하고 넘겨주고 싶은 값을 적어 준다
                      />
                    </Table.Cell>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                      {/* {value.completed ? "완료" : "미완료"} 아래로 변경 마크 넣어 주기 */}
                      {value.completed === true ? (
                        <>
                          {"완료"}
                          <Icon name="checkmark" />
                        </>
                      ) : (
                        "미완료"
                      )}
                    </Table.Cell>
                    <Table.Cell>{value.title}</Table.Cell>
                  </Table.Row>
                </React.Fragment>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default App;
