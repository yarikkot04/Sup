## Дiаграма прецедентiв

@startuml
    actor Administrator
    actor Manager         
    actor Developer

    usecase Admin1 as "<b>ADM_1</b>\nКерувати системою"
    usecase Admin2 as "<b>ADM_2</b>\nКерувати даними системи"

    usecase Manage1 as "<b>MAN_1</b>\nКерувати проєктом"
    usecase Manage2 as "<b>MAN_2</b>\nКервувати даними проєкту"
    usecase Manage3 as "<b>MAN_3</b>\nКерувати командами та учасниками"
    usecase Manage4 as "<b>MAN_4</b>\nКерувати завданнями"

    usecase Develope1 as "<b>DEV_1</b>\nВиконання дій з завданнями"

    Administrator -> Admin1
    Administrator -> Admin2

    Manager -> Manage4
    Manager -> Manage3
    Manager -> Manage2
    Manager -> Manage1

    Administrator -d-|> Manager
    Manager -d-|> Developer

    Developer -> Develope1
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

    TASK1 .d.> DEV1 <<extends>>
    TASK2 .d.> DEV1 <<extends>>
    TASK3 .d.> DEV1 <<extends>>
    TASK4 .d.> DEV1 <<extends>>
    TASK5 .d.> DEV1 <<extends>>
 @enduml

## Схеми використання для менеджера

## Схеми використання для адміністратора


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

---