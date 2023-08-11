import "@/app/css/taskcontainer.css"
import "@/app/css/home.css"
import "@/app/css/container-primary.css";
import "@/app/css/button-primary.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { httpGet } from "@/app/core/http-request-contract";
import ContainerTask from "@/app/components/container-task/container.task";





export const taskModelSingle = { id: 1, title: "", description: "", datetime: "", priority: " "}
export const taskModel = [{id: 1, title: "",description: "",datetime: "", priority: ""}];

export default function HomeComponent() {
  const [tasks, setTasks] = useState([taskModel]);

  React.useEffect(() => {
      httpGet("tasks").then((data) => {
        setTasks(data)
        console.log(data)
      }).catch((error) => console.log(error))
    }, [])

  const results = tasks.map((task) => (
    <ContainerTask key={task.id} task={task} />
  ));  
  

        return (
            <div className="container login-bg">
              <div className="row main-wrapper"> 
                <div className="container-primary col-md-2 offset-md-2">
                  <div className="row">
                    <div className="jumbotron horizontal-center">
                      <div className="container">
                        {tasks.length > 0 ? (
                        

                        <div className="row tasks-container"> 
                            {results}
                          </div>
                        ) : (
                          <h1>Create Task</h1>
                        )}
                        
                        <Link href={"/task/create"} className="btn buttonPrimary col-md-14">Create Task</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

  
}
