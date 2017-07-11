SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL,
  `user_number` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `sex` VARCHAR(45) NOT NULL,
  `birthday` DATETIME NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `status` VARCHAR(45) NOT NULL,
  `register_time` TIMESTAMP NOT NULL,
  `register_ip` VARCHAR(45) NOT NULL,
  `last_login_time` DATETIME NULL,
  `last_login_ip` VARCHAR(45) NULL,
  `update_time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`, `UUID`))
ENGINE = InnoDB
COMMENT = '用户表';


-- -----------------------------------------------------
-- Table `mydb`.`login_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`login_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `login_time` TIMESTAMP NOT NULL,
  `login_ip` VARCHAR(45) NULL,
  `user_UUID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_login_log_user1_idx` (`user_UUID` ASC),
  CONSTRAINT `fk_login_log_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `mydb`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '登陆记录表';


-- -----------------------------------------------------
-- Table `mydb`.`default_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`default_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NULL,
  `desc` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '系统默认类别表';


-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `user_UUID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_category_user1_idx` (`user_UUID` ASC),
  CONSTRAINT `fk_category_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `mydb`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '类别表';


-- -----------------------------------------------------
-- Table `mydb`.`draft_box`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`draft_box` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `work_name` VARCHAR(45) NOT NULL,
  `save_time` TIMESTAMP NOT NULL,
  `template` VARCHAR(45) NULL,
  `css` VARCHAR(45) NULL,
  `user_UUID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_draft_box_user1_idx` (`user_UUID` ASC),
  CONSTRAINT `fk_draft_box_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `mydb`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '草稿箱';


-- -----------------------------------------------------
-- Table `mydb`.`template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`template` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '模板表';


-- -----------------------------------------------------
-- Table `mydb`.`css`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`css` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '样式表';


-- -----------------------------------------------------
-- Table `mydb`.`works`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(45) NOT NULL,
  `collectors` INT NULL,
  `pageviews` INT NULL,
  `template_id` INT NOT NULL,
  `css_id` INT NOT NULL,
  PRIMARY KEY (`id`, `UUID`),
  INDEX `fk_works_template1_idx` (`template_id` ASC),
  INDEX `fk_works_css1_idx` (`css_id` ASC),
  CONSTRAINT `fk_works_template1`
    FOREIGN KEY (`template_id`)
    REFERENCES `mydb`.`template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_works_css1`
    FOREIGN KEY (`css_id`)
    REFERENCES `mydb`.`css` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '作品表';


-- -----------------------------------------------------
-- Table `mydb`.`collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`collection` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_UUID` VARCHAR(45) NOT NULL,
  `works_UUID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_collection_user1_idx` (`user_UUID` ASC),
  INDEX `fk_collection_works1_idx` (`works_UUID` ASC),
  CONSTRAINT `fk_collection_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `mydb`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_collection_works1`
    FOREIGN KEY (`works_UUID`)
    REFERENCES `mydb`.`works` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '用户收藏表';


-- -----------------------------------------------------
-- Table `mydb`.`my_works`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`my_works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_UUID` VARCHAR(45) NOT NULL,
  `works_UUID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_my_works_user1_idx` (`user_UUID` ASC),
  INDEX `fk_my_works_works1_idx` (`works_UUID` ASC),
  CONSTRAINT `fk_my_works_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `mydb`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_my_works_works1`
    FOREIGN KEY (`works_UUID`)
    REFERENCES `mydb`.`works` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`archives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`archives` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `time` TIMESTAMP NOT NULL,
  `author_id` INT NOT NULL,
  `author_name` VARCHAR(45) NOT NULL,
  `work_id` INT NOT NULL,
  `work_name` VARCHAR(45) NOT NULL,
  `work_desc` VARCHAR(45) NULL,
  `work_create_time` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '归档表';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
