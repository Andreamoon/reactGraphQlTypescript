import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  InputType,
  Field
} from "type-graphql";
import { projects, tasks, TaskData } from "../data";
import Task from "../schemas/Task";
import Project from "../schemas/Project";
import { type } from "os";

@InputType()
class TaskInput {
  @Field()
  id: number;

  @Field()
  title: String;
  @Field()
  completed: Boolean;

  @Field()
  project_id: number;
}

@Resolver(of => Task)
export default class {
  @Query(returns => [Task])
  fetchTasks(): TaskData[] {
    return tasks;
  }

  @Query(returns => Task, { nullable: true })
  getTask(@Arg("id") id: number): TaskData | undefined {
    return tasks.find(task => task.id === id);
  }

  @Mutation(returns => Task)
  markAsCompleted(@Arg("taskId") taskId: number): TaskData {
    console.log(taskId);
    const task = tasks.find(task => {
      return task.id === taskId;
    });
    if (!task) {
      throw new Error(`Couldn't find the task with id ${taskId}`);
    }
    if (task.completed === true) {
      throw new Error(`Task with id ${taskId} is already completed`);
    }
    task.completed = true;
    return task;
  }

  @Mutation(returns => [Task], { nullable: true })
  createTask(@Arg("options", () => TaskInput) options: TaskData) {
    const { id } = options;

    var index = tasks.findIndex(x => x.id == id);

    if (index === -1) {
      tasks.push(options);
    } else throw new Error(`Il task con id:  ${id} è gia esistente`);

    return tasks;
  }

  @FieldResolver()
  project(@Root() taskData: TaskData) {
    return projects.find(project => {
      return project.id === taskData.project_id;
    });
  }
}
