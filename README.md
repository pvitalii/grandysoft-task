# Grandysoft Junior Node.Js developer task

### Instructions for deployment and run:
1. Clone repo into your root folder <b>git clone https://github.com/pvitalii/grandysoft-task.git</b>
2. Go to the repo folder <b>cd grandysoft-task</b>
3. Install npm packages <b>npm install</b>
4. Run app in production enviroment <b>npm run prod</b>
5. In another terminal do <b>cd grandysoft-task/src/database</b> 
6. Run migration script <b>npx sequelize db:migrate --env production</b>
7. Run seed script <b>npx sequelize db:seed:all --env production</b>