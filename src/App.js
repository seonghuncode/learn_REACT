import axios from "axios";
import React from "react";
import "./App.css";
import "./App.css"; //css연결 해주는 방법
//프론트엔드4-3일차 수업-------------------------------------------------------------------------

import { Icon, Table } from "semantic-ui-react";

//1.조건부 렌더링
//2. props를 통해 컴포넌트 한테 데이터를 전달
//3. React.memo
//4. React.useCallback

function App() {
  const [loading, setLoadind] = React.useState(true); //아래서 반복문을 돌릴때 처음 todos에 값이 없어서 비는 시간을 로딩기능으로 사용하기 위해 만듬(하지만 아직 빠르기 때문에 볼 수 없다.)
  const [todos, setTodos] = React.useState([]);

  //all: 전체 complete: 완료 incomplete: 미완료 [박스 부분에 대한 코드]
  const [search, setSearch] = React.useState({
    text: "",
    select: "all",
  });

  //검색 - 검색창에 대한 코드
  //1. onChange Event 넣기
  //2. search.text = event.target.value
  //3. return 조건 걸기 ()
  //참고 : javacript startwith 구글링

  const getData = async () => {
    //jaquery async : false(동기) : 위에서 아래로 흐르는 것 개발자가 유추가능한 것
    //자바스크립트 에서 비동기를 어떻게 동기로 바꾸나??
    //axios는 비동기 인데 동기로 바꾸기 위해서는 함수 앞에 async를 적어주고 axios앞에 await을 적어주면 된다
    //async, await은 짝꿍이다
    //async await : 이게 제일 간단하고 보기 쉬운 방법이다(callback, generator방법이 있는데 어렵다)
    //const getData = () => {axios}라고 작성하고 사용하게 되면 아래 console.log의 안녕하세요가 먼저 실행된는 것을 볼 수 있다. 비동기
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        //위의 주소에 있는 data이다
        //성공하면 then을 실행(호출)
        setTodos(response.data); //todos안에 response 데이터가 들어 간다(서버에서 가지고 온 데이터)
        console.log(response.data);

        // //update 객체 넣기 방법1(객체에 update추가 하기)
        // const todos = response.data;
        // for (let i = 0; i <= todos.length - 1; i++) {
        //   console.log(i);
        //   todos[i].update = false;
        // }
        //update에 객체 넣기 방법2
        const newTodos = todos.map((value) => {
          value.update = false;
          return value;
        });
        console.log(newTodos);
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
  }, []); //getData()가 실행 되기 전까지 로딩중 입니다.  실행후에는 해당 기능 실행

  //
  const changeCheckbox = (checkedIndex, event) => {
    // alert(event.target.checked); //항상 확인 하면서 잘 되는지 확인하고 다음으로 넘어가기
    //alert(checkedIndex)
    // console.log(todos[checkedIndex]); //
    const cloneTodos = [...todos];
    cloneTodos[checkedIndex].completed = event.target.checked; //alert or console.log로 찍어 보기 빈 것을 클릭하면 true를 체크 되어 있는 것을 클릭 하면 false를 리턴한다
    console.log(event.target.checked);
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

  // //삭제 기능 : 내 풀이
  // const deleteTodo = (paramIndex) => {
  //   const cloneTodos = [...todos];
  //   const result = cloneTodos.filter((value, index) => {
  //     return index !== paramIndex;
  //   });
  //   setTodos(result);
  // };

  //삭제 기능 : 강사님 풀이
  const deleteTodo = (clickedId) => {
    const cloneTodos = [...todos].filter((value) => {
      return value.id !== clickedId;
    });
    setTodos(cloneTodos);
  };

  //수정 기능 만들기
  const showUpdate = (clickedIndex) => {
    const newTodos = [...todos].map((value, index) => {
      value.update = index === clickedIndex ? true : false;
      return value;
    });
    setTodos(newTodos);
  };

  const changeTitle = (clikedIndex, event) => {
    console.log(clikedIndex, event);
    const cloneTodos = [...todos];
    cloneTodos[clikedIndex].title = event.target.value;
    setTodos(cloneTodos);
  };

  const updateSubmit = (event) => {
    event.preventDefault(); //페이지 새로고침을 막아줌
    const newTodos = [...todos].map((value) => {
      value.update = false;
      return value;
    });
    setTodos(newTodos);
  };

  //검색 기능(박스 부분)
  const changeSelect = (event) => {
    const cloneSearch = { ...search };
    cloneSearch["select"] = event.target.value;
    setSearch(cloneSearch);
  };

  //검색 기능(검색창 부분)
  const changeInput = (event) => {
    const cloneSearch = { ...search };
    cloneSearch["text"] = event.target.value;
    setSearch(cloneSearch);
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
    //엔터를 감지 하기 위해서 form태그 속성중 onSubmit을 사용 하기 위해
    //만들었다.
    /*반복문을 돌지 않고 한법만 돌아야 하는 것들만 반복문 밖에
      빼놓았다. */

    <div>
      <div className="search-box">
        <h3>검색</h3>
        <input
          className="search-input"
          onChange={changeInput}
          value={search.text}
        />
        <select onChange={changeSelect} value={search.select}>
          <option value="all">전체</option>
          <option value="complete">완료</option>
          <option value="incomplete">미완료</option>
        </select>
      </div>
      <form onSubmit={updateSubmit}>
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
              <Table.HeaderCell>수정/삭제</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {todos &&
              todos.map((value, index) => {
                console.log(search.select);

                // console.log(value.title.startsWith(search.text), value.title);
                if (
                  search.text !== "" &&
                  value.title.startsWith(search.text) === false
                ) {
                  return true;
                }

                if (search.select === "complete" && value.completed === false) {
                  return true;
                } else if (
                  search.select === "incomplete" &&
                  value.completed === true
                ) {
                  return true;
                }
                //이 조건문이면 아래 반복문을 타지 않고 여기서 끝난다

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
                      <Table.Cell>
                        {value.update === true ? (
                          <input
                            type="text"
                            value={value.titel}
                            onChange={changeTitle.bind(this, index)}
                          />
                        ) : (
                          value.title
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <button
                          type="button"
                          className="update-btn"
                          onClick={showUpdate.bind(this, index)}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={deleteTodo.bind(this, value.id)}
                        >
                          삭제
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  </React.Fragment>
                );
              })}
          </Table.Body>
        </Table>
      </form>
    </div>
  );
}

export default App;

//프론트앤드4-4 수업 내용(22.08.28)
//수정, 삭제 기능 추가
//===수정 화면 구현===
//1. update라는 값을 false로 해서 객체에 넣어 주기
//2. 수정을 눌렀을때 해당 update만 true로 만들기 ==> onClick={updateTodo.bind(this,index)}이벤트 넣어 주기
//3. updateTodo 구현 해주기
//===수정 구현===
//1. input에 onChange =>        (변화할때 마다 실행 돤다)

//===삭제===
//filter사용 or delete사용 (자바스크립트 delete 구글링)

//+ 검색기능 만들기
