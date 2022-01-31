import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "../src/App.css";
import InputForm from "./components/InputForm";
import ToDo from "./components/ToDo";
import { ToDoType } from "./util";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const editTodos = (id: string, value: string): void => {
    let copy = todos.map((todoItem) => {
      if (todoItem.id !== id) {
        return todoItem;
      } else {
        todoItem.todo = value;
        return todoItem;
      }
    });
    setTodos(copy);
  };
  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todoItem) => todoItem.id !== id));
  };
  const markTodo = (id: string): void => {
    let copy = todos.map((todoItem) => {
      if (todoItem.id !== id) {
        return todoItem;
      } else {
        todoItem.isDone = !todoItem.isDone;
        return todoItem;
      }
    });
    setTodos(copy);
  };
  let finishedTodos : (JSX.Element | undefined)[] = [];
  let unfinishedTodos: (JSX.Element | undefined)[] = [];
  todos.map((todoItem) => {
    const { id, todo, isDone } = todoItem;
    const todoComponent = (
      <ToDo
        key={id}
        id={id}
        todo={todo}
        editTodos={editTodos}
        deleteTodo={deleteTodo}
        markTodo={markTodo}
      ></ToDo>
    );
    if (isDone) {
    return  finishedTodos.push(todoComponent);
    } else {
      unfinishedTodos.push(todoComponent);
    }
  });
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col>
          <h1 className="display-5 text-center color-white text-capitalize gradient-text font-weight-bold">
            Todo App
          </h1>
        </Col>
      </Row>
      <Row>
        <InputForm
          input={input}
          setInput={setInput}
          setTodos={setTodos}
          todos={todos}
        ></InputForm>
      </Row>
      <Container>
        <Row className="mt-3">
          <Col md="6" className="mt-3">
            <h2 className="display 5 gradient-text text-center">Unfinished</h2>
            {unfinishedTodos}
          </Col>

          <Col md="6" className="mt-3">
            <h2 className="display 5 gradient-text text-center">Finished</h2>
            {finishedTodos}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default App;
