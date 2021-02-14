create table donors(
donorId int not null auto_increment,
firstname varchar(20) not null,
secondname varchar(20) not null,
lastname varchar(20),
city varchar(30),
gender ENUM('male', 'female'),
contact varchar(20) not null,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp,
primary key (donorId),
bloodtypeId int,
    INDEX bloodtypesIndex (bloodtypeId),
    FOREIGN KEY (bloodtypeId)
        REFERENCES bloodtypes(bloodtypeId)
        ON UPDATE CASCADE ON DELETE set null
);
create table requests (
  requestId INT NOT NULL auto_increment,
  donorId int,
  amount int,
  bloodtypeId int,
  primary key(requestId),
   INDEX donorIndex (donorId),
    FOREIGN KEY (donorId)
        REFERENCES donors(donorId)
        ON UPDATE CASCADE ON DELETE CASCADE,
   INDEX bloodtypeIndex(bloodtypeId),
   FOREIGN KEY (bloodtypeId)
   REFERENCES bloodtypes(bloodtypeId)
);

CREATE TABLE users (
  userId int AUTO_INCREMENT NOT NULL,
  username VARCHAR(30),
  email VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  primary key (userId)
);


create table bloodtypes(
bloodtypeId int not null auto_increment,
bloodname varchar(5),
primary key (bloodtypeId)
);