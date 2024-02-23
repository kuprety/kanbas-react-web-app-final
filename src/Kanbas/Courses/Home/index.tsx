import React from "react";
import ModuleList from "../Modules/List";
import { FaBan, FaCheckCircle, FaFile, FaExternalLinkAlt, FaHome, FaChartBar, FaBell, FaCalendar, FaBullhorn } from "react-icons/fa";
import "./index.css";

function Home() {
  return (
    <div className="home-container" >
      <div className="module-list">
        <ModuleList />
      </div>
      <div className="status-container">
        <div className="flex-grow-0 me-2 d-none d-lg-block" style={{width:"250px"}}>
          <div className="wd-course-status">
            <h4>Course Status</h4>
            <div className="d-flex">
              <div>
                <button type="button" className="publishing-button"> <FaBan/> Unpublish</button>
              </div>
              <div>
                <button type="button" className="publishing-button" id="published-button">
                <FaCheckCircle/> Published</button>
              </div>
            </div>
            <button className="wd-home-button"><FaFile/> Import Existing Content</button>
            <br />
            <button className="wd-home-button"><FaExternalLinkAlt/> Import From Commons</button>
            <br />
            <button className="wd-home-button"><FaHome/> Choose Home Page</button>
            <br />
            <button className="wd-home-button"><FaChartBar/> View Course Stream</button>
            <br />
            <button className="wd-home-button"><FaBullhorn/> New Announcement</button>
            <br />
            <button className="wd-home-button"><FaChartBar/> New Analytics</button>
            <br />
            <button className="wd-home-button"><FaBell/>  View Course Notifications</button>
            <div className="d-flex">
              <div id="coming-up">
                <h5 className="coming-up-h5">Coming Up</h5>
              </div>
              <div id="coming-up">
                <p> <div className="wd-gray-calendar"><FaCalendar/>
                  <a href="#" className="view-calendar"> View Calendar</a></div>
                </p>
              </div>
            </div>
            <div className="upcoming-info">
              <ul>
                <li> <div className="wd-gray-calendar"><FaCalendar/>
                  <a href="#"> Lecture
                  </a></div>
                  <p id="coming-up-description">CS4550.1263.202410
                  <br /> Sep 7 at 11:45am
                  </p>
                </li>
                <li> <div className="wd-gray-calendar"><FaCalendar/>
                  <a href="#"> Lecture
                  </a></div>
                  <p id="coming-up-description">CS4550.1263.202410
                  <br /> Sep 10 at 11:45am
                  </p>
                </li>
                <li> <div className="wd-gray-calendar"><FaCalendar/>
                  <a href="#"> CS5610 SP23 Lecture
                  </a></div>
                  <p id="coming-up-description">CS4550.1263.202410
                  <br /> Sep 12 at 6pm
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Home;
