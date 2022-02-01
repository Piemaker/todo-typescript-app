import React from 'react';
import { Button, Col, Form } from "react-bootstrap";
import {ToDoType} from "../util";
import { nanoid } from 'nanoid'
// form as = "row" will make submit action not working
interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  todos : ToDoType[];
}
 const InputForm:React.FC<Props> = ({input,setInput, setTodos, todos}) => {
   const handleChange = (e: React.FormEvent) => {
     e.preventDefault();
     const target = e.target as HTMLInputElement;
     if(target){
     setInput(target.value);
     }
   };
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (input) {
       const todo = { id: nanoid(), todo: input, isDone: false };
       setTodos([...todos, todo]);
     }
   };
  return (
    <Form
      onSubmit={handleSubmit}
      className="justify-content-center d-flex mt-3"
    >
      <Form.Group as={Col} xs = "12" md="8" className="position-relative p-0">
        <Form.Control
          type="input"
          placeholder="enter your todo"
          className="text-center text-capitalize gradient-text "
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="outline-light"
          className="position-absolute  top-0 input_button "
          type="submit"
        >
          Save
        </Button>
      </Form.Group>
    </Form>
   
  );
};
export default InputForm;