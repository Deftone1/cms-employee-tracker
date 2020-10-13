const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employeeDB",
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId);
    inquirerInit();
});


// initializing function for inquirer
function inquirerInit() {
    console.log("Welcome to the CMS Employee Tracker!")
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                  "Add employee",
                  "View all employees",
                  "View all employees by department",
                  "Add department",
                  "View all departments",
                  "Add role",
                  "View all roles",
                  "Update employee role",
                  "Exit"
                ]
            }
        ])
};
