import * as React from "react";
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from "react-router";

// import { Link } from 'react-router-dom';

const TaskItem = (props: any) => {
  const { task } = props

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

        </div>
      </div>
    </div>
  )
}

export default withRouter(TaskItem)