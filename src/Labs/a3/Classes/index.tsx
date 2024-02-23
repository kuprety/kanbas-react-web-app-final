import React from "react";
import './index.css';

const color = 'blue';
const dangerous = true;

function Classes() {
 return (
   <div>
     <h2>Classes</h2>
     <div className={`${dangerous ? 'wd-bg-red' : 'wd-bg-green'}
                                     wd-fg-black wd-padding-10px`}>
       Dangerous background
     </div>
     <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
       Dynamic Blue background
     </div>

     </div>
    ) }
export default Classes;