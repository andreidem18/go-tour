<img src="gotour-logo.png" width="200" >

# GoTour

GoTour is an app to manage tours. Contains features for booking experiences, with user profiles, reviews, and real-time updates.

It have three subprojects: 
* User (Angular): where people can see the tours, can book them and review them. https://gotour.andrescode.com/
* Admin (Angular): app to manage the tours, can create, and update tours, and handle the bookings and reviews. https://gotour-admin.andrescode.com/
* Backend (Node): It manages the database, receives the requests and handle all the logic of the app.
Documentation: https://documenter.getpostman.com/view/17877993/2s9YXe957y

## Steps to run

### 1. Backend
1. Install the dependencies `npm i`
2. Set the environment variables of the `.env.example`
3. Run the project with `npm run dev`
4. Run the migrations with `npx sequelize db:migrate`


### 2. Admin
1. Install the dependencies `npm i`
2. Set the environment variables of the `.env.example`
3. Configure the environment variables with `npm run envs`
4. Run the project with `ng serve`

### 3. User
1. Install the dependencies `npm i`
2. Set the environment variables of the `.env.example`
3. Configure the environment variables with `npm run envs`
4. Run the project with `ng serve`

## Arquitecture and Docs

* [User Application Architecture](user\docs\arquitecture.md)
* [Admin Application Architecture](admin\docs\arquitecture.md)
* [Backend Architecture](backend\docs\arquitecture.md)
