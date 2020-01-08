import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FetchTasks } from '../interfaces/interface'
import isEmpty from '../utils/is_empty'
import gql from 'graphql-tag';
import { TaskInput } from '../interfaces/interface'
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useInput } from '../hooks/input-hook';
import { TASKS } from './tasks'


const CREATE_TASK = gql`
  mutation createTask($options: TaskInput!) {
    createTask(options: $options) {
      id,
      title,
      completed,
      project{
         name
     }
    }
  }
`;


const InputForm = (props: any) => {


  const { value: id, bind: bindid, reset: resetid } = useInput('');
  const { value: title, bind: bindtitle, reset: resettitle } = useInput('');
  const [completedtype] = useState<any>([{ "Completed": true }, { "Not Completed": false }])
  const [completed, setCompleted] = useState(true)
  const [projectType] = useState(["Learn React Native", "Workout"])
  const [project_id, setPropjectId] = useState(1)

  const [createTask, { error, data, loading }] = useMutation<{ options: TaskInput }>(CREATE_TASK, {
    variables: { options: { id: parseInt(id), title, completed, project_id } },
  });

  if (error) setTimeout(() => { alert(error.message), location.reload() }, 1000)
  if (data) console.log(data)


  let handleChange = (e: any) => {
    if (!Object.values(completedtype[e.target.value]).find(el => el === false || true)) {
      setCompleted(false)
    } else {
      setCompleted(true)
    }
  };

  const handleProjectTypeChange = (e: any) => {

    console.log(projectType[e.target.value])
    if (projectType[e.target.value] === "Learn React Native") {
      setPropjectId(1)

    } else {
      setPropjectId(2)
    }
  }




  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    createTask()

    resetid();
    resettitle()
  }
  return (
    <Form >
      <FormGroup>
        <Label for="id" hidden>Id</Label>
        <Input type="text" {...bindid} placeholder="id" />
      </FormGroup>
      {' '}
      <FormGroup>
        <Label for="examplePassword" hidden>Password</Label>
        <Input name="title" id="title" placeholder="title" value={title}
          {...bindtitle} />
      </FormGroup>
      <FormGroup >
        <Input type="select" onChange={handleChange} >
          <option value={0} >
            {"Completed"}
          </option>
          <option value={1} >
            {"Not Completed"}
          </option>

        </Input >
      </FormGroup>
      <FormGroup>
        <Input type="select" onChange={handleProjectTypeChange}

        >
          <option value={0}>
            {"Learn React Native"}
          </option>
          <option value={1}>
            {"Workout"}
          </option>
        </Input>
      </FormGroup>
      {' '}
      <Button onClick={handleSubmit} disabled={isEmpty(title)}>Submit</Button>
    </Form>

  );


}

export default InputForm;