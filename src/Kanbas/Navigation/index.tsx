import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaRegEnvelope, FaRegClock, FaDesktop, FaShareSquare, FaQuestionCircle, FaUserCircle } from "react-icons/fa";
function KanbasNavigation() {
  const links = [

    { label: "Account",   icon: <FaUserCircle className="fs-2 user-circle" />  },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" />  },
    { label: "Courses",   icon: <FaBook className="fs-2" />           },
    { label: "Calendar",  icon: <FaRegCalendarAlt className="fs-2" /> },

    { label: "Inbox",  icon: <FaRegEnvelope className="fs-2" /> },

    { label: "History",  icon: <FaRegClock className="fs-2" /> },

    { label: "Studio",  icon: <FaDesktop className="fs-2" /> },

    { label: "Commons",  icon: <FaShareSquare className="fs-2" /> },

    { label: "Help",  icon: <FaQuestionCircle className="fs-2" /> },

  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
            <li>
            <img src={`/images/northeastern-icon.png`} className="card-img-top"
    style={{ width: "60px" }}/>
      </li>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}


export default KanbasNavigation;