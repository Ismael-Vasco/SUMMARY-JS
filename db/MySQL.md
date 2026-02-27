# MySQL Commands Reference with Syntax


## Conection MySQL & Express
### commando to install them
```c
npm install express mysql2

const mysql = require('mysql2');
```
```js
const pool = mysql.createPool({
    host: ' ',                         // servidor MySQL
    user: 'root',                      // usuario
    password: ' ',                     // contraseña
    database: ' ',                     // base de datos
    waitForConnections: true,          // si no hay conexiones, esperar
    connectionLimit: 10,               // máximo de conexiones simultáneas
    queueLimit: 0                      // sin límite de cola
});
```
### query Expres & MySQL
**GET**
```JS
app.get('/ENDPOINT_NAME'(req, res) => {
    const sql = 'SELECT * FROM tb_name';
    db.query(sql(err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
```
**POST**
```JS
app.post('/ENDPOINT_NAME'(req, res) => {
    const { nombre, email } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, email) VALUES (??)';
    db.query(sql[nombre, email](err, result) => {
        if (err) throw err;
        res.send('Usuario insertado');
    });
});
```
---

## Data Types
| Data Type                       | Category  | Description                       | Syntax / Example               |
| ------------------------------- | --------- | --------------------------------- | ------------------------------ |
| `INT` / `INTEGER`               | Numeric   | Whole numbers                     | `column_name INT`              |
| `TINYINT`                       | Numeric   | Very small integer (-128 to 127)  | `column_name TINYINT`          |
| `SMALLINT`                      | Numeric   | Small integer (-32,768 to 32,767) | `column_name SMALLINT`         |
| `MEDIUMINT`                     | Numeric   | Medium integer                    | `column_name MEDIUMINT`        |
| `BIGINT`                        | Numeric   | Large integer                     | `column_name BIGINT`           |
| `DECIMAL(p,s)` / `NUMERIC(p,s)` | Numeric   | Exact fixed-point numbers         | `column_name DECIMAL(10,2)`    |
| `FLOAT`                         | Numeric   | Approximate floating-point        | `column_name FLOAT(7,4)`       |
| `DOUBLE` / `REAL`               | Numeric   | Approximate double precision      | `column_name DOUBLE`           |
| `CHAR(n)`                       | String    | Fixed-length string               | `column_name CHAR(10)`         |
| `VARCHAR(n)`                    | String    | Variable-length string            | `column_name VARCHAR(255)`     |
| `TEXT`                          | String    | Large text data                   | `column_name TEXT`             |
| `DATE`                          | Date/Time | YYYY-MM-DD format                 | `column_name DATE`             |
| `DATETIME`                      | Date/Time | YYYY-MM-DD HH:MM:SS               | `column_name DATETIME`         |
| `TIMESTAMP`                     | Date/Time | YYYY-MM-DD HH:MM:SS with timezone | `column_name TIMESTAMP`        |
| `TIME`                          | Date/Time | HH:MM:SS                          | `column_name TIME`             |
| `YEAR`                          | Date/Time | 4-digit year                      | `column_name YEAR`             |
| `ENUM('val1','val2')`           | String    | List of allowed values            | `column_name ENUM('M','F')`    |
| `SET('val1','val2')`            | String    | Set of allowed values             | `column_name SET('A','B','C')` |
| `BOOLEAN` / `BOOL`              | Logical   | True or False                     | `column_name BOOLEAN`          |


## Variables
| Variable                  | Description                                             | Syntax / Example                              |
| ------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| `@@global.variable_name`  | Access or set a global variable affecting all sessions. | `SET @@global.max_connections = 200;`         |
| `@@session.variable_name` | Access or set a variable for the current session only.  | `SET @@session.time_zone = '+00:00';`         |
| `@user_var`               | User-defined session variable.                          | `SET @myvar = 100; SELECT @myvar;`            |
| `autocommit`              | Controls automatic commit behavior.                     | `SET autocommit = 0;`                         |
| `sql_mode`                | Defines SQL syntax and behavior.                        | `SET sql_mode = 'STRICT_TRANS_TABLES';`       |
| `time_zone`               | Sets the time zone for the session.                     | `SET time_zone = 'America/New_York';`         |
| `max_connections`         | Maximum number of concurrent client connections.        | `SHOW VARIABLES LIKE 'max_connections';`      |
| `character_set_server`    | Default character set for the server.                   | `SHOW VARIABLES LIKE 'character_set_server';` |


## Constraints in MySQL
| Constraint       | Description                                           | Syntax                                                             |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| `PRIMARY KEY`    | Uniquely identifies each record in a table.           | `column_name datatype PRIMARY KEY`                                 |
| `FOREIGN KEY`    | Ensures referential integrity between tables.         | `FOREIGN KEY (column_name) REFERENCES parent_table(parent_column)` |
| `UNIQUE`         | Ensures all values in a column are unique.            | `column_name datatype UNIQUE`                                      |
| `NOT NULL`       | Ensures a column cannot have NULL values.             | `column_name datatype NOT NULL`                                    |
| `CHECK`          | Ensures a column meets a specified condition.         | `column_name datatype CHECK (condition)`                           |
| `DEFAULT`        | Sets a default value for a column.                    | `column_name datatype DEFAULT value`                               |
| `AUTO_INCREMENT` | Automatically generates a unique number for new rows. | `column_name INT AUTO_INCREMENT`                                   |


## DDL (Data Definition Language)
| Command           | Description                                            | Syntax                                                               |      |                               |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------- | ---- | ----------------------------- |
| `CREATE DATABASE` | Creates a new database.                                | `CREATE DATABASE database_name;`                                     |      |                               |
| `DROP DATABASE`   | Deletes an existing database.                          | `DROP DATABASE database_name;`                                       |      |                               |
| `CREATE TABLE`    | Creates a new table.                                   | `CREATE TABLE table_name (column1 datatype, column2 datatype, ...);` |      |                               |
| `DROP TABLE`      | Deletes an existing table.                             | `DROP TABLE table_name;`                                             |      |                               |
| `ALTER TABLE`     | Modifies the structure of an existing table.           | `ALTER TABLE table_name ADD                                          | DROP | MODIFY column_name datatype;` |
| `TRUNCATE TABLE`  | Removes all rows from a table but keeps the structure. | `TRUNCATE TABLE table_name;`                                         |      |                               |
| `RENAME TABLE`    | Renames an existing table.                             | `RENAME TABLE old_name TO new_name;`                                 |      |                               |


### ALTER
| Command           | Description                                           | Syntax                                                                                 |
| ----------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ADD COLUMN`      | Adds a new column to an existing table.               | `ALTER TABLE table_name ADD column_name datatype;`                                     |
| `DROP COLUMN`     | Removes a column from a table.                        | `ALTER TABLE table_name DROP COLUMN column_name;`                                      |
| `MODIFY COLUMN`   | Changes the datatype of a column.                     | `ALTER TABLE table_name MODIFY COLUMN column_name new_datatype;`                       |
| `CHANGE COLUMN`   | Renames a column and optionally changes its datatype. | `ALTER TABLE table_name CHANGE old_name new_name datatype;`                            |
| `ADD CONSTRAINT`  | Adds a constraint to a table.                         | `ALTER TABLE table_name ADD CONSTRAINT constraint_name constraint_type (column_name);` |
| `DROP CONSTRAINT` | Removes a constraint from a table.                    | `ALTER TABLE table_name DROP CONSTRAINT constraint_name;`                              |
| `RENAME TO`       | Renames the table.                                    | `ALTER TABLE old_table_name RENAME TO new_table_name;`                                 |



## DML (Data Manipulation Language)
| Command   | Description                             | Syntax                                                                |
| --------- | --------------------------------------- | --------------------------------------------------------------------- |
| `SELECT`  | Retrieves data from one or more tables. | `SELECT column1, column2 FROM table_name WHERE condition;`            |
| `INSERT`  | Inserts new rows into a table.          | `INSERT INTO table_name (column1, column2) VALUES (value1, value2);`  |
| `UPDATE`  | Modifies existing rows in a table.      | `UPDATE table_name SET column1=value1 WHERE condition;`               |
| `DELETE`  | Removes rows from a table.              | `DELETE FROM table_name WHERE condition;`                             |
| `REPLACE` | Inserts or replaces rows in a table.    | `REPLACE INTO table_name (column1, column2) VALUES (value1, value2);` |
| `CALL`    | Executes a stored procedure.            | `CALL procedure_name(parameters);`                                    |


## DCL (Data Control Language)
| Command  | Description                              | Syntax                                                   |
| -------- | ---------------------------------------- | -------------------------------------------------------- |
| `GRANT`  | Gives specific privileges to a user.     | `GRANT privilege ON database.table TO 'user'@'host';`    |
| `REVOKE` | Removes specific privileges from a user. | `REVOKE privilege ON database.table FROM 'user'@'host';` |


## TCL (Transaction Control Language)
| Command           | Description                                       | Syntax                       |                                      |
| ----------------- | ------------------------------------------------- | ---------------------------- | ------------------------------------ |
| `COMMIT`          | Saves the current transaction permanently.        | `COMMIT;`                    |                                      |
| `ROLLBACK`        | Undoes the current transaction.                   | `ROLLBACK;`                  |                                      |
| `SAVEPOINT`       | Sets a point to which you can roll back later.    | `SAVEPOINT savepoint_name;`  |                                      |
| `SET TRANSACTION` | Sets characteristics for the current transaction. | `SET TRANSACTION [READ WRITE | READ ONLY] [ISOLATION LEVEL level];` |


## JOIN Structures
| Join Type       | Description                                                                        | Syntax                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| INNER JOIN      | Returns rows that have matching values in both tables.                             | `SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column;`                        |
| LEFT JOIN       | Returns all rows from the left table, and matched rows from the right.             | `SELECT columns FROM table1 LEFT JOIN table2 ON table1.column = table2.column;`                         |
| RIGHT JOIN      | Returns all rows from the right table, and matched rows from the left.             | `SELECT columns FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;`                        |
| FULL OUTER JOIN | Returns all rows when there is a match in one of the tables (simulate with UNION). | `SELECT ... FROM table1 LEFT JOIN table2 ON ... UNION SELECT ... FROM table1 RIGHT JOIN table2 ON ...;` |
| CROSS JOIN      | Returns Cartesian product of the two tables.                                       | `SELECT columns FROM table1 CROSS JOIN table2;`                                                         |


## CREATE VIEW Structure
| Command       | Description                                      | Syntax                                                                              |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `CREATE VIEW` | Creates a virtual table based on a SELECT query. | `CREATE VIEW view_name AS SELECT column1, column2 FROM table_name WHERE condition;` |


## STORED PROCEDURE Structure
| Command                       | Description                                                            | Syntax                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `CREATE PROCEDURE`            | Creates a new stored procedure.                                        | `DELIMITER // CREATE PROCEDURE procedure_name (IN param1 datatype, OUT param2 datatype) BEGIN SQL statements; END // DELIMITER ;` |
| `CALL`                        | Executes a stored procedure.                                           | `CALL procedure_name(arguments);`                                                                                                 |
| `ALTER PROCEDURE`             | MySQL does not directly support ALTER; you must DROP and CREATE again. | `DROP PROCEDURE procedure_name; CREATE PROCEDURE ...`                                                                             |
| `DROP PROCEDURE`              | Deletes a stored procedure.                                            | `DROP PROCEDURE procedure_name;`                                                                                                  |
| `SHOW PROCEDURE STATUS`       | Lists all stored procedures in the database.                           | `SHOW PROCEDURE STATUS WHERE Db = 'database_name';`                                                                               |
| `IN / OUT / INOUT Parameters` | Defines how data is passed to/from a procedure.                        | `IN param_name datatype, OUT param_name datatype, INOUT param_name datatype`                                                      |
