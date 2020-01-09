import * as React from "react";
import classNames from 'classnames';
import { useMutation, useQuery, } from '@apollo/react-hooks';

import { withRouter, RouteComponentProps } from "react-router";
import gql from 'graphql-tag'

const DELETE_TASKBY_ID = gql`
mutation deleteTaskById($taskId: Float!) {
  deleteTaskById(taskId: $taskId){
     title
    completed     
    }    
  }
`

const TaskItem = (props: any) => {
  const { task, deleteTask } = props
  const [deleteTaskById, { error, data }] = useMutation<{ taskId: Number }>(DELETE_TASKBY_ID, {
    variables: { taskId: task.id },
  });

  if (data) deleteTask(data)
  if (error) console.log(error)

  const onClick = (evt: any) => {
    evt.preventDefault();
    deleteTaskById()

  }

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4 className="">
            Task :{' '}
            {task.id} {" "}
            <span
              className={classNames({
                'text-success': task.completed,
                'text-danger': !task.completed
              })}
            >
              {task.title}
            </span>
          </h4>
          <p>
            {task.project.name}
          </p>
        </div>
        <div className="col-md-3">
          <span><i className="far fa-trash-alt" onClick={onClick}>{""}</i></span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(TaskItem)