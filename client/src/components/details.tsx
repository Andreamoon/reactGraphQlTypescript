
import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, } from '@apollo/react-hooks';

import { withRouter, RouteComponentProps } from "react-router";
import { useParams } from "react-router";
import gql from 'graphql-tag'
import { GetTask } from '../interfaces/interface'
import classNames from 'classnames';
import Flags from './flags'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
import IsEmpty from '../utils/is_empty'
import isEmpty from "../utils/is_empty";

interface taksItemDetails extends RouteComponentProps {
    id: String
}

const GETASKS = gql`
query getTask($id: Float!) {
    getTask(id: $id){
        title
      completed
       id
          project {
          name
}
    }
    
  }
`
const MARK_AS_COMPLETED = gql`
      mutation markAsCompleted($taskId: Float!) {
        markAsCompleted(taskId: $taskId) {
            title
            completed
         }
     }
`
const Details = (props: any) => {
    let { id } = useParams();
    const mounted = useRef();

    const { data: dataR, error: errorR, loading: landingR } = useQuery<GetTask>(
        GETASKS, { variables: { id: parseInt(id) } }
    );
    const [markAsCompleted, { error, data }] = useMutation<{ taskId: Number }>(MARK_AS_COMPLETED, {
        variables: { taskId: parseInt(id) },
    });

    if (data) console.log(data)
    if (error) setTimeout(() => { alert(error.message), location.reload() }, 1000)
    
    
    useEffect(() => {
        if (!mounted) {
            console.log(mounted)
        } else {
            // do componentDidUpate logic
            console.log(mounted)
            if(!isEmpty(dataR)) dataR.getTask.completed = true

        }
    })
    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        markAsCompleted()

    }


    return (
        <div className="my-3">
            <Link to='/'>
                <i className="fas fa-arrow-left"> Back to home</i>
            </Link>
            <Flags />
            {
                landingR ? (
                    <p>Loading ...</p>
                ) :
                    <div className="card card-body mb-3">
                        <div className="row">
                            <div className="col-md-9">
                                <h4 className="">
                                    Task :{' '}
                                    {id} {" "}
                                    <span
                                        className={classNames({
                                            'text-success': dataR.getTask.completed,
                                            'text-danger': !dataR.getTask.completed
                                        })}
                                    >
                                        {dataR.getTask.title}
                                    </span>
                                </h4>
                                <p>
                                    {dataR.getTask.project.name}
                                </p>
                            </div>
                            <div className="col-md-3">
                                <Button onClick={handleSubmit} disabled={dataR.getTask.completed}>Mark as completed</Button>
                            </div>
                        </div>
                    </div>


            }
        </div>

    )
}
export default withRouter(Details)