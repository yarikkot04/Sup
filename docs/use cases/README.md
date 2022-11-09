## Дiаграма прецедентiв

@startuml
    actor Administrator
    actor Manager         
    actor Developer
    actor Guest

    usecase Admin as "<b>ADM</b>\nКерувати даними системи"

    usecase Manage1 as "<b>MAN_1</b>\nКерувати проєктом"
    usecase Manage2 as "<b>MAN_2</b>\nКерувати даними проєкту"
    usecase Manage3 as "<b>MAN_3</b>\nКерувати командами та учасниками"
    usecase Manage4 as "<b>MAN_4</b>\nКерувати завданнями"

    usecase Develope1 as "<b>DEV_1</b>\nВиконання дій з завданнями"

    usecase Guest1 as "<b>GUE_1</b>\nАвторизація в системі"

    Administrator -> Admin

    Manager -> Manage4
    Manager -> Manage3
    Manager -> Manage2
    Manager -> Manage1

    Administrator -d-|> Manager
    Manager -d-|> Developer
    Developer -d-|> Guest

    Developer -> Develope1
    Guest -> Guest1
@enduml

## Схеми використання для гістя
@startuml
    actor Guest

    usecase Guest1 as "<b>GUE_1</b>\nАвторизація в системі"
    
    usecase User1 as "<b>USER.LOGIN</b>\nВхід в систему"
    usecase User2 as "<b>USER.REGISTER</b>\nРеєстрація в системі"

    Guest -u-> Guest1

    User1 .d.> Guest1
    User2 .d.> Guest1
@enduml

## Схеми використання для розробника
 @startuml
    actor Developer

    usecase DEV1 as "<b>DEV1</b>\nВиконання дій з завданнями"

    usecase TASK1 as "<b>TASK.CHANGE_STATUS</b>\nЗміна статусу завдання"
    usecase TASK2 as "<b>TASK.REQUEST_HELP</b>\nВимога допомоги у виконанні задачі"
    usecase TASK3 as "<b>TASK.ASSIGN.REQUEST</b>\nВимога назначення або засадження"
    usecase TASK4 as "<b>TASK.ARTIFACTS.SHOW</b>\nПерегляд артефактів задачі"
    usecase TASK5 as "<b>TASK.ARTIFACTS.UPDATE</b>\nОновлення артефактів задачі"

    Developer -u-> DEV1

    TASK1 .d.> DEV1: <<extends>>
    TASK2 .d.> DEV1: <<extends>>
    TASK3 .d.> DEV1: <<extends>>
    TASK4 .d.> DEV1: <<extends>>
    TASK5 .d.> DEV1: <<extends>>
 @enduml

## Схеми використання для менеджера
@startuml
    actor Manager

    usecase Manage1 as "<b>MAN_1</b>\nКерувати проєктом"
    usecase Manage2 as "<b>MAN_2</b>\nКерувати даними проєкту"
    usecase Manage3 as "<b>MAN_3</b>\nКерувати командами та учасниками"
    usecase Manage4 as "<b>MAN_4</b>\nКерувати завданнями"

    usecase Project1 as "<b>PROJECT.CREATE</b>\nСтворити проєкт"
    usecase Project2 as "<b>PROJECT.EDIT</b>\nРедагування проекту"
    usecase Project3 as "<b>PROJECT.DELETE</b>\nВидалення проекту"
    usecase Project4 as "<b>PROJECT.ADD_MEMBER</b>\nДодавання учасника до проекту"
    usecase Project5 as "<b>PROJECT.REMOVE_MEMBER</b>\nВидалення учасника з проекту"

    usecase Task1 as "<b>TASK.CREATE</b>\nСтворити завдання"
    usecase Task2 as "<b>TASK.EDIT</b>\nРедагування завдання"
    usecase Task3 as "<b>TASK.ASSIGN</b>\nПризначення виконавця завдання"
    usecase Task4 as "<b>TASK.ASSIGN.REQUEST.APPROVE</b>\nПідтвердити обробку завдання, допомоги та іншого"
    usecase Task5 as "<b>TASK.ASSIGN.REQUEST.DECLINE</b>\nВідхилити запит"
    usecase Task6 as "<b>TASK.REMOVE</b>\nВидалення завдання"

    Manager -u-> Manage1
    Manager -u-> Manage2
    Manager -u-> Manage3
    Manager -u-> Manage4

    Project1 .d.> Manage1: <<extends>>
    Project3 .d.> Manage1: <<extends>>
    Project2 .d.> Manage2: <<extends>>
    Project4 .d.> Manage3: <<extends>>
    Project5 .d.> Manage3: <<extends>>

    Task1 .d.> Manage4: <<extends>>
    Task2 .d.> Manage4: <<extends>>
    Task3 .d.> Manage4: <<extends>>
    Task4 .d.> Manage4: <<extends>>
    Task5 .d.> Manage4: <<extends>>
    Task6 .d.> Manage4: <<extends>>

@enduml

## Схеми використання для адміністратора
@startuml
    actor Administrator

    usecase Admin as "<b>ADM</b>\nКерувати даними системи"

    usecase Backup1 as "<b>BACKUP.CREATE</b>\nСтворити резервну копію"
    usecase Backup2 as "<b>BACKUP.LOAD</b>\nВідновити резервну копію"

    Administrator -u-> Admin

    Backup1 .d.> Admin: <<extends>>
    Backup2 .d.> Admin: <<extends>>

@enduml
## Сценарії
***ID:*** TASK.CREATE

***НАЗВА:*** Створення завдання.

***УЧАСНИКИ:*** Користувач(Адміністратор або Менеджер), Система.

***ПЕРЕДУМОВИ:*** Користувач має необхідні права доступу до функціоналу системи.

***РЕЗУЛЬТАТ:*** Завдання створено.

***ВИКЛЮЧНІ СИТУАЦІЇ:***  

TASK.ERRORS.ACCESS_DENIED - Користувач не має необхідних прав доступу до функціоналу системи.

TASK.ERRORS.INVALID_DATA - Користувач ввів некоректні дані.

***ОСНОВНИЙ СЦЕНАРІЙ:***

@startuml

|Користувач|
    start
    :вводить назву завдання та опис;
    note right #ffaaaa
    TASK.ERRORS.ACCESS_DENIED - Користувач не має
    необхідних прав доступу
    до функціоналу системи
    end note
|Система|
    :перевіряє коректність введених даних;
    note right #ffaaaa
    TASK.ERRORS.INVALID_DATA - Користувач ввів 
    некоректні дані
    end note
    :створює завдання;
    :повідомляє користувача 
    про успішне створення завдання;
    stop;
@enduml



***ID:*** TASK.EDIT

***НАЗВА:*** Редагування завдання

***УЧАСНИКИ:*** Користувач(Адміністратор або Менеджер), Система.

***ПЕРЕДУМОВИ:*** Користувач має необхідні права доступу до функціоналу системи

***РЕЗУЛЬТАТ:*** Завдання відредаговано

***ВИКЛЮЧНІ СИТУАЦІЇ:***  

TASK.ERRORS.ACCESS_DENIED - Користувач не має необхідних прав доступу до функціоналу системи.

TASK.ERRORS.INVALID_DATA - Користувач ввів некоректні дані.

TASK.ERRORS.NOT_EXIST - Задачі не існує.

@startuml

|Користувач|
    start 
    :вводить назву завдання та опис;
    note right #ffaaaa
    TASK.ERRORS.NOT_EXIST - Задачі не існує
    TASK.ERRORS.ACCESS_DENIED - Користувач не має
    необхідних прав доступу
    до функціоналу системи
    end note
|Система|
    :перевіряє коректність введених даних;
    note right #ffaaaa
    TASK.ERRORS.INVALID_DATA - Користувач ввів 
    некоректні дані
    end note
    :відредаговує завдання;
    :повідомляє користувача про успішне відредагування завдання;
    stop;
@enduml




---
### На **рис. n** зображено **сценарій допомоги у виконанні задачі**.
            
***ID:*** TASK.REQUEST_HELP

***НАЗВА:*** Вимога допомоги у виконанні задачі або проекту

***УЧАСНИКИ:*** Користувач, cистема.

***ПЕРЕДУМОВИ:*** - Користувач має необхідні права доступу до функціоналу системи<br>
 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; - Необхідні завдання існують

***РЕЗУЛЬТАТ:*** Задача має статус "Чекає на допомогу"

***ВИКЛЮЧНІ СИТУАЦІЇ:***

- Користувач не має необхідних прав доступу до функціоналу системи - TASK.ERRORS.ACCESS_DENIED
- Користувач ввів некоректні дані - TASK.ERRORS.INVALID_DATA
- Задача не існує - TASK.ERRORS.NOT_EXIST

***ОСНОВНИЙ СЦЕНАРІЙ:***

 <center>     
 
@startuml

    |Користувач|
     start
      :встановлює статус "Чекає на допомогу" для завдання або створює будь-які необхідні пояснення щодо ситуації;
    |Система|
      :перевіряє ці дані;
       note right #ffaaaa 
       TASK.ERRORS.INVALID_DATA
       Користувач ввів некоректні дані
       TASK.ERRORS.ACCESS_DENIED
       Користувач не має необхідних прав доступу до функціоналу системи
       end note
      :змінює статус завдання;
      note right #ffaaaa
      TASK.ERRORS.NOT_EXIST
      Задача не існує
      end note
      :повідомляє адміністратора про необхідність надати допомогу;
    stop;

@enduml

**Рис. n** Сценарій допомоги у виконанні задачі.

</center>

---

### На **рис. n** зображено **сценарій вимоги назначення особи**.
            
***ID:*** TASK.ASSIGN.REQUEST

***НАЗВА:*** Вимога назначення або засадження

***УЧАСНИКИ:*** Користувач, менеджер, cистема.

***ПЕРЕДУМОВИ:*** - Користувач існує<br>
 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; - Користувач має необхідні права доступу до функціоналу системи<br>
 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; - Реформована заява<br>
 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; - Заяву можна обробити<br>
 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; - Необхідні завдання існують

***РЕЗУЛЬТАТ:*** Користувачу назначена відповідальна особа

***ВИКЛЮЧНІ СИТУАЦІЇ:***

- Заява не зареєстрована в базі заяв
- Неможливо обробити заяву

***ОСНОВНИЙ СЦЕНАРІЙ:***

<center>    

@startuml

            
    |Користувач|
     start
      :натискає відповідну кнопку;
    |Система|
      :перевіряє коректність введених даних;
      note right #ffaaaa 
       Неможливо обробити заяву
      end note
      :створює запит та повідомляє менеджера;
       note right #ffaaaa 
       Заява не зареєстрована в базі заяв
       end note
      :повідомляє користувача;
    stop;
            
@enduml

 **Рис. n** Сценарій вимоги назначення особи.     
 
 </center>       
 
---
    
### На **рис. n** зображено **сценарій підтвердження обробки завдання**.
            
***ID:*** TASK.ASSIGN.REQUEST.APPROVE

***НАЗВА:*** Підтвердити обробку завдання, допомоги та іншого

***УЧАСНИКИ:*** Користувач, cистема.

***ПЕРЕДУМОВИ:*** - Користувач існує<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; - Користувач має необхідні права доступу до функціоналу системи

***РЕЗУЛЬТАТ:*** Запит на засаджування змінено на "Очікування назначення" або запис зміни допомога

***ВИКЛЮЧНІ СИТУАЦІЇ:***
            
- Неможливо відмінити запит на якщо коректно оброблений
- Запит не зареєстровано
- Необхідні дані не заповнені вірно

***ОСНОВНИЙ СЦЕНАРІЙ:***

<center>

@startuml
  
     |Користувач|
       start
        :натискає відповідну кнопку;
      |Система|
        :змінює дані у базі даних;
         note right #ffaaaa 
         Неможливо відмінити запит на якщо коректно оброблений
         Запит не зареєстровано
         Необхідні дані не заповнені вірно
         end note
       stop;   
            
@enduml    
    
 **Рис. n** Сценарій підтвердження обробки завдання.     
    
 </center>   

**ID:** USER.REGISTRATION

**НАЗВА:** Реєстрація користувача

**УЧАСНИКИ:** Користувач, система

**ПЕРЕДУМОВИ:** Користувач не зареєстрований в системі

**РЕЗУЛЬТАТ:** Користувач зареєстрований в системі

**ВИКЛЮЧНІ СИТУАЦІЇ:**

- Користувач вже зареєстрований в системі [USER.ERRORS.ALREADY_EXISTS]
- Користувач ввів некоректні дані [USER.ERRORS.INVALID_DATA]

<center>

@startuml

    |Користувач|
        start
        :Вводить свої логін та пароль;
    |Система|
        :Перевіряє коректність введення даних;
        note right #ffaaaa
        <b>Можливо
        <b>USER.ERRORS.INVALID_DATA
        end note

        :Реєструє користувача;
        note right #ffaaaa
        <b>Можливо
        <b>USER.ERRORS.ALREADY_EXISTS
        end note

        :Повідомляє користувача про успішну реєстрацію;

    |Користувач|
        stop;

@enduml

**Рис. n** Сценарій реєстрації користувача.

</center>

**ID:** USER.LOGIN

**НАЗВА:** Вхід користувача

**УЧАСНИКИ:** Користувач, система

**ПЕРЕДУМОВИ:**

- Користувач ввів логін та пароль
- Користувач зареєстрований в системі

**РЕЗУЛЬТАТ:** Доступ до функціоналу системи згідно своєї ролі

**ВИКЛЮЧНІ СИТУАЦІЇ:**

- Користувач не зареєстрований в системі [USER.ERRORS.NOT_EXISTS]
- Користувач ввів невірний логін або пароль [USER.ERRORS.INVALID_CREDENTIALS]

<center>

@startuml

    |Користувач|
        start
        :Вводить свої логін та пароль;
    |Система|
        :Перевіряє коректність введення даних;
        note right #ffaaaa
        <b>Можливо
        <b>USER.ERRORS.INVALID_CREDENTIALS
        end note

        :Авторизує користувача;
        note right #ffaaaa
        <b>Можливо
        <b>USER.ERRORS.NOT_EXISTS
        end note

        :Повідомляє користувача про успішну авторизацію;

    |Користувач|
        stop;
        
@enduml

**Рис. n** Сценарій авторизації користувача.

</center>

**ID:** BACKUP.CREATE

**НАЗВА:** Створення резервної копії даних

**УЧАСНИКИ:** Адміністратор, система

**ПЕРЕДУМОВИ:** - Система підключена до мережі
                - У системі є дані для резервного копіювання

**РЕЗУЛЬТАТ:** Резервна копія даних системи

**ВИКЛЮЧНІ СИТУАЦІЇ:**

- Проблеми з доступом до пам'яті [BACKUP.ERROR.IO]
- Екстрене відключення з мережі [BACKUP.ERROR.NETWORK]
- Недостатньр пам'яті на диску [BACKUP.ERROR.DISK_FULL]

<center>

@startuml

    |Адміністратор|
        start
        :Надає системі інструкції для створення резервної копії даних;
        note left #ffaaaa
        <b>Можливо
        <b>BACKUP.ERROR.NETWORK
        end note
    |Система|
        :Обробляє запит від користувача;
        note right #ffaaaa
        <b>Можливо
        <b>BACKUP.ERROR.NETWORK
        end note
        :Виконує запит та створення резервну копію даних;
        note right #ffaaaa
        <b>Можливі
        <b>BACKUP.ERROR.NETWORK, BACKUP.ERROR.IO
        end note

    |Адміністратор|
        :Отримує .json файл резервної копії;
        note left #ffaaaa
        <b>Можливі
        <b>BACKUP.ERROR.NETWORK, BACKUP.ERROR.DISK_FULL
        end note
        stop;
        
@enduml

**Рис. n** Сценарій резервного копіювання даних.

</center>

---

***ID:*** TASK.ASSIGN.REQUEST.DECLINE

***НАЗВА*** Відхилити запит

***УЧАСНИКИ:*** - Користувач<br>- Cистема

***ПЕРЕДУМОВИ:*** Користувач існує<br>- Користувач має необхідні права доступу до функціоналу системи

***РЕЗУЛЬТАТ:*** Запит зазначено як "Відхилено"

***ВИКЛЮЧНІ СИТУАЦІЇ:*** - Запит не зареєстровано<br>- Необхідні дані не заповнено вірно

***ОСНОВНИЙ СЦЕНАРІЙ:*** 

@startuml

|Користувач|
start
:Користувач повідомляє про необхідність змін;
:Користувач вказує причину відхилення;
|Система|
:Система перевіряє дані, вказані користувачем;
note right #ffaaaa
Необхідні дані не заповнено вірно
end note
:Система приховує дані з бази даних і переміщує на "Відхилено";
note right #ffaaaa
Запит не зареєстровано
end note
stop;

@enduml

---

***ID:*** TASK.REMOVE

***НАЗВА*** Видалення завдання

***УЧАСНИКИ:*** - Користувач<br>- Cистема

***ПЕРЕДУМОВИ:*** - Задача існує

***РЕЗУЛЬТАТ:*** - Задачу видалено

***ВИКЛЮЧНІ СИТУАЦІЇ:*** - Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_<br>- Задачі не існує<br>_TASK.ERRORS.NOT_EXIST_

***ОСНОВНИЙ СЦЕНАРІЙ:*** 

@startuml

|Користувач|
start
:Користувач натискає кнопку "Видалити";
note right #ffaaaa
TASK.ERRORS.
Задачі не існує
end note
|Система|
:Система перевіряє коректність введених даних;
note right #ffaaaa
TASK.ERRORS.INVALID_DATA 
Користувач ввів некоректні дані
end note
:Система видаляє задачу;
:Система повідомляє користувача;
stop;

@enduml

