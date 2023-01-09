# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:

## SQL-скрипт для створення на початкового наповнення бази даних
```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SUP
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `SUP` ;

-- -----------------------------------------------------
-- Schema SUP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SUP` DEFAULT CHARACTER SET utf8 ;
USE `SUP` ;

-- -----------------------------------------------------
-- Table `SUP`.`artifact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`artifact` ;

CREATE TABLE IF NOT EXISTS `SUP`.`artifact` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SUP`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`task` ;

CREATE TABLE IF NOT EXISTS `SUP`.`task` (
  `id` INT NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `deadline` DATETIME NULL DEFAULT NULL,
  `artifact_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_task_artifact1_idx` (`artifact_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_artifact1`
    FOREIGN KEY (`artifact_id`)
    REFERENCES `SUP`.`artifact` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SUP`.`project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`project` ;

CREATE TABLE IF NOT EXISTS `SUP`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `team` VARCHAR(45) NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_project_task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `SUP`.`task` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SUP`.`member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`member` ;

CREATE TABLE IF NOT EXISTS `SUP`.`member` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `task_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_member_task1_idx` (`task_id` ASC) VISIBLE,
  CONSTRAINT `fk_member_task1`
    FOREIGN KEY (`task_id`)
    REFERENCES `SUP`.`task` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SUP`.`team`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`team` ;

CREATE TABLE IF NOT EXISTS `SUP`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `icon` BLOB NULL,
  `memberList` VARCHAR(45) NULL,
  `project_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_team_project_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_team_member1_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_project`
    FOREIGN KEY (`project_id`)
    REFERENCES `SUP`.`project` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_team_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `SUP`.`member` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SUP`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`user` ;

CREATE TABLE IF NOT EXISTS `SUP`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `isAdmin` VARCHAR(45) NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_user_member1_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `SUP`.`member` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SUP`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SUP`.`role` ;

CREATE TABLE IF NOT EXISTS `SUP`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_role_member1_idx` (`member_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_role_member1`
    FOREIGN KEY (`member_id`)
    REFERENCES `SUP`.`member` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```

## RESTfull сервіс для управління даними

## Файл підключення до бази даних
```js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'SUP',
});

module.exports = db;
```
## Кореневий файл серверу
```js
const express = require('express');
const server = express();
const db = require('./db_member');
const PORT = 5000;
server.use(express.json());

function getAllMembers(req, res) {
  const command = 'select * from member';
  db.query(command, (error, result) => {
    if (error) return res.status(500).json(err);
    res.status(200).json(result);
  });
};
function getSelectedMember(req, res) {
  const command = `select * from member where id=${req.params.id}`;
  db.query(command, (error, result) => {
    if (error) return res.status(500).json(err);
    if (!result.length) return res.status(404).json({ 'message': 'No members found' });
    res.status(200).json(result[0]);
  })
};
function createMember(req, res) {
  const name = req.body.name;
  const task_id = req.body.task_id;
  const templateMember = {
    name: name,
    task_id: task_id,
  };
  if (!templateMember.name || !templateMember.task_id) {
    res.status(400).json({ message: 'Not enough data!' });
  }
  const command = 'insert into member set ?';
  db.query(command, templateMember, (error, result) => {
    if (error) return res.status(500).json(error);
    res.status(201).json({ message: `New member ${name} was created` });
  });
};
function updateSelectedMember(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const task_id = req.body.task_id;
  const templateMember = {
    name: name,
    task_id: task_id,
  };
  if (!templateMember.name && !templateMember.task_id) {
    res.status(400).json({ message: 'Insufficient data' });
  };
  let command;
  if (name) {
    command = `update member set name='${name}' where id=${id};`;
    db.query(command, (error) => {
      if (error) return res.status(500).json(error);
    });
  }
  if (task_id) {
    command = `update member set task_id='${task_id}' where id=${id};`;
    db.query(command, (error) => {
      if (error) return res.status(500).json(error);
    });
  };
  res.status(200).json({ message: `Member id:(${id}) was updated` });
}
function deleteMember(req, res) {
  const id = req.params.id;
  const command = `delete from member where id=${id}`;
  db.query(command, (error) => {
    if (error) return res.status(500).json(error);
    res.status(200).json({ message: `Member id:(${id}) was deleted` });
  });
}

server.get('/members', getAllMembers);
server.get('/member/:id', getSelectedMember);
server.post('/members', createMember);
server.put('/member/:id', updateSelectedMember);
server.delete('/member/:id', deleteMember);



db.connect(server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}));
```

