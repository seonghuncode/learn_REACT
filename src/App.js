import axios from "axios";
import React from "react";
import "./App.css";
import "./App.css"; //css연결 해주는 방법

import { Icon, Table } from "semantic-ui-react";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [todos, setTodos] = React.useState([]);

  //전체, 완료, 미완료 중 선택한 옵션을 담기 위한 변수(기본은 전체 보여 주기)
  const [selectShow, setSelectShow] = React.useState([
    {
      text: "",
      sort: "all",
    },
  ]);

  const getDate = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);

        //수정 버튼을 클릭하면 update값을 true/false로 주기 위해서 객체 안에 만들기
        const newTodos = [...todos].map((value) => {
          value.update = false;
          return value;
        });
        setTodos(newTodos);

        console.log(todos);
      })
      .catch(() => {
        alert("에러 입니다.");
      });
    console.log("안녕하세요");
    setLoading(false);
  };

  React.useEffect(() => {
    getDate();
    console.log(todos);
  }, []);

  //completed가 true면 체크박스 체크, false면 채크박스 해제 ==>completed값에 따라 완료, 미완료로 나타내기 가능
  const decideCheck = (checkedIndex, event) => {
    const cloneTodos = [...todos];
    cloneTodos[checkedIndex].completed = event.target.checked;
    // console.log(event.target.checked); ==> 클릭 하면 true, 클릭 해제 하면 false
    setTodos(cloneTodos);
    console.log(todos);
  };

  //전체 체크 or 해제 하는 기능 만들기
  const checkAll = (event) => {
    const cloneTodos = [...todos].map((value, index) => {
      value.completed = event.target.checked;
      return value;
    });
    setTodos(cloneTodos);
  };

  //삭제 기능 만들기
  const deleteFc = (clickIndex) => {
    const cloneTodos = [...todos].filter((value) => {
      console.log(value.index); //undefined로 나오는 이유????
      console.log(clickIndex);
      return value.id !== clickIndex;
    });
    setTodos(cloneTodos);
  };

  //수정 기능 만들기
  //1. 객체 안에 update를 추가 하기
  //2. 버튼을 눌렀을때 true, false로 하는 기능 만들기 -> title를 보여주는 부분에서 만약 update가 true일때만 input태그 아니면 제목을 그대로 보여주가 위해 만들었다.
  const modifyCheck = (modifyIndex, event) => {
    const cloneTodos = [...todos];
    cloneTodos[modifyIndex].update = true;
    setTodos(cloneTodos);
    console.log(todos);
  };

  //제목 수정 하는 기능 만들기 ==> 화면에서는 바뀌지 않았지만 todos에서는 바뀌었다.
  const modifyInput = (modifyIndex, event) => {
    const cloneTodos = [...todos];
    cloneTodos[modifyIndex].title = event.target.value;
    setTodos(cloneTodos);
  };

  //변경한 제목이 화면에서도 바뀔 수 있도록 엔터를 인식해서 변화하도록 하는 기능 추가
  //엔터를 감지 하는 방법으로는 form태그의 onSubmit이 있다. 새로고침이 되지 않도록 한후 -> 엔터를 치면 -> 모든 update값이 false로 바뀌면서 제목이 화면에 보여지게 하는 방법
  const checkEnter = (event) => {
    event.preventDefault();

    const cloneTodos = [...todos].map((value) => {
      value.update = false;
      return value;
    });
    setTodos(cloneTodos);
  };

  //그룹중 전체, 완료, 미완료 중 선택한 것에 대해 selectShow변수에 sort 부분을 해당 값으로 수정을 해주는 함수
  const showWhat = (event) => {
    const cloneTodos = [...selectShow];
    cloneTodos["sort"] = event.target.value;
    setSelectShow(cloneTodos);
    console.log(selectShow);
  };

  //검색어만 보이도록 하는 기능
  const searchFc = (event) => {
    const cloneTodos = [...selectShow];
    cloneTodos["text"] = event.target.value;
    setSelectShow(cloneTodos);
  };

  if (loading === true) {
    return (
      <div>
        <h1>로딩중입니다</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="search-box">
          <h3>검색</h3>
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력해 주세요"
            onChange={searchFc}
          />
          <select
            name="select"
            id="select"
            value={selectShow.sort}
            onChange={showWhat}
          >
            <option value="all">전체</option>
            <option value="complete">완료</option>
            <option value="incomplete">미완료</option>
          </select>
        </div>
      </div>

      <form onSubmit={checkEnter}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                체크박스
                <input type="checkbox" onClick={checkAll} />
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
                //여기서 해당 ture로 나오는 것들은 맨 아래 return을 타지 않고 걸러지기 때문에 출력하지 않을것을 if문에 넣어 위에서 true로 return해주면 된다.
                if (
                  selectShow.text !== "" &&
                  value.title.startsWith(selectShow.text) === false
                ) {
                  return true;
                }
                console.log(value.title.startsWith(selectShow.text));
                if (
                  selectShow.sort === "complete" &&
                  value.completed === false
                ) {
                  return true;
                } else if (
                  selectShow.sort === "incomplete" &&
                  value.completed === true
                ) {
                  return true;
                }

                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <input
                        type="checkbox"
                        checked={value.completed}
                        onChange={decideCheck.bind(this, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                      <div>
                        {value.completed === true ? (
                          <div>
                            {"완료"}
                            <Icon name="check circle" />
                          </div>
                        ) : (
                          "미완료"
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {value.update === true ? (
                        <input
                          type="text"
                          placeholder="수정할 값을 입력해 주세요."
                          onChange={modifyInput.bind(this, index)}
                        />
                      ) : (
                        value.title
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        type="button"
                        className="update-btn"
                        onClick={modifyCheck.bind(this, index)}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={deleteFc.bind(this, value.id)}
                      >
                        삭제
                      </button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </form>
    </>
  );
}

export default App;

//궁금증1
//서버에서 받아온 데이터가 기끔 코드를 수정, 추가 하고 저장 하면 todos안에 비어있는 현상이 생김 => useEffect가 한번만 실행되는데 코드가 잘못 되서 그러는 건지?
