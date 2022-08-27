import axios from "axios";
import React from "react";
import "./App.css";

// App : 컴포넌트(Component)
// 재사용성이 좋다
// element를 return한다

//필수 개념
//1. useState
//2. useEffect

//10일차 수업 내용 시작-------------------------------------------------------------------------------------
//[지난 시간 복습]
//const  [people, setPeople] = React.useState();
//useState() : 저장소라고 생각하면 된다
//setPeople은 people을 바꾸는 값
//리액트는 항상 디스터링 문법으로 위처럼 두개로 나누어 표기 한다.
//return할때 리액트 에서는 하나의 부모로 감싸져 있어야 한다(그렇지 않으면 오류가 발생한다.)  ==> 규칙1
//jsx == 리액트의 확장자

/*
function App() {
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
    //얕은 복사로 원본 데이터의 불변성을 지켜주어야 한다
    const newPeople1 = [...people1].filter((value) => {
      return value.age !== deleteAge1;
    });
    setPeople1(newPeople1);
    console.log(newPeople1);
  };

  return (
    <div>
      {people1.map((value, index) => {
        return <div key={index}>{value.name}</div>;
      })}
      <button onClick={회원삭제1}>삭제</button>
    </div>
  );
  //KEY값은 항상 최상위 부모에 있어야 한다 ==> 조건2

  //useEffect()하고 마지막에 ,[]넣어주면 처음에만 실행되고 이후로는 실행이 되지 않는다
  //==> $(document).ready(function(){})이랑 거의 같다고 생각.'
}
*/

// //본 수업 시작(10일차)-------------------------------------------------------------
/*
function App() {
  const [todos, setTodos] = React.useState([]);// 작성한 값들을 넣어두는 배열
  const [todoText, setTodoText] = React.useState(""); //우리가 입력한 값을 바꿀 수 있는 값이 todoText이다

  //엔터를 치면 아래 함수가 실행 된다.
  const handleSubmit = (event) => {
    event.preventDefault(); //form태그의 특성중 전송이 될때 새로고침 되는 것을 막는 역할을 한다
    // alert("하이");  잘 되는지 확인 하기
    //console.log(todoText); //todoText에서 입력한 값을 잘 가지고 있다
    //
    //위에서 가지고 온 값을 배열에 넣어준다
    const cloneTodos = [...todos]; //원래 있던 값을 복제
    cloneTodos.push({
      name: "kevin",
      todo: todoText,
      done: false,
    });
    setTodos(cloneTodos); //복제한 값을 todos 값을 바꾸어 준다
  };

  //삭제 : filter or findIndex를 사용하면 된다
  const deleteTodo = (paramIndex) => {
    // alert(paramIndex); //몇번째 값인지 가지고 왔다.
    const cloneTodos = [...todos];
    const newTodos = cloneTodos.filter((value, index) => {
      //원하는 것만 배열에 담을때 filter을 사용
      return index !== paramIndex; //다른 것만 주세요
    });
    console.log(cloneTodos[paramIndex]);
    console.log(newTodos);
    setTodos(newTodos);
  };
  //완료 기능 : 완료 되면 글자가 빨간색으로 변한다 속성값중 done을 사용(삼항 연산자를 써서 돌리면 된다)

  const completeTodo = (paramIndex) => {
    const cloneTodos = [...todos];
    // cloneTodos[paramIndex].done = true;
    cloneTodos[paramIndex].done = !cloneTodos[paramIndex].done;
    setTodos(cloneTodos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>TodoList</h3>
        <input
          type="text"
          value={todoText}
          onChange={(event) => {
            setTodoText(event.target.value); //변수로 선언해서 가지고 오는게 아니라 바로 안에서 변수를 만드는 방법
            // console.log(event.target.value);
          }}
        />
      </form>
      <ul>
        {todos &&
          todos.map((value, index) => {
            return (
              <li key={`todos-${index}`}>
                {value.todo}
                {value.done ? "완료" : "미완료"}
                <button onClick={completeTodo.bind(this, index)}>
                  {value.done ? "완료" : "미완료"}
                </button>
                <button onClick={deleteTodo.bind(this, index)}>삭제</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
  // html에서 자바스크립트 문법을 사용하고 싶은면 {}를 열고 안에 사용해야 한다
  //form태그를 넣으므로써 엔터를 누르면 새로고침이 된다(form태그의 특성 -> form태그가 전송이 되기 때문이다)
  //리액트에서는 카멜형식으로 특정 뒤에 대문자로 작성한다 ==> onSubmit
  //우리가 만든 변수를 태그 안에서 사용하고 싶으면 {}안에 적어야 한다
  //리액트 에서는 선택자를 사용 하지X?
  //input태그 안에 value값에 todoText를 넣어야 재렌더링 될때 값이 사라지지 않는다.
  //반복문을 돌릴때는 항상 중복되지 않는 키값을 넣어 주어야 한다 ==> index값은 중복 되지 않기에 index값으로 사용

  //개념-----------------------------------------------------------------------------------------------------------------------------------------------------
  //배열만 map이라는 함수가 있다 빈 값을 돌리면 에러가 난다(todos.map -> todos && todos.map(==undefined아닐때만 반복문을 타라는 의미 조건문이 된다) )
  //개념 설명
  // &&(조건문) :
  //console.clear();
  //const name = true;
  //console.log(name && '안녕하하세요');  //name이 true이면 안녕하세요 , null이면 빈값 (name에 어떤 값이라도 있으면 오른쪽을 출력, null이면 null값이 나온다.)
  //핵심
  //&& : 왼쪽에 있는 변수의 값이 있으면 오른쪽에 실행한 값이 나온다.
  //|| : 왼쪽에 있는 변수의 값이 없으면 오른쪽에 실행한 값이 나온다.
  //삼항연산자 : console.log(name ? '값이 있습니다' : '값이 없습니다.');  ==> name에 값이 있을때(true)일때 왼쪽이 출력 name이 조건이 성립하지 않을때 오른쪽 출력
  //개념-----------------------------------------------------------------------------------------------------------------------------------------------------
}

*/

/*
//10일차 수업 part2(ui프레임 워크 사용 하면서)/문제 기능 동작하게 풀어 보기----------------------------------------------------------------------------------------------
function App() {
  //setItems는 items를 바꿀 수 있는 유일한 함수라고 생각 하면 된다

  //순서는 state -> useEffect -> event함수 (중요도에 따라 두는게 좋다)
  const [items, setItems] = React.useState([
    {
      name: "고기",
      cost: 30000,
      basket: false,
    },
    {
      name: "양파",
      cost: 2000,
      basket: false,
    },
    {
      name: "마늘",
      cost: 1000,
      basket: false,
    },
    {
      name: "과자",
      cost: 2000,
      basket: false,
    },
    {
      name: "아이스크림",
      cost: 500,
      basket: false,
    },
    {
      name: "고기",
      cost: 30000,
      basket: false,
    },
  ]);
  const [sortType, setSortType] = React.useState("DESC");

  // //장바구시 총합을 구하는 기능 (추천 한지 않는 방법 state로 관리 하면 좋지 X
  //state값이 많아지면 나중에 복잡해진다
  // const [totalCost, setTotalCost] = React.useEffect(0);
  // React.useEffect(() => {
  //   console.log("items바구니가 바뀌었습니다.");
  //   let cost = 0;
  //   items.forEach((value) => {
  //     if (value.basket === true) {
  //       cost += value.cost;
  //     }
  //   });
  //   console.log(cost);
  //   setTotalCost(cost);
  // }, [items]); //items가 바뀔때 마다 실행 items에 의존하도록 한다.

  //추천 하는 방법(useState를 사용하지 않아도 되기 때문에 굳이 사용하지 않는다.)
  const totalCost = React.useMemo(() => {
    let cost = 0;
    items.forEach((value) => {
      if (value.basket === true) {
        cost += value.cost;
      }
    });
    return cost; //useMemo는 리턴을 꼭 해주어야 한다.
  }, [items]);

  //값을 바꾸고 setItems에 넣으면 자동으로 반영 된다.
  const addCart = (paramIndex) => {
    // alert(paramIndex); //해당 값을 잘 받았는지 확인 하기
    //1. 새로운 배열을 만든다
    //2. 복제한 배열에 paramIndex값을 횔용해서 basket을 true로 만든다
    //3. setItems안에 복제한 배열을 넣는다.
    //내 풀이
    // const cloneItems = [...items];
    // cloneItems.map((value, index) => {
    //   if (index === paramIndex) {
    //     return (value.basket = true);
    //   }
    // });
    // setItems(cloneItems);

    //강사님 풀이
    const cloneItems = [...items];
    cloneItems[paramIndex].basket = true;
    // console.log(cloneItems[paramIndex]);
    setItems(cloneItems);
  };

  const deleteCart = (paramIndex) => {
    const cloneItems = [...items];
    cloneItems[paramIndex].basket = false;
    setItems(cloneItems);
  };

  //중복 되는 함수를 하나로 -> 위의 deleteCart, addCart를 지우고 하나로 사용 가능
  const handleCart = (paramIndex) => {
    const cloneItems = [...items];
    //false면 true, true면 false
    cloneItems[paramIndex].basket = !cloneItems[paramIndex].basket;
    setItems(cloneItems);
  };

  //가격순으로 정렬하는 함수
  const sortItems = () => {
    const newItems = [...items].sort((a, b) => {
      if (sortType === "DESC") {
        return a.cost - b.cost;
      } else {
        return b.cost - a.cost;
      }
    });

    setItems(newItems);
    setSortType(sortType === "DESC" ? "ASC" : "DESC");
  };

  return (
    <div>
      <div>
        <h3>장바구니</h3>
        <ul>
          {items &&
            items.map((value, index) => {
              // continue
              if (value.basket === false) {
                return true;
              }

              return (
                <li key={`basket-item-${index}`} style={{ marginTop: 12 }}>
                  {value.name} 가격 : {value.cost}원
                  <button
                    onClick={deleteCart.bind(this, index)}
                    style={{ marginLeft: 12 }}
                  >
                    삭제
                  </button>
                </li>
              );
            })}
        </ul>
        <h4>장바구니 총 가격은 {totalCost}원 입니다.</h4>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <h3>쇼핑</h3>
          <button onClick={sortItems} style={{ marginLeft: 12, height: 50 }}>
            가격순 정렬
          </button>
        </div>
        <ul>
          {items &&
            items.map((value, index) => {
              if (value.basket === true) {
                return true;
              }
              return (
                <li key={`shop-item-${index}`} style={{ marginTop: 12 }}>
                  {value.name} 가격 : {value.cost}원
                  <button
                    onClick={addCart.bind(this, index)}
                    style={{
                      marginLeft: 12,
                    }}
                  >
                    장바구니 담기
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
  //리액트에서는 아래 처럼 속성을 추가 하고 변경한다.
  //class == className
  //style == style={{marginLeft:12,}}
  //onClick={addCart.bind(this, index)} ==> this는 보낼것 이름? , index는 보낼값을 의미
          }

  */

//프론트엔드4-3일차 수업 내용---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//지난 시간에 return에 공통되는 것 함수로 만들어 수정하는 코드

// App : 컴포넌트 (component)
// 재사용성이 쉽다
// @returns element

// === 필수개념 ===
// 1. useState
// - 불변성을 유지시켜야한다

// 2. useEffect
function App() {
  //
  //   state 맨위
  //   useEffect
  //   event 함수들
  //

  const [items, setItems] = React.useState([
    {
      name: "고기",
      cost: 30000,
      basket: false,
    },
    {
      name: "양파",
      cost: 2000,
      basket: false,
    },
    {
      name: "대파",
      cost: 1500,
      basket: false,
    },
    {
      name: "마늘",
      cost: 1000,
      basket: false,
    },
    {
      name: "과자",
      cost: 2000,
      basket: false,
    },
    {
      name: "아이스크림",
      cost: 500,
      basket: false,
    },
  ]);
  const [sortType, setSortType] = React.useState("DESC");
  // const [totalCost, setTotalCost] = React.useState(0);

  //
  //   의존 :
  //

  // React.useEffect(() => {
  //   let cost = 0;

  //   items.forEach((value) => {
  //     if (value.basket === true) {
  //       cost += value.cost;
  //     }
  //   });

  //   setTotalCost(cost);
  // }, [items]);

  const totalCost = React.useMemo(() => {
    let cost = 0;

    items.forEach((value) => {
      if (value.basket === true) {
        cost += value.cost;
      }
    });

    return cost;
  }, [items]);

  const handleCart = (paramIndex) => {
    const cloneItems = [...items];
    cloneItems[paramIndex].basket = !cloneItems[paramIndex].basket;
    setItems(cloneItems);
  };

  const sortItems = () => {
    //
    //     sort
    //

    const newItems = [...items].sort((a, b) => {
      if (sortType === "DESC") {
        return a.cost - b.cost;
      } else {
        return b.cost - a.cost;
      }
    });

    setItems(newItems);
    setSortType(sortType === "DESC" ? "ASC" : "DESC");
  };

  return (
    <div style={{ margin: 25 }}>
      <div>
        <h3>장바구니</h3>
        <ul>
          {items &&
            items.map((value, index) => {
              // continue
              if (value.basket === false) {
                return true;
              }

              // props 문법
              return (
                <ShopItemsList
                  value={value}
                  index={index}
                  handleCart={handleCart}
                />
              );
            })}
        </ul>
        <h4>장바구니 총 가격은 {totalCost}원입니다</h4>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <h3>쇼핑</h3>
          <button onClick={sortItems} style={{ marginLeft: 12, height: 50 }}>
            가격순 정렬
          </button>
        </div>
        <ul>
          {items &&
            items.map((value, index) => {
              if (value.basket === true) {
                return true;
              }

              return (
                <ShopItemsList
                  value={value}
                  index={index}
                  handleCart={handleCart}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}

//
//
//   props : {
//    value : 값,
//    index : 값,
//    handleCart : 값
//   }
//   @param {*} props
//   @returns
//

function ShopItemsList({ value, index, handleCart }) {
  return (
    <li key={`shop-item-${index}`} style={{ marginTop: 12 }}>
      {value.name} 가격 : {value.cost}원입니다
      <button
        onClick={handleCart.bind(this, index)}
        style={{
          marginLeft: 12,
        }}
      >
        장바구니 담기
      </button>
    </li>
  );
}

export default App;
