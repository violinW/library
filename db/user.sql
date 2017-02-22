

DROP TABLE IF EXISTS USER;
CREATE TABLE USER(
    id int(11) AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)  DEFAULT null,
    age tinyint(4)  DEFAULT null
) default charset utf8 COLLATE utf8_general_ci;