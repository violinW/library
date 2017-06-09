SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `mydb` ;
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`student` ;

CREATE TABLE IF NOT EXISTS `mydb`.`student` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `age` VARCHAR(45) NULL,
  `sex` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`teacher` ;

CREATE TABLE IF NOT EXISTS `mydb`.`teacher` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `age` VARCHAR(45) NULL,
  `sex` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`subject` ;

CREATE TABLE IF NOT EXISTS `mydb`.`subject` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `desc` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`classroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`classroom` ;

CREATE TABLE IF NOT EXISTS `mydb`.`classroom` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `house_number` VARCHAR(45) NULL,
  `max_student` VARCHAR(45) NULL,
  `has_TV` TINYINT(1) NULL,
  `has_air_condition` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`class` ;

CREATE TABLE IF NOT EXISTS `mydb`.`class` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(45) NULL,
  `grade` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`student_class_mapping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`student_class_mapping` ;

CREATE TABLE IF NOT EXISTS `mydb`.`student_class_mapping` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `mapping_id` VARCHAR(45) NULL,
  `join_time` DATE NULL,
  `class_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_class_mapping_class1_idx` (`class_id` ASC),
  INDEX `fk_student_class_mapping_student1_idx` (`student_id` ASC),
  CONSTRAINT `fk_student_class_mapping_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `mydb`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_class_mapping_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `mydb`.`student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`class_classroom_mapping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`class_classroom_mapping` ;

CREATE TABLE IF NOT EXISTS `mydb`.`class_classroom_mapping` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `class_id` INT NOT NULL,
  `classroom_id` INT NOT NULL,
  PRIMARY KEY (`idclass_classroom_mapping`),
  INDEX `fk_class_classroom_mapping_class1_idx` (`class_id` ASC),
  INDEX `fk_class_classroom_mapping_classroom1_idx` (`classroom_id` ASC),
  CONSTRAINT `fk_class_classroom_mapping_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `mydb`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_classroom_mapping_classroom1`
    FOREIGN KEY (`classroom_id`)
    REFERENCES `mydb`.`classroom` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`course` ;

CREATE TABLE IF NOT EXISTS `mydb`.`course` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `teacher_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teacher_subject_mapping_teacher1_idx` (`teacher_id` ASC),
  INDEX `fk_teacher_subject_mapping_subject1_idx` (`subject_id` ASC),
  CONSTRAINT `fk_teacher_subject_mapping_teacher1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `mydb`.`teacher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teacher_subject_mapping_subject1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `mydb`.`subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`class_course_mapping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`class_course_mapping` ;

CREATE TABLE IF NOT EXISTS `mydb`.`class_course_mapping` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `time` VARCHAR(45) NULL,
  `course_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_course_mapping_course1_idx` (`course_id` ASC),
  INDEX `fk_class_course_mapping_class1_idx` (`class_id` ASC),
  CONSTRAINT `fk_class_course_mapping_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `mydb`.`course` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_class_course_mapping_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `mydb`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


-- -----------------------------------------------------
-- Table `mydb`.`head_teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`head_teacher` ;

CREATE TABLE IF NOT EXISTS `mydb`.`head_teacher` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `teacher_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_head_teacher_teacher1_idx` (`teacher_id` ASC),
  INDEX `fk_head_teacher_class1_idx` (`class_id` ASC),
  CONSTRAINT `fk_head_teacher_teacher1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `mydb`.`teacher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_head_teacher_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `mydb`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
