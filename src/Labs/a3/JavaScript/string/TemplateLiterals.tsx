import React from "react";

function TemplateLiterals() {
    const five = 2 + 3;
    const result1 = "2 + 3 = " + five;
    const result2 = `2 + 3 = ${2 + 3}`;
    const username = 'alice';
    const greeting1 = `Welcome home ${username}`;
    const loggedIn = false;
    const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`;

    return <></>
}

export default TemplateLiterals