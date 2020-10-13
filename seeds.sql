USE employeeDB;

-- Department Seeds 

INSERT INTO department (dept_name)
VALUES ("Clerical");
INSERT INTO department (dept_name)
VALUES  ("Sales");
INSERT INTO department (dept_name)
VALUES ("IT");
INSERT INTO department (dept_name)
VALUES ("Human Resources");

SELECT * FROM employeeDB.department;

-- Role Seeds

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Programmer", 70000, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("HR Director", 50000, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("System Administrator", 75000, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Reception", 35000, 2);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Sales Associate", 50000, 2);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("IT Coordinator", 65000, 3);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Investor", 80000, 4);

SELECT * FROM employeeDB.employee_role;


-- -- Employee Seeds

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paul", "Murray", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeff", "Anderson", 1 , null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jenni", "Charles", 4, 2);

SELECT * FROM employeeDB.employee;

