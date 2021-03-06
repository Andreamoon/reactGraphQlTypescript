import * as React from "react";
import { useRef, useEffect, useState } from 'react'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import TaskItem from './taskItem'
import { FetchTasks } from '../interfaces/interface'
import Flags from './flags'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import Form from './form'
import isEmpty from "../utils/is_empty";
export const TASKS = gql`
{
    fetchTasks {
    id
    title
    completed
     project{
         name
         
    }
    
  }
}`


const Tasks = (props: any) => {

    const mountInput = useRef();

    const { loading, data, refetch } = useQuery<FetchTasks>(
        TASKS
    );
    const [count, setCount] = useState();
    const [task, deleteTask] = useState()

    useEffect(() => {
        if (!mountInput) {
            console.log(mountInput)
        } else {
            // do componentDidUpate logic
            refetch(count);
        }
    })

    if (!isEmpty(data)) console.log(data)

    return (
        <React.Fragment>
            <Flags />
            <Form setCount={setCount} />
            {
                loading ? (
                    <p>Loading ...</p>
                ) :
                    data.fetchTasks.map((el: any, key: any) => (
                        <Link key={key} to={`/${el.id}`} >
                            <TaskItem key={key} task={el} deleteTask={deleteTask} />
                        </Link>

                    ))

            }
        </React.Fragment>




    )
}


export default withRouter(Tasks)