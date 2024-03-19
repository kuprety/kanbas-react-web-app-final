import React, { useState } from "react";
import database from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import "./index.css";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./reducer";
import { KanbasState } from "../../store";

const { modules } = database;

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector((state: KanbasState) =>
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) =>
    state.modulesReducer.module);
  const dispatch = useDispatch();
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
              onClick={() => dispatch(addModule({ ...module, course: courseId }))} style={{marginRight:10}}>
              Add</button>
            <button onClick={() => dispatch(updateModule(module))} className="btn btn-secondary"  style={{marginRight:10}}>
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
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index} className="list-group-item wd-modules-container">




              <div className="wd-margin-bot-10">
                <FaEllipsisV className="me-2" />
                {module.name} | {module.description}
                <button
                  onClick={() => dispatch(setModule(module))} className="btn btn-light" style={{ marginLeft: 10 }}>
                  <FaPencilAlt size="1em" />

                </button>
                <button className="btn btn-dark" style={{ marginLeft: 10 }}
                  onClick={() => dispatch(deleteModule(module._id))}>
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