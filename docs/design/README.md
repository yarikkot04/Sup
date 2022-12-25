# Проєктування бази даних

В рамках проекту розробляється: 

## Модель бізнес-об'єктів 

<center>

@startuml

entity Project {

}
entity Project.name {

}
entity Project.team {

}

entity Task {

}

entity Team {

}
entity Team.name {

}
entity Team.icon {

}
entity Team.memberList {

}
entity User {

}
entity User {

}
entity User.password {

}
entity User.name {

}

entity User.isAdmin {

}
entity Member {

}
entity Member.name {

}
entity Artifact {

}
entity Artifact.name {

}
entity Artifact.description {

}



entity Task.name {

}
entity Task.description {

}
entity Task.deadLine {

}
entity Role {

}
entity Role.name {

}

Project "1"    --> Project.name
Project "1"    --> Project.team
Project "1"    --- "1, *" Team
Team "1"       --> Team.name
Team "1"       --> Team.icon
Team "1"       --> Team.memberList
Team "1 ,*"    --- "1" Member
Member "1"     --> Member.name
Member "1"     --- "0, *" Role
Role "1"       --> "1" Role.name
Member "0, *"  --- "1" Task
Project "0, *" --- "1" Task
Task "1"       --> Task.name
Task "1"       --> Task.description
Task "0, 1"    --> Task.deadLine
Task "0, *"    --- "1" Artifact
Artifact "1"   --> Artifact.name
Artifact "1"   --> Artifact.description
Member "1"     --- "0, *" User
User "1"       --> User.password
User "1"       --> User.name
User "1"       --> User.isAdmin


@enduml

</center>

## ER-модель

<center>

@startuml
  entity Project <<ENTITY>> {
  name: TEXT
  team: TEXT
  }
  entity Team <<ENTITY>> {
  name: TEXT
  icon: IMAGE
  memberList: TEXT
  }
  entity Member <<ENTITY>> {
  name: TEXT
  }
  entity User <<ENTITY>> {
  password: TEXT
  name: TEXT
  isAdmin: TEXT
  }
  entity Role <<ENTITY>> {
  name: TEXT
  }
  
  entity Task <<ENTITY>> {
  name: TEXT
  description: TEXT
  deadLine: DATE
  }
  entity Artifact <<ENTITY>> {
  name: TEXT
  description: TEXT
  }
  
  
  Project "1"-u-"1,*" Team
  Project "0,*"--"1" Task
  
  Team "1,*"--"1" Member
  
  Member "1"--"0,*" User
  Member "0,*"--"1" Task
  Member "1"--"0,*" Role
  
  Task "0,*"--"1" Artifact
  
@enduml

</center>

## Реляційна схема

<center>

![](../../images/sceme.png )

</center>
