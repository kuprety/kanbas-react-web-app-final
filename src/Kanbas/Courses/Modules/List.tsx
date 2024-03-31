import React, { useEffect, useState } from "react";
import database from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import "./index.css";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteModule,
  addModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import * as client from "./client";
import { createModule, findModulesForCourse } from "./client";


const { modules } = database;

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector((state: any) =>
    state.modulesReducer.modules);
  const module = useSelector((state: any) =>
    state.modulesReducer.module);
  const dispatch = useDispatch();
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };
  useEffect(() => {
    findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);
  const handleAddModule = () => {
    createModule(courseId, module).then((module : any) => {
      dispatch(addModule(module));
    });
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <>
      {
        <div className="d-flex">
          <div>
            <button className="module-button" type="button">Collapse All</button>
          </div>
          <div>
            <button className="module-button" type="button">View Progress</button>
          </div>
          <div>
            <select className="module-select">
              <option value="PUBLISH">Publish All</option>
              <option value="UNPUBLISH">Unpublish All</option>
            </select>
          </div>
          <div>
            <button className="module-button" style={{ backgroundColor: "rgb(206, 0, 0)", color: "white", border: "1px solid rgb(206, 0, 0)" }}>+ Module</button>
          </div>
          <div>
            <button className="module-button"><FaEllipsisV /></button>
          </div>

        </div>
      }
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <li className="list-add-module">
            <button className="btn btn-primary"
          onClick={handleAddModule}>
          Add</button>
            <button onClick={handleUpdateModule} className="btn btn-secondary"  style={{marginRight:10}}>
              Update
            </button>

            <input value={module.name} className="form-control"
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
            />
            <textarea value={module.description} className="form-control"
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              } style={{marginLeft:10}}
            />
          </li>
        </li>

        {moduleList
          .filter((module : any) => module.course === courseId)
          .map((module : any, index : any) => (
            <li key={index} className="list-group-item wd-modules-container">




              <div className="wd-margin-bot-10">
                <FaEllipsisV className="me-2" />
                {module.name} | {module.description}
                <button
                  onClick={() => dispatch(setModule(module))} className="btn btn-light" style={{ marginLeft: 10 }}>
                  <FaPencilAlt size="1em" />

                </button>
                <button className="btn btn-dark" style={{ marginLeft: 10 }}
              onClick={() => handleDeleteModule(module._id)} >
                  Delete
                </button>
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {module._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: any, index: number) => (
                    <li className="list-group-item wd-green-left-border" key={index}>
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );

}


export default ModuleList;