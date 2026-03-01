# Database Normalization Reference with SQL & Tables
## What is Database Normalization?
Database Normalization is the process of structuring relational databases to:

- Reduce redundancy
- Prevent anomalies (insert, update, delete)
- Improve integrity
- Enforce proper dependencies
- 
*Normalization is applied through Normal Forms (NF).*

| Normal Form | Removes               | Example Issue                            |
| ----------- | --------------------- | ---------------------------------------- |
| 1NF         | Repeating values      | Multiple phones in one column            |
| 2NF         | Partial dependency    | Name depends on part of composite key    |
| 3NF         | Transitive dependency | Department name depends on department_id |
| BCNF        | Determinant anomaly   | Non-key determinant                      |


---

## First Normal Form (1NF)
**Rule**
- Atomic values only
- No repeating groups
- Unique rows

**Not in 1NF (Repeating Values)**
Table Structure
| student_id | name | phones           |
| ---------- | ---- | ---------------- |
| 1          | John | 123-456, 987-654 |
| 2          | Mary | 555-111          |

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    phones VARCHAR(255)
);
```
**Problem:** *phones contains multiple values in one field.*

### Converted to 1NF
#### Tables

**students**
| student_id | name |
| ---------- | ---- |
| 1          | John |
| 2          | Mary |

**student_phones**
| id | student_id | phone   |
| -- | ---------- | ------- |
| 1  | 1          | 123-456 |
| 2  | 1          | 987-654 |
| 3  | 2          | 555-111 |

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE student_phones (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    phone VARCHAR(20)
);
```
- *Atomic values*
- *No repeating groups*
  
---

## Second Normal Form (2NF)
**Rule**

- Must be in 1NF
- No partial dependency
- All non-key attributes depend on the entire composite key

### Not in 2NF

Table Structure
| student_id | course_id | student_name | course_name |
| ---------- | --------- | ------------ | ----------- |
| 1          | 101       | John         | Math        |
| 1          | 102       | John         | Physics     |

*Composite PK: (`student_id`, `course_id`)*

Problem:
- student_name depends only on student_id
- course_name depends only on course_id

```sql
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    student_name VARCHAR(100),
    course_name VARCHAR(100),
    PRIMARY KEY (student_id, course_id)
);
```

### Converted to 2NF
Tables

**students**
| student_id | student_name |
| ---------- | ------------ |
| 1          | John         |

**courses**
| course_id | course_name |
| --------- | ----------- |
| 101       | Math        |
| 102       | Physics     |

**enrollments**
| student_id | course_id |
| ---------- | --------- |
| 1          | 101       |
| 1          | 102       |

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```
- *Removed partial dependencies*

---

## Third Normal Form (3NF)
**Rule**

- Must be in 2NF
- No transitive dependency
- Non-key attributes depend only on the primary key

### Not in 3NF

Table Structure
| employee_id | name | department_id | department_name |
| ----------- | ---- | ------------- | --------------- |
| 1           | Ana  | 10            | HR              |
| 2           | Luis | 20            | IT              |

Problem:
- department_name depends on department_id
- Not directly on employee_id

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100)
);
```

### Converted to 3NF
Tables

**departments**
| department_id | department_name |
| ------------- | --------------- |
| 10            | HR              |
| 20            | IT              |

**employees**
| employee_id | name | department_id |
| ----------- | ---- | ------------- |
| 1           | Ana  | 10            |
| 2           | Luis | 20            |

```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT REFERENCES departments(department_id)
);
```
--- 

## Boyce-Codd Normal Form (BCNF)
**Rule**
- Every determinant must be a candidate key.

### Not in BCNF
Table Structure
| student_id | course | instructor |
| ---------- | ------ | ---------- |
| 1          | Math   | Smith      |
| 2          | Math   | Smith      |

Rule:
- Each course has one instructor
- But course is not a candidate key

Dependency:
```
course → instructor
```
```sql
CREATE TABLE classes (
    student_id INT,
    course VARCHAR(100),
    instructor VARCHAR(100),
    PRIMARY KEY (student_id, course)
);
```
### Converted to BCNF
Tables

**courses**
| course | instructor |
| ------ | ---------- |
| Math   | Smith      |

**enrollments**
| student_id | course |
| ---------- | ------ |
| 1          | Math   |
| 2          | Math   |


```sql
CREATE TABLE courses (
    course VARCHAR(100) PRIMARY KEY,
    instructor VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course VARCHAR(100),
    PRIMARY KEY (student_id, course),
    FOREIGN KEY (course) REFERENCES courses(course)
);
```
- *Determinants are candidate keys*


** Excel Function to Normmalization throught tables (drive Excel)
```
=SI.ERROR(INDICE(cargo[id]; COINCIDIR(C2; cargo[nombre]; 0)); "")
```
