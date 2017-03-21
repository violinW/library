

DROP TABLE IF EXISTS USER;
CREATE TABLE USER(
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)  DEFAULT null,
    age tinyint(4)  DEFAULT null
) default charset utf8 COLLATE utf8_general_ci;


DROP TABLE IF EXISTS Student;
CREATE TABLE Student(
    Id varchar(36) PRIMARY KEY,
    Name varchar(50)  NOT NULL,
    Age tinyint(4)  DEFAULT 0,
    Sex ENUM('Male','Female')  NOT NULL DEFAULT 'Male',
    Dept varchar(50)  DEFAULT NULL
) default charset utf8 COLLATE utf8_general_ci;


DROP TABLE IF EXISTS Course;
CREATE TABLE Course(
    Id varchar(36) PRIMARY KEY,
    Name varchar(50)  NOT NULL,
    Credit tinyint(4)  DEFAULT 0,
    Semester tinyint(4)  DEFAULT 0
) default charset utf8 COLLATE utf8_general_ci;


DROP TABLE IF EXISTS Belonging;
CREATE TABLE Belonging(
    Id varchar(36) PRIMARY KEY,
    StudentId varchar(36) NOT NULL,
    Name varchar(50)  NOT NULL,
    Remark varchar(50)  NOT NULL
) default charset utf8 COLLATE utf8_general_ci;


DROP TABLE IF EXISTS StudentCourse;
CREATE TABLE StudentCourse(
    Id varchar(36) PRIMARY KEY,
    StudentId varchar(36) NOT NULL,
    CourseId varchar(36) NOT NULL,
    Grade tinyint(4)  DEFAULT 0
) default charset utf8 COLLATE utf8_general_ci;