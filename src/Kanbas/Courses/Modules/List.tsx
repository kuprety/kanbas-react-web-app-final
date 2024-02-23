import React, { useState } from "react";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import "./index.css"; 

function ModuleList() {
  const { courseId } = useParams();
  console.log(modules);
  console.log(courseId)
  const modulesList = modules.filter((module) => module.course === courseId);
  console.log(modulesList);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
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
          <select className="module-select" id="select-publishing">
            <option value="PUBLISH">Publish All</option>
            <option value="UNPUBLISH">Unpublish All</option>
          </select>
        </div>
        <div>
          <button className="module-button" style={{backgroundColor: "rgb(206, 0, 0)", color:"white", border:"1px solid rgb(206, 0, 0)"}}>+ Module</button>
        </div>
        <div>
          <button className="module-button"><FaEllipsisV/></button>
        </div>
        
      </div>
      }
      <ul className="list-group wd-modules">
        {modulesList.map((module, index) => (
          <li key={index}
            className="list-group-item wd-modules-container"
            onClick={() => setSelectedModule(module)}>
            <div className="wd-margin-bot-10">
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson, index) => (
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
