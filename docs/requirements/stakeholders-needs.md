# Запити зацікавлених осіб

## Вступ

Даний документ описує запити зацікавлених осіб, характеристику ділових процесів, короткий огляд продукту та його функціональностей. 

### Мета 

Метою документа є визначення основних вимог до продуктивності, функціональності та експлуатаційної придатності проекту, а також визначення бізнес-правил, технологічних обмежень, процесів та факторів, які впливають на предмет розробки.

### Контекст

Цей документ відповідає запитам зацікавлених осіб щодо особливостей та фунціоналу системи управління проєктами. Вимоги вказані в документі є основою для розробки цього проекту.


### Основні визначення та скорочення

Основні визначення описані у документі [аналізу предметної області.](https://github.com/gonnagetbetter/db_course_work/blob/master/docs/requirements/state-of-the-art.md)


### Посилання

*[Розділ містить повний список всіх документів, про які згадується.]*


## Короткий зміст

Зміст:

1. [Характеристика ділових процесів](#characteristics)
2. [Короткий огляд продукту](#review)
3. [Функціональність](#functionality)
4. [Практичність](#practicality)
5. [Надійність](#reliability)
6. [Продуктивність](#productivity)
7. [Експлуатаційна придатність](#serviceability)

## <a name="characteristics"> </a> Характеристика ділових процесів

У процесі приймають участь наступні учасники:
- Система
- Користувачі системи

Користувачі системи поділяються на наступні ролі, згідно яких вони мають різні права доступу до системи:
- Адміністратор [ADMIN]
- Менеджер [MANAGER]
- Розробник [DEVELOPER]
- Гість [GUEST]

Адміністратор - користувач, який має повні права доступу до системи. Він може створювати, редагувати та видаляти проекти, а також додавати та видаляти користувачів системи.

Менеджер - користувач, який має права доступу до системи тільки для перегляду та редагування проектів, до яких він призначений. Може назначати задачі розробникам та міняти їх статуси.

Розробник - користувач, який має права доступу до системи тільки для перегляду та редагування задач, їх статусів, до яких він призначений.

Гість - неавторизований користувач.

 
|ID| PROJECT.CREATE|
|:--|:--|
|Назва:|Створення проекту|
|Учасники:|- Користувач(Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Проект створено|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_PROJECT.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_PROJECT.ERRORS.INVALID_DATA_|
|Основний сценарій:|1. Користувач вводить назву проекту та опис<br>2. Система перевіряє коректність введених даних<br>3. Система створює проект<br>4. Користувач отримує повідомлення про успішне створення проекту|

|ID| PROJECT.EDIT|
|:--|:--|
|Назва:|Редагування проекту|
|Учасники:|- Користувач(Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Проект відредаговано|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_PROJECT.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_PROJECT.ERRORS.INVALID_DATA_<br>- Проекту не існує<br>_PROJECT.ERRORS.NOT_EXIST_|
|Основний сценарій:|1. Користувач вводить назву проекту та опис<br>2. Система перевіряє коректність введених даних<br>3. Система відредаговує проект<br>4. Користувач отримує повідомлення про успішне відредагування проекту|

|ID| PROJECT.DELETE|
|:--|:--|
|Назва:|Видалення проекту|
|Учасники:|- Користувач(Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Проект видалено|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_PROJECT.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_PROJECT.ERRORS.INVALID_DATA_<br>- Проекту не існує<br>_PROJECT.ERRORS.NOT_EXIST_|
|Основний сценарій:|1. Користувач натискає на "Видалити проект"<br>2. Система перевіряє коректність введених даних<br>3. Система видаляє проект<br>4. Користувач отримує повідомлення про успішне видалення проекту|

|ID| PROJECT.ADD_MEMBER|
|:--|:--|
|Назва:|Додавання учасника до проекту|
|Учасники:|- Користувач(Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Учасник доданий до проекту|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_PROJECT.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_PROJECT.ERRORS.INVALID_DATA_<br>- Проекту не існує<br>_PROJECT.ERRORS.NOT_EXIST_<br>- Користувача не існує<br>_PROJECT.ERRORS.USER_NOT_EXIST_|
|Основний сценарій:|1. Користувач вводить username або id учасника<br>2. Система перевіряє коректність введених даних<br>3. Система додає учасника до проекту<br>4. Користувач отримує повідомлення про успішне додавання учасника до проекту|

|ID| TASK.CREATE|
|:--|:--|
|Назва:|Створення завдання|
|Учасники:|- Користувач(Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Завдання створено|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_TASK.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_|
|Основний сценарій:|1. Користувач вводить назву завдання та опис<br>2. Система перевіряє коректність введених даних<br>3. Система створює завдання<br>4. Користувач отримує повідомлення про успішне створення завдання|

|ID| TASK.EDIT|
|:--|:--|
|Назва:|Редагування завдання|
|Учасники:|- Користувач(Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Завдання відредаговано|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_TASK.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_<br>-Задачі не існує<br>_TASK.ERRORS.NOT_EXIST_|
|Основний сценарій:|1. Користувач вводить назву завдання та опис<br>2. Система перевіряє коректність введених даних<br>3. Система відредаговує завдання<br>4. Користувач отримує повідомлення про успішне відредагування завдання|

|ID| TASK.ASSIGN|
|:--|:--|
|Назва:|Призначення виконавця завдання|
|Учасники:|- Користувач (Адміністратор або Менеджер)<br>- Система|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи<br>- Задача існує|
|Результат:|- Виконавець призначений|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_TASK.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_<br>- Задачі не існує<br>_TASK.ERRORS.NOT_EXIST_|
|Основний сценарій:|1. Користувач вводить ім'я виконавця<br>2. Система перевіряє коректність введених даних<br>3. Система призначає виконавця завдання<br>4. Користувач отримує повідомлення про успішне призначення виконавця|

|ID| TASK.CHANGE_STATUS|
|:--|:--|
|Назва:|Зміна статусу завдання|
|Учасники:|- Користувач <br>- Система|
|Передумови:|- Задача існує|
|Результат:|- Статус завдання змінено|
|Виключні ситуації:|- Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_<br>- Задачі не існує<br>_TASK.ERRORS.NOT_EXIST_|
|Основний сценарій:|1. Користувач змінює статус завдання<br>2. Система перевіряє коректність введених даних<br>3. Система змінює статус завдання<br>4. Користувач отримує повідомлення про успішне змінення статусу|

|ID| TASK.REQUEST_HELP|
|:--|:--|
|Назва:|Вимога допомоги у виконанні задачі або проекту|
|Учасники:|- Користувач<br>- Система<br>- Менеджер|
|Передумови:|- Користувач має необхідні права доступу до функціоналу системи<br>- Необхідні завдання існують|
|Результат:|- Задача має статус "Чекає на допомогу"|
|Виключні ситуації:|- Користувач не має необхідних прав доступу до функціоналу системи<br>_TASK.ERRORS.ACCESS_DENIED_<br>- Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_<br>- Задача не існує<br>_TASK.ERRORS.NOT_EXIST_|
|Основний сценарій:|1. Користувач встановлює статус "Чекає на допомогу" для завдання та / або створює будь-які необхідні пояснення щодо ситуації<br>2. Система перевіряє ці дані<br>3. Система змінює статус завдання<br> 4. Менеджер отримує повідомлення про необхідність надати допомогу<br>5. Користувач бачить статус запиту "Чекає на допомогу"|

|ID| TASK.ASSIGN.REQUEST|
|:--|:--|
|Назва:|Вимога назначення|
|Учасники:|- Користувач<br>- Система<br>- Менеджер|
|Передумови:|- Користувач існує<br>- Користувач має необхідні права доступу до функціоналу системи<br>- Рформована заява<br>- Заяву можна обробити|
|Результат:|- Користувачу назначена відповідальна особа|
|Виключні ситуації:|- Заява не зареєстрована в базі заяв<br>- Неможливо обробити заяву|
|Основний сценарій:| 1. Користувач натискає відповідну кнопку<br>2. Система перевіряє коректність введених даних<br>3. Система створює запит та повідомляє менеджера<br>4. Менеджер отримує повідомлення про запит на призначення відповідальної особи<br>5. Користувач отримує повідомлення від системи|


|ID| TASK.ASSIGN.REQUEST.APPROVE|
|:--|:--|
|Назва:|Підтвердити обробку завдання, допомоги та іншого|
|Учасники:|- Користувач (Адміністратор)<br> - Система|
|Передумови:|- Користувач існує<br>- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Запит змінено на "Очікування назначення" або запис зміни допомога|
|Виключні ситуації:|- Неможливо відмінити запит на якщо коректно оброблений<br>- Запит не зареєстровано<br>- Необхідні дані не заповнені вірно|
|Основний сценарій:|1. Користувач натискає відповідну кнопку<br>2. Система змінює дані у базі даних<br>3. Користувач отримує повідомлення про зміну запиту|


|ID| TASK.ASSIGN.REQUEST.DECLINE|
|:--|:--|
|Назва:|Відхилити запит|
|Учасники:|- Користувач (Адміністратор)<br>- Менеджер<br>- Система|
|Передумови:|- Користувач існує<br>- Користувач має необхідні права доступу до функціоналу системи|
|Результат:|- Запит зазначено як "Відхилено"|
|Виключні ситуації:|- Запит не зареєстровано<br>- Необхідні дані не заповнено вірно|
|Основний сценарій:|1. Користувач повідомляє про необхідність змін<br>2. Користувач вказує причину відхилення<br>3. Система перевіряє дані, вказані користувачем<br>4. Система приховує дані з бази даних і переміщує на "Відхилено"<br>5. Користувач отримує повідомлення про статус запиту "Відхилено"|


|ID| TASK.REMOVE|
|:--|:--|
|Назва:|Видалення завдання|
|Учасники:|- Користувач <br>- Система|
|Передумови:|- Задача існує|
|Результат:|- Задачу видалено|
|Виключні ситуації:|- Користувач ввів некоректні дані <br>_TASK.ERRORS.INVALID_DATA_<br>- Задачі не існує<br>_TASK.ERRORS.NOT_EXIST_|
|Основний сценарій:| 1. Користувач натискає відповідну кнопку<br>2. Система перевіряє коректність введених даних<br>3. Система видаляє задачу<br>4. Користувач отримує повідомлення про видалення задачі|

|ID| USER.LOGIN|
|:--|:--|
|Назва:|Вхід користувача|
|Учасники:|- Користувач<br>- Система|
|Передумови:|- Користувач ввів логін та пароль<br>- Користувач зареєстрований в системі|
|Результат:|- Користувач отримав доступ до функціоналу системи згідно своєї ролі|
|Виключні ситуації:|- Користувач не зареєстрований в системі <br>_USER.ERRORS.NOT_EXIST_<br>- Користувач ввів невірний логін або пароль<br>_USER.ERRORS.INVALID_CREDENTIALS_|
|Основний сценарій:|1. Користувач вводить свої логін та пароль<br>2. Система перевіряє коректність введених даних<br>3. Система авторизує користувача в систему<br>4. Користувач отримує повідомлення про успішну авторизацію|

|ID| USER.REGISTRATION|
|:--|:--|
|Назва:|Реєстрація користувача|
|Учасники:|- Користувач<br>- Система|
|Передумови:|- Користувач не зареєстрований в системі|
|Результат:|- Користувач зареєстрований в системі|
|Виключні ситуації:|- Користувач вже зареєстрований в системі <br>_USER.ERRORS.ALREADY_EXISTS_<br>- Користувач ввів некоректні дані <br>_USER.ERR.INVORSALID_DATA_|
|Основний сценарій:|1. Користувач вводить свої логін та пароль<br>2. Система перевіряє коректність введених даних<br>3. Система реєструє користувача<br>4. Користувач отримує повідомлення про успішну реєстрацію|

|ID| BACKUP.CREATE|
|:--|:--|
|Назва:|Створення резервної копії даних|
|Учасники:|- Адміністратор<br>- Система|
|Передумови:|- Cистема підключена до мережі<br>- У системі є дані для резервного копіювання|
|Результат:|- Резервна копія даних системи створена
|Виключні ситуації:|- Проблеми з доступом до пам'яті<br> BACKUP.ERROR.IO<br>- Екстрене відключення з мережі<br>BACKUP.ERROR.NETWORK<br>- Недостатньо пам'яті на диску<br>BACKUP.ERROR.DISK_FULL| 
|Основний сценарій:|1. Адміністратор надає системі інструкції для створення резервної копії даних <br>2. Системний модуль обробляє запит від користувача <br>3. Система виконує запит та створює резервну копію даних<br>4. Адміністратор отримує .json файл резервної копії|

|ID| BACKUP.LOAD|
|:--|:--|
|Назва:|Загрузка з резервної копії даних|
|Учасники:|- Адміністратор<br>- Система|
|Передумови:|- Cистема підключена до мережі<br>- У системі є дані для резервного копіювання|
|Результат:|- Резервна копія даних системи створена
|Виключні ситуації:|- Проблеми з доступом до пам'яті<br> BACKUP.ERROR.IO<br>- Екстрене відключення з мережі<br>BACKUP.ERROR.NETWORK| 
|Основний сценарій:|1. Адміністратор надає системі інструкції для створення загрузки з резервної копії даних <br>2. Системний модуль обробляє запит від користувача <br>3. Система виконує запит та створює резервну копію даних<br>4. Адміністратор отримує .json файл резервної копії|

## Короткий огляд продукту

СУП(Система управління проєктами) - це комплексне програмне забезпечення, що включає планування завдань, планування, контроль цін та управління бюджетом, розподіл ресурсів, співпрацю, комунікацію, швидке управління, управління документами та системами та інші програми, які спільно використовуються для управління великими проектами.

## Функціональність:

Адміністратор/Менеджер або teamlead:

- Створити проєкт.
- Видалити проєкт.
- Додати учасника до проекту.
- Видалити учасника з проекту.
- Змінити статус учасника.
- Створити завдання.
- Видалити завдання.
- Змінити завдання.
- Призначення виконавця завдання.
- Змінити статус завдання.
- Показати артефакти.
- Створити резервну копію даних у форматі .JSON.
- Відновити дані проекту з формату .JSON.
- Запросити допомогу з завданням.
- Прийняти кандидатуру на виконавця завдання.

Розробник:

- Змінити статус завдання.
- Показати артефакти.
- Запросити допомогу з завданням.
- Прийняти завдання.
- Запросити заміну виконавця завдання.
- Видвинути свою кандидатуру на виконавця завдання.

## Надійність
Система повинна: 

- Володіти засобами захисту/шифровки даних користувачів та проєктів.
- Виконувати резервну копію даних.
- Обслуговувати велику кількість користувачів.
- Підтримувати зворотній зв'язок з користувачем.
## Продуктивність

Система повинна:
- Мати гарну швидкодію.
- Витримувати велику кількість задач в проєкті.
- Витримувати велику кількість учасників в проєкті.
-Блокувати спроби заспаму завданнями/учасниками.

## Експлуатаційна придатність
 
 1. Швидке усунення багів.
 2. Підтримка ПЗ, випуск оновлень.
 3. Оптимізація коду.
 4. Опрацювання та аналіз помилок.
