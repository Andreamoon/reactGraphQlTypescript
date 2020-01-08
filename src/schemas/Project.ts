import { Field, Int, ObjectType } from "type-graphql";
import Task from "./Task";

@ObjectType()
export default class Project {
  @Field(type => Int)
  id: String;

  @Field()
  name: string;

  @Field(type => [Task])
  tasks: Task[];
}