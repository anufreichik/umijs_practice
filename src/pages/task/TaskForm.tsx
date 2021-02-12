import React, { useEffect, useState } from "react";
import { connect, history } from "umi";
import { get } from "lodash";
import { ITask } from "@/pages/task/Tasks";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  TaskList: ITask[];
  updateTaskById:(payload:ITask)=>void;
  create:(payload:ITask)=>void;
}

function TaskForm(props: IProps) {
  console.log(props)
  const stateAction = get(props, "location.state", 'add');
  const stateActionName = get(props, "location.state", 'add')==='add'?'Save':'Update';
  const taskId = get(props, "match.params.taskId");
  const [task, setTask] = useState<ITask>({ _id: "", name: "", completed: false, status: "" });
  const [completed, setCompleted] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [action, setAction]=useState<string>('Save')

  useEffect(() => {
    const currentTask = props.TaskList.find((el: ITask) => el._id === taskId);
    if (currentTask) {
      setTask(currentTask);
      setCompleted(Boolean(currentTask.completed));
      setName(String(currentTask.name));
      setStatus(String(currentTask.status));
      setAction(stateAction);
    }

  }, []);

  const handleCheckBoxCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(Boolean(e.target.value))
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  };

  const handleSelectStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    if(action==='edit')
      props.updateTaskById({...task,completed:completed, status:status, name:name});
    else
      props.create({_id:uuidv4(), completed:completed, status:status, name:name})
    history.push(`/task`);
  };

  if (!task) return null;
  return (
    <div className="container align-content-center">
      <Form className="register-form" onSubmit={onFormSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Description"
            name="name"
            onChange={handleInputChange}
            defaultValue={name}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" size="sm" value={status} onChange={handleSelectStatusChange} name="status">
            <option value="progress">Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="completed">
          <Form.Check type="checkbox" label="Completed?"
                      name="completed"
                      onChange={handleCheckBoxCompleted}
                      defaultValue={String(completed)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          {stateActionName}
        </Button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  TaskList: state.Task.tasksList
});
const mapDispatchToProps = (dispatch: any) => ({
  updateTaskById:(payload:ITask)=>dispatch({type:'Task/updateById', payload}),
  create:(payload:ITask)=>dispatch({type:'Task/create', payload}),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);

