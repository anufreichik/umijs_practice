import React, { useEffect } from "react";
import { connect, history } from "umi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Button, Form } from "react-bootstrap";


export interface ITask {
  _id: string;
  name?: string;
  completed?: Boolean;
  status?: string;
}

interface IProps {
  TaskList: ITask[];
  getTasks: () => void;
  deleteTaskById:(id:string)=>void;
}

function Tasks(props: IProps) {
  useEffect(() => {
    //props.getTasks();
  }, []);

  const handleDelete=(id:string)=>{
      props.deleteTaskById(id);
  }

  const handleEdit=(id:string)=>{
      history.push({
       pathname: `/task/${id}`,
        state:'edit'
  });

  }
  const handleCreateNewClick = () => {
    history.push({
      pathname: `/task/${' '}`,
      state: 'add'
    });
  };

  if(!props.TaskList) return null;
  return (
    <div className='container justify-content-center'>
      <h2>Tasks</h2>
      <Button variant="secondary" onClick={handleCreateNewClick} className='mb-2'
      >
        + Add Task
      </Button>
      <table className="table table-dark table-striped table-hover">
        <caption>List of tasks</caption>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Completed</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          props.TaskList.map(el=>
              <tr key={el._id}>
                <th scope="row">{el._id}</th>
                <td>{el.name}</td>
                <td>{el.status}</td>
                <td>{el.completed?'completed':''}</td>
                <td>
                  <DropdownButton variant="secondary"   id="dropdown-item-button" title="..." className="e-caret-hide">
                    <Dropdown.Item as="button" onClick={()=>handleDelete(el._id)}>Delete</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>handleEdit(el._id)}>Edit</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            )
        }

        </tbody>
      </table>

    </div>
  );
}

const mapStateToProps = (state: any) => ({
  TaskList: state.Task.tasksList
});

const mapDispatchToProps = (dispatch: any) => ({
  getTasks: () => dispatch({ type: "Task/getTasks" }),
  deleteTaskById:(payload:string)=>dispatch({type:"Task/deleteById", payload}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
