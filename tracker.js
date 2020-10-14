const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

// connection code to mysql
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
                    "Add Employee",
                    "View all Employees",
                    "View all Employees by Department",
                    "Add Department",
                    "View all Departments",
                    "Add Role",
                    "View all Roles",
                    "Update Employee Role",
                    "Exit"
                ]
            }
        ])
        .then((answer) => {

            // Switch case based off of user input
            switch (answer.action) {
                case "Add Employee":
                    addEmployee();
                    break;

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "View all Employees by Department":
                    viewAllEmployeesByDept();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "View all Departments":
                    viewAllDept();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "Update Employee Role":
                    updateEmpRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

// function to view all employees in the database
function viewAllEmployees() {
    const str1 = 'SELECT first_name, last_name, title, salary, dept_name AS "department" FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id'
    connection.query(str1, function (err, result) {
        if (err) throw err;

        console.table(result)
        inquirerInit();
    })
}

// function to add department
function addDept() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What department would you like to add?",
                name: "deptName"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    dept_name: answer.deptName
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department added!");
                    console.log(answer.deptName);
                    inquirerInit();

                }
            );
        })
}

// function to add new role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What title would you like to add?",
                name: "title"
            },
            {
                type: "input",
                message: "What is the salary for the title?",
                name: "salary"
            },
            {
                type: "input",
                message: "What department ID does it belong to?",
                name: "deptId"
            }
        ]).then(function (answer) {
            console.log(answer);
            connection.query(
                "INSERT INTO employee_role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.deptId

                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    inquirerInit();

                }
            );
        })

}

// function to view all of the departments
function viewAllDept() {
    const str1 = 'SELECT * FROM department'
    connection.query(str1, function (err, result) {
        if (err) throw err;

        console.table(result)
        inquirerInit();
    })
}

// function to view all roles
function viewAllRoles() {
    const str1 = 'SELECT * FROM employee_role'
    connection.query(str1, function (err, result) {
        if (err) throw err;

        console.table(result)
        inquirerInit();
    });
}

// function to view all employees
function viewAllEmployeesByDept() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the name of the department you would like to view the employees",
                name: "employeeByDept"
            }]).then(function (answer) {
                console.log(answer);
                const str1 = "SELECT first_name, last_name, title, salary, dept_name AS 'department' FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id WHERE department.dept_name = '"+ answer.employeeByDept + "'"
                connection.query(str1, function (err, result) {
                    if (err) throw err;

                    console.table(result)
                    inquirerInit();
                });
            });
}

// function to add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName"
            },
            {
                type: "input",
                message: "What is the employee's department ID?",
                name: "deptId"
            },
            {
                type: "input",
                message: "What is the employee's manager ID?",
                name: "mgrId"
            }
        ]).then(function (answer) {
            console.log(answer);
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.deptId,
                    manager_id: answer.mgrId

                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    inquirerInit();

                }
            );
        })

}