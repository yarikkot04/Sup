# Проєктування бази даних

В рамках проекту розробляється: 
- модель бізнес-об'єктів 

- ER-модель

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

- реляційна схема

