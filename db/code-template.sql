SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `code_template` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `code_template` ;

-- -----------------------------------------------------
-- Table `code_template`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `code_template`.`user`;
CREATE TABLE IF NOT EXISTS `code_template`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL,
  `user_number` VARCHAR(45) NOT NULL COMMENT '用户编号',
  `nickname` VARCHAR(45) NOT NULL COMMENT '昵称',
  `password` VARCHAR(45) NOT NULL COMMENT '密码',
  `sex` ENUM('male', 'female') NOT NULL DEFAULT 'male' COMMENT '性别',
  `birthday` DATETIME DEFAULT NULL COMMENT '生日',
  `phone` VARCHAR(45) DEFAULT NULL COMMENT '电话',
  `email` VARCHAR(45) DEFAULT NULL COMMENT '邮箱',
  `address` VARCHAR(45) DEFAULT NULL COMMENT '地址',
  `status` ENUM('default', 'freeze', 'cancel') NOT NULL DEFAULT 'default' COMMENT '状态',
  `register_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `register_ip` VARCHAR(45) NOT NULL COMMENT '注册IP',
  `last_login_time` DATETIME DEFAULT NULL COMMENT '最后登陆时间',
  `last_login_ip` VARCHAR(45) DEFAULT NULL COMMENT '最后登陆IP',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`, `UUID`))
ENGINE = InnoDB
COMMENT = '用户表';


-- -----------------------------------------------------
-- Table `code_template`.`login_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`login_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `login_time` TIMESTAMP NOT NULL COMMENT '登陆时间',
  `login_ip` VARCHAR(45) DEFAULT NULL COMMENT '登陆IP',
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`),
  INDEX `fk_login_log_user1_idx` (`user_UUID` ASC),
  CONSTRAINT `fk_login_log_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `code_template`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '登陆记录表';


-- -----------------------------------------------------
-- Table `code_template`.`default_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`default_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT '种类名称',
  `number` VARCHAR(45) DEFAULT NULL COMMENT '种类编号',
  `desc` VARCHAR(45) NULL COMMENT '描述',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '系统默认类别表';


-- -----------------------------------------------------
-- Table `code_template`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT '种类名称',
  `number` VARCHAR(45) NOT NULL COMMENT '种类编号',
  `type` ENUM('default', 'freeze') NOT NULL DEFAULT 'default' COMMENT '类型',
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`),
  INDEX `fk_category_user1_idx` (`user_UUID` ASC),
  CONSTRAINT `fk_category_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `code_template`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '类别表';


-- -----------------------------------------------------
-- Table `code_template`.`draft_box`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`draft_box` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `work_name` VARCHAR(45) NOT NULL COMMENT '作品名称',
  `save_time` TIMESTAMP NOT NULL COMMENT '保存时间',
  `template` VARCHAR(45) DEFAULT NULL COMMENT '模板',
  `css` VARCHAR(45) DEFAULT NULL COMMENT '样式',
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`),
  INDEX `fk_draft_box_user1_idx` (`user_UUID` ASC),
  CONSTRAINT `fk_draft_box_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `code_template`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '草稿箱';


-- -----------------------------------------------------
-- Table `code_template`.`template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`template` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(45) NOT NULL COMMENT '模板内容',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '模板表';


-- -----------------------------------------------------
-- Table `code_template`.`css`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`css` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `body` VARCHAR(45) NOT NULL COMMENT '样式内容',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '样式表';


-- -----------------------------------------------------
-- Table `code_template`.`works`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `UUID` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL COMMENT '名称',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `type` ENUM('system', 'public', 'private') NOT NULL DEFAULT 'private' COMMENT '类型',
  `status` ENUM('default', 'freeze') NOT NULL DEFAULT 'default' COMMENT '状态',
  `desc` VARCHAR(45) NOT NULL COMMENT '描述',
  `collectors` INT DEFAULT 0 COMMENT '收藏人数',
  `pageviews` INT DEFAULT 0 COMMENT '浏览次数',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `template_id` INT NOT NULL COMMENT '模板Id',
  `css_id` INT NOT NULL COMMENT '样式Id',
  PRIMARY KEY (`id`, `UUID`),
  INDEX `fk_works_template1_idx` (`template_id` ASC),
  INDEX `fk_works_css1_idx` (`css_id` ASC),
  CONSTRAINT `fk_works_template1`
    FOREIGN KEY (`template_id`)
    REFERENCES `code_template`.`template` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_works_css1`
    FOREIGN KEY (`css_id`)
    REFERENCES `code_template`.`css` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '作品表';


-- -----------------------------------------------------
-- Table `code_template`.`collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`collection` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户Id',
  `works_UUID` VARCHAR(45) NOT NULL COMMENT '作品Id',
  PRIMARY KEY (`id`),
  INDEX `fk_collection_user1_idx` (`user_UUID` ASC),
  INDEX `fk_collection_works1_idx` (`works_UUID` ASC),
  CONSTRAINT `fk_collection_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `code_template`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_collection_works1`
    FOREIGN KEY (`works_UUID`)
    REFERENCES `code_template`.`works` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '用户收藏表';


-- -----------------------------------------------------
-- Table `code_template`.`my_works`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`my_works` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_UUID` VARCHAR(45) NOT NULL COMMENT '用户Id',
  `works_UUID` VARCHAR(45) NOT NULL COMMENT '作品Id',
  PRIMARY KEY (`id`),
  INDEX `fk_my_works_user1_idx` (`user_UUID` ASC),
  INDEX `fk_my_works_works1_idx` (`works_UUID` ASC),
  CONSTRAINT `fk_my_works_user1`
    FOREIGN KEY (`user_UUID`)
    REFERENCES `code_template`.`user` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_my_works_works1`
    FOREIGN KEY (`works_UUID`)
    REFERENCES `code_template`.`works` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `code_template`.`archives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `code_template`.`archives` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `time` TIMESTAMP NOT NULL COMMENT '时间',
  `author_id` INT NOT NULL COMMENT '作者Id',
  `author_name` VARCHAR(45) NOT NULL COMMENT '作者名称',
  `work_id` INT NOT NULL COMMENT '作品Id',
  `work_name` VARCHAR(45) NOT NULL COMMENT '作品名称',
  `work_desc` VARCHAR(45) DEFAULT NULL COMMENT '作品描述',
  `work_create_time` DATETIME DEFAULT NULL COMMENT '作品创建时间',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '归档表';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
