create database db_amaano;
use db_amaano;
select *from teachers;
drop database db_amaano;

create table teachers (
  teacherId int not null auto_increment ,
    firstname varchar(20) not null,
    secondname varchar(20),
    lastname varchar(20),
    contact varchar(20) not null,
    gender enum('male', 'female'),
    primary key(teacherId)
);


create table levels(
levelId int not null auto_increment,
levelname varchar(20),
primary key(levelId)
);

create table subjects(
subjectId int not null auto_increment,
subjectname varchar(30),
primary key (subjectId)
);

create table students(
studentId int not null auto_increment,
firstname varchar(20) not null,
secondname varchar(20) not null,
lastname varchar(20),
country varchar(30),
gender ENUM('male', 'female'),
contact varchar(20) not null,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp,
primary key (studentId),
teacherId int,
levelId int,
    INDEX teacherIndex (teacherId),
    FOREIGN KEY (teacherId)
        REFERENCES teachers(teacherId)
        ON UPDATE CASCADE ON DELETE set null,
INDEX levelIndex(levelId),
   FOREIGN KEY (levelId)
   REFERENCES levels(levelId)
   ON UPDATE CASCADE ON DELETE set null
);

create table exams(
examId int not null auto_increment,
grade decimal,
primary key(examId),
studentId int,
subjectId int,
    INDEX studentIndex (studentId),
    FOREIGN KEY (studentId)
        REFERENCES students(studentId)
        ON UPDATE CASCADE ON DELETE set null,
INDEX subjectIndex(subjectId),
   FOREIGN KEY (subjectId)
   REFERENCES subjects(subjectId)
   ON UPDATE CASCADE ON DELETE set null
);
drop table exams;
create table exams (
examId int not null auto_increment,
examCode varchar(30),
createdAt datetime default current_timestamp,
primary key(examId)
);

drop table user;

create table grades (
  gradeId INT NOT NULL auto_increment,
    studentId int,
    subjectId int,
    examId int,
    grade decimal,
    INDEX studentIndex (studentId),
    FOREIGN KEY (studentId)
        REFERENCES students(studentId)
        ON UPDATE CASCADE ON DELETE CASCADE,
   INDEX subjectIndex(subjectId),
   FOREIGN KEY (subjectId)
   REFERENCES subjects(subjectId)
   ON UPDATE CASCADE ON DELETE CASCADE,
   INDEX examIndex(examId),
   FOREIGN KEY (examId)
   REFERENCES exams(examId)
   ON UPDATE CASCADE ON DELETE CASCADE,
   primary key(gradeId)
);

drop table grade;


CREATE TABLE users (
  userId int AUTO_INCREMENT NOT NULL,
  username VARCHAR(30),
  email VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  primary key (userId)
);
use db_amaano;
drop table user;

select * from teachers;