# PostgreSQL Commands Reference with Syntax


## Conection PostgreSQL & Express
### commando to install them
```c
npm install express pg

const { Pool } = require('pg');
```
```js
const pool = new Pool({
  user: 'postgres',      // User name
  host: 'localhost',     // localhost name
  database: 'postgres',  // database name
  password: 'password',  // password
  port: 5432,            // port DEFAULT 5432
});
```
### Query Expres & PostgreSQL
**GET**
```JS
app.get('/ENDPOINT_NAME', async (req, res) => {
    try {
        const sql = 'SELECT * FROM tb_name';
        const { rows } = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener datos');
    }
});
```
**POST**
```JS
app.post('/ENDPOINT_NAME', async (req, res) => {
    const { nombre, email } = req.body;

    try {
        const sql = 'INSERT INTO usuarios (nombre, email) VALUES ($1, $2)';
        await db.query(sql, [nombre, email]);
        res.send('Usuario insertado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al insertar usuario');
    }
});
```
---

## Data Types
| Data Type                                  | Category  | Description                       | Syntax / Example                  |
| ------------------------------------------ | --------- | --------------------------------- | --------------------------------- |
| `SMALLINT`                                 | Numeric   | Small integer (-32,768 to 32,767) | `column_name SMALLINT`            |
| `INTEGER` / `INT`                          | Numeric   | Regular integer                   | `column_name INTEGER`             |
| `BIGINT`                                   | Numeric   | Large integer                     | `column_name BIGINT`              |
| `DECIMAL(p,s)` / `NUMERIC(p,s)`            | Numeric   | Exact numeric with precision      | `column_name NUMERIC(10,2)`       |
| `REAL`                                     | Numeric   | Single precision floating point   | `column_name REAL`                |
| `DOUBLE PRECISION`                         | Numeric   | Double precision floating point   | `column_name DOUBLE PRECISION`    |
| `SERIAL`                                   | Numeric   | Auto-increment integer (4 bytes)  | `column_name SERIAL`              |
| `BIGSERIAL`                                | Numeric   | Auto-increment large integer      | `column_name BIGSERIAL`           |
| `CHAR(n)`                                  | String    | Fixed-length string               | `column_name CHAR(10)`            |
| `VARCHAR(n)`                               | String    | Variable-length string            | `column_name VARCHAR(255)`        |
| `TEXT`                                     | String    | Unlimited length string           | `column_name TEXT`                |
| `DATE`                                     | Date/Time | YYYY-MM-DD                        | `column_name DATE`                |
| `TIMESTAMP [WITHOUT TIME ZONE]`            | Date/Time | YYYY-MM-DD HH:MM:SS               | `column_name TIMESTAMP`           |
| `TIMESTAMP WITH TIME ZONE` / `TIMESTAMPTZ` | Date/Time | Timestamp with timezone           | `column_name TIMESTAMPTZ`         |
| `TIME [WITHOUT TIME ZONE]`                 | Date/Time | HH:MM:SS                          | `column_name TIME`                |
| `TIME WITH TIME ZONE`                      | Date/Time | Time with timezone                | `column_name TIME WITH TIME ZONE` |
| `INTERVAL`                                 | Date/Time | Duration                          | `column_name INTERVAL '1 day'`    |
| `BOOLEAN`                                  | Logical   | True or False                     | `column_name BOOLEAN`             |
| `UUID`                                     | Misc      | Universally unique identifier     | `column_name UUID`                |
| `ARRAY`                                    | Misc      | Array of values                   | `column_name INTEGER[]`           |
| `JSON` / `JSONB`                           | Misc      | JSON data                         | `column_name JSONB`               |
| `XML`                                      | Misc      | XML data                          | `column_name XML`                 |



## Variables
| Variable                           | Description                                             | Syntax / Example                      |
| ---------------------------------- | ------------------------------------------------------- | ------------------------------------- |
| `current_setting('variable_name')` | Returns the current value of a configuration parameter. | `SELECT current_setting('work_mem');` |
| `SET`                              | Sets a parameter for the current session.               | `SET work_mem = '64MB';`              |
| `SET LOCAL`                        | Sets a parameter for the current transaction only.      | `SET LOCAL search_path = 'myschema';` |
| `SHOW variable_name`               | Displays the current value of a parameter.              | `SHOW max_connections;`               |
| `RESET variable_name`              | Resets a parameter to its default value.                | `RESET work_mem;`                     |
| `RESET ALL`                        | Resets all parameters to their defaults.                | `RESET ALL;`                          |
| `PGUSER`, `PGDATABASE`, `PGPORT`   | Environment variables for client connection.            | `\! echo $PGUSER` (psql)              |
| `autocommit`                       | Controls transaction auto-commit mode (psql).           | `\set AUTOCOMMIT on/off`              |



## Constraints in MySQL
| Constraint           | Description                     | Syntax                                                             |
| -------------------- | ------------------------------- | ------------------------------------------------------------------ |
| `PRIMARY KEY`        | Uniquely identifies rows.       | `column_name datatype PRIMARY KEY`                                 |
| `FOREIGN KEY`        | Enforces referential integrity. | `FOREIGN KEY (column_name) REFERENCES parent_table(parent_column)` |
| `UNIQUE`             | Ensures all values are unique.  | `column_name datatype UNIQUE`                                      |
| `NOT NULL`           | Column cannot be NULL.          | `column_name datatype NOT NULL`                                    |
| `CHECK`              | Enforces a condition on values. | `column_name datatype CHECK (condition)`                           |
| `DEFAULT`            | Sets a default value.           | `column_name datatype DEFAULT value`                               |
| `SERIAL / BIGSERIAL` | Auto-incrementing integer.      | `column_name SERIAL PRIMARY KEY`                                   |



## DDL (Data Definition Language)
| Command           | Description                                            | Syntax                                                               |      |                                     |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------- | ---- | ----------------------------------- |
| `CREATE DATABASE` | Creates a new database.                                | `CREATE DATABASE database_name;`                                     |      |                                     |
| `DROP DATABASE`   | Deletes an existing database.                          | `DROP DATABASE database_name;`                                       |      |                                     |
| `CREATE TABLE`    | Creates a new table.                                   | `CREATE TABLE table_name (column1 datatype, column2 datatype, ...);` |      |                                     |
| `DROP TABLE`      | Deletes an existing table.                             | `DROP TABLE table_name;`                                             |      |                                     |
| `ALTER TABLE`     | Modifies the structure of an existing table.           | `ALTER TABLE table_name ADD                                          | DROP | ALTER COLUMN column_name datatype;` |
| `TRUNCATE TABLE`  | Removes all rows from a table but keeps the structure. | `TRUNCATE TABLE table_name;`                                         |      |                                     |
| `RENAME TABLE`    | Renames an existing table.                             | `ALTER TABLE old_name RENAME TO new_name;`                           |      |                                     |



### ALTER
| Command             | Description                   | Syntax                                                                                 |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| `ADD COLUMN`        | Adds a new column to a table. | `ALTER TABLE table_name ADD COLUMN column_name datatype;`                              |
| `DROP COLUMN`       | Removes a column.             | `ALTER TABLE table_name DROP COLUMN column_name;`                                      |
| `ALTER COLUMN TYPE` | Changes datatype of a column. | `ALTER TABLE table_name ALTER COLUMN column_name TYPE new_datatype;`                   |
| `RENAME COLUMN`     | Renames a column.             | `ALTER TABLE table_name RENAME COLUMN old_name TO new_name;`                           |
| `ADD CONSTRAINT`    | Adds a constraint.            | `ALTER TABLE table_name ADD CONSTRAINT constraint_name constraint_type (column_name);` |
| `DROP CONSTRAINT`   | Drops a constraint.           | `ALTER TABLE table_name DROP CONSTRAINT constraint_name;`                              |




## DML (Data Manipulation Language)
| Command     | Description                                         | Syntax                                                               |
| ----------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| `SELECT`    | Retrieves data from one or more tables.             | `SELECT column1, column2 FROM table_name WHERE condition;`           |
| `INSERT`    | Inserts new rows into a table.                      | `INSERT INTO table_name (column1, column2) VALUES (value1, value2);` |
| `UPDATE`    | Modifies existing rows in a table.                  | `UPDATE table_name SET column1=value1 WHERE condition;`              |
| `DELETE`    | Removes rows from a table.                          | `DELETE FROM table_name WHERE condition;`                            |
| `RETURNING` | Returns rows affected by INSERT, UPDATE, or DELETE. | `INSERT INTO table_name (...) VALUES (...) RETURNING column;`        |



## DCL (Data Control Language)
| Command  | Description                                   | Syntax                                      |
| -------- | --------------------------------------------- | ------------------------------------------- |
| `GRANT`  | Gives specific privileges to a user/role.     | `GRANT privilege ON table TO role_name;`    |
| `REVOKE` | Removes specific privileges from a user/role. | `REVOKE privilege ON table FROM role_name;` |


## TCL (Transaction Control Language)
| Command           | Description                                    | Syntax                                           |                 |                 |
| ----------------- | ---------------------------------------------- | ------------------------------------------------ | --------------- | --------------- |
| `COMMIT`          | Saves the current transaction permanently.     | `COMMIT;`                                        |                 |                 |
| `ROLLBACK`        | Undoes the current transaction.                | `ROLLBACK;`                                      |                 |                 |
| `SAVEPOINT`       | Sets a point to which you can roll back later. | `SAVEPOINT savepoint_name;`                      |                 |                 |
| `SET TRANSACTION` | Sets transaction properties.                   | `SET TRANSACTION ISOLATION LEVEL {READ COMMITTED | REPEATABLE READ | SERIALIZABLE};` |



## JOIN Structures
| Join Type       | Description                                                        | Syntax                                                                                |
| --------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| INNER JOIN      | Returns rows with matching values in both tables.                  | `SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column;`      |
| LEFT JOIN       | Returns all rows from the left table, matched rows from the right. | `SELECT columns FROM table1 LEFT JOIN table2 ON table1.column = table2.column;`       |
| RIGHT JOIN      | Returns all rows from the right table, matched rows from the left. | `SELECT columns FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;`      |
| FULL OUTER JOIN | Returns all rows when there is a match in one of the tables.       | `SELECT columns FROM table1 FULL OUTER JOIN table2 ON table1.column = table2.column;` |
| CROSS JOIN      | Returns Cartesian product of two tables.                           | `SELECT columns FROM table1 CROSS JOIN table2;`                                       |


## CREATE VIEW Structure
| Command       | Description                                      | Syntax                                                                              |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `CREATE VIEW` | Creates a virtual table based on a SELECT query. | `CREATE VIEW view_name AS SELECT column1, column2 FROM table_name WHERE condition;` |
| `ALTER VIEW`  | Changes an existing view (rename or options).    | `ALTER VIEW view_name RENAME TO new_name;`                                          |
| `DROP VIEW`   | Deletes a view.                                  | `DROP VIEW view_name;`                                                              |



## STORED PROCEDURE Structure
| Command                       | Description                                             | Syntax                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CREATE FUNCTION`             | Creates a new function.                                 | `CREATE OR REPLACE FUNCTION function_name(param datatype) RETURNS return_type AS $$ BEGIN -- statements; RETURN value; END; $$ LANGUAGE plpgsql;` |
| `CREATE PROCEDURE`            | Creates a procedure (can be called with CALL).          | `CREATE PROCEDURE procedure_name(IN param datatype) LANGUAGE plpgsql AS $$ BEGIN -- statements; END; $$;`                                         |
| `CALL`                        | Executes a procedure.                                   | `CALL procedure_name(arguments);`                                                                                                                 |
| `DROP FUNCTION`               | Deletes a function.                                     | `DROP FUNCTION function_name(datatype);`                                                                                                          |
| `DROP PROCEDURE`              | Deletes a procedure.                                    | `DROP PROCEDURE procedure_name;`                                                                                                                  |
| `ALTER FUNCTION / PROCEDURE`  | PostgreSQL only allows `CREATE OR REPLACE` for editing. | `CREATE OR REPLACE FUNCTION ...`                                                                                                                  |
| `IN / OUT / INOUT`            | Defines how data is passed.                             | `IN param_name datatype, OUT param_name datatype, INOUT param_name datatype`                                                                      |
| `SHOW FUNCTIONS / PROCEDURES` | List functions/procedures.                              | `\df` (psql command)                                                                                                                              |
