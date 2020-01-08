
 import { Field, Int, ObjectType } from "type-graphql";
 import Project from "./Project";

 @ObjectType()
 export default class Task {
   @Field(type => Int)
   id: String;

   @Field()
   title: string;

   @Field(type => Project)
   project: Project;

   @Field()
   completed: boolean;
 }