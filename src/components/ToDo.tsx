import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {  Col, Card, Form } from "react-bootstrap";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
interface Props {
  id: string;
  todo: string;
  editTodos: (id: string, value: string) => void;
  deleteTodo: (id: string) => void;
  markTodo: (id: string) => void;
  index : number;
}

const ToDo: React.FC<Props> = ({
  id,
  todo,
  editTodos,
  markTodo,
  deleteTodo,
  index
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const refContainer = useRef<HTMLInputElement>(null);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refContainer.current) {
      editTodos(id, refContainer.current.value);
      setIsEdit(false);
    }
  };
  const handleDelete = () => {
    deleteTodo(id);
  };
  const handleMark = () => {
    markTodo(id);
  };
  const todoItem = <Card.Text className="m-0  me-3">{todo}</Card.Text>;
  const edit = (
    <Form onSubmit={handleSubmit} className=" me-3">
      <Form.Group>
        <Form.Control
          className="gradient-text w-100"
          type="text"
          placeholder="Edit todo"
          ref={refContainer}
        />
      </Form.Group>
    </Form>
  );
  
  useEffect(() => {
    if (isEdit && refContainer.current) {
      refContainer.current.focus();
      refContainer.current.value = todo;
    }
  }, [isEdit,todo]);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card className="gradient-text card-hover" border="light" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Card.Body className="d-flex  align-items-center justify-content-evenly">
            <Col xs="6" md="7">
              {isEdit ? edit : todoItem}
            </Col>
            <div className="todo-buttons">
              <AiFillEdit className="text-warning" onClick={handleEdit} />
              <AiFillDelete className="text-danger" onClick={handleDelete} />
              <AiFillCheckCircle
                className="text-success"
                onClick={handleMark}
              />
            </div>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(ToDo);
