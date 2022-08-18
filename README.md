# Project_Blog

For this project, a blog system was created to register articles through the HTTP protocol (correct use of the HTTP verb) to create routes and render HTML files. This project is summarized through the creation and realization of the Login referring to the user in use, to acquire permission to use the site. Subsequently, the user can register a new Category of articles and register new articles for that category, or also register new articles in an existing category.

For this project, Node.js was used with Express.js for data manipulation. To render the HTML content, the EJS visualization engine was used. For the storage of registration data, such as user login data, categories and articles registered in the system, the MySQL database was used and the ORM Sequelize and MySQL Workbench were used to manipulate this data. Also, express-session, connect-flash were used to direct error and success messages to the executed tasks and also dotenv to camouflage the database password used.

IMPORTANT: To use this project, need to create a variable CONNECTIONSTRING  with password of the database in a file with name .env with localization in the root of project.
Exemple:
CONNECTIONSTRING = Password


