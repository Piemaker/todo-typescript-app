import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "../src/App.css";
import InputForm from "./components/InputForm";
import ToDo from "./components/ToDo";
import { ToDoType } from "./util";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

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
  todos.forEach((todoItem,index) => {
    const { id, todo, isDone } = todoItem;
    const todoComponent = (
      <ToDo
        key={id}
        id={id}
        todo={todo}
        editTodos={editTodos}
        deleteTodo={deleteTodo}
        markTodo={markTodo}
        index = {index}
      ></ToDo>
    );
    if (isDone) {
    return  finishedTodos.push(todoComponent);
    } else {
      unfinishedTodos.push(todoComponent);
    }
  });
  const onDragEnd = (result : DropResult)=>{
    if(result.source && result.destination && result.source.droppableId !== result.destination.droppableId){
      console.log(result)
      markTodo(result.draggableId);
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <Droppable droppableId="unfinished-todos">
              {(provided, snapshot) => (
                <Col
                  md="6"
                  className={`mt-3 ${
                    snapshot.isDraggingOver && "border border-light"
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="py-5">
                    <h2 className="display 5 gradient-text text-center">
                      Unfinished
                    </h2>
                    {unfinishedTodos}
                  </div>

                  {provided.placeholder}
                </Col>
              )}
            </Droppable>
            <Droppable droppableId="finished-todos">
              {(provided, snapshot) => (
                <Col
                  md="6"
                  className={`mt-3 ${
                    snapshot.isDraggingOver && "border border-light"
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {" "}
                  <div className="py-5">
                    <h2 className="display 5 gradient-text text-center">
                      Finished
                    </h2>
                    {finishedTodos}
                  </div>
                  {provided.placeholder}
                </Col>
              )}
            </Droppable>
          </Row>
        </Container>
      </Container>
    </DragDropContext>
  );
};

export default App;
