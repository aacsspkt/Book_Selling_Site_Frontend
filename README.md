# B-Share (Book Selling E-commerce Site)
This is Book Selling E-commerce website created by using MERN stack (Mongo-Express-React-NodeJs). 

## Table of contents
* [General info](#general-info)
* [Preview](#preview)
* [Links for repo](#links-for-repos)
* [Main technologies and libraries used](#main-technologies-and-libraries-used)
* [Setup](#setup)

## General info
With this site, a user can sell new as well as old books to any user. This website only provide platform to share information. So, transaction of any books will be done by users from the phone no or email address of their own.

## Preview
<div align="center">
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/splash_screen_user.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/Login.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/signup.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/home_user.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/donate_user.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/confirm_location.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/googlemap.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/Log.jpg" width="300px"</img> 
    <img src="https://github.com/rakesh-gyawali/FooDonate_User/blob/master/screenshots/profile_user.jpg" width="300px"</img>
</div>

## Main features
1. Management of book and category details: like title, description, condition etc and category name. This information is stored in database. This feature is required for storing book detail added by user.
2. Management of User details like username and password in database. Each user will be assigned with roles either normal or admin. Admin will be able to add new category and district details.
3. Management of Profile details like first name, last name, profile photo, address and contact. 
3. Login authentication system where user have to enter correct username and password. JWT Web Token is used for authentication.
4. Handling API requests like GET, DELETE, PUT and POST.

## Links for repos
* Frontend: https://github.com/rakesh-gyawali/Book_Selling_Site_Frontend.git
* Backend: https://github.com/rakesh-gyawali/Book_Selling_Site_Backend.git

## Main technologies and libraries used
* react version: 16.13.1
* react-dom version: 16.13.1
* react-router-dom version: 5.2.0
* react-scripts version: 3.4.1
* axios version: 0.19.2
* jwt-decode version: 2.2.0

## Setup
1. Clone all the repos listed above.
2. Open the backend root folder with terminal and enter `npm install`
3. Create file named ".env" in backend root folder and copy-paste, change the values and save.
```
Port=3001 
dbURI='YOUR_MongoDB_URL'
SECRET='REPLACE_WITH_ANY_CHARACTERS'
```
4. Enter 'npm start' to run the server.
5. Open your favouriate API client e.g. postman. Send POST request with given JSON data to this URL `http://localhost:3001/api/users/register/` in order to create ADMIN account.
```
{
  "username": "SET_USERNAME_OF_YOUR_CHOICE",
  "password": "SET_PASSWORD_OF_YOUR_CHOICE",
  "email": "SET_EMAIL_OF_YOUR_CHOICE",
  "role": "admin" 
}
```
6. Login Admin account by sending POST request with given JSON data to this URL `http://localhost:3001/api/users/login/` to get Authentication Token in response. 
```
{
  "username": "USERNAME",
  "password": "PASSWORD", 
} 
```
12. Copy Token from response and set the token to header as given below (Advanced REST Client was used)
![image](https://user-images.githubusercontent.com/41475122/126030830-7d8cce1a-21ff-4de2-9190-a5fc4d728d8c.png)
13. Send Post request with given JSON data to this URL `http://localhost:3001/api/districts` in order to add a district data. District data is required to create a profile for user later. 
```
{
  "name": "Kathmandu" 
}
```
15. Open root folder of front end and enter `npm install` in terminal.
16. Enter `npm start` to run the website. 
17. To register a user click signup from the menu and fill all the fields.
18. Then, go to Login page and fill username and password.
19. Create profile to post book you want to sell. 
