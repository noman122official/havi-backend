# **To-do list**

**Stack used :-**
|Software|  Version|
|--|--|
| Nodejs | v14.16.0 |
| MongoDB| v5.0.2 |

## Steps for Installation

 - Clone the repo
 - run `npm install` to install the dependencies.
 - Configure Below Environment Variables:
	 - MONGODB_USERNAME
	 - MONGODB_PASSWORD
	 - MONGODB_DB_NAME
	 - JWT_LOGIN_SECRET
	 - PORT (Default - 9200)
 - run `npm start` to start the backend server.
 
 - Try Acessing Below Endpoints:
	 - POST /register - to register a user using below payload
		 - `{
		 "fullname" : "John Doe",
		 "email" : "johndoe@gmail.com",
		 "dob" : "14-01-1984",
		 "phoneNumber" : "+911324523590",
		 "gender" : "male",
		 "password" : "password@123"
		 }`
		 
	 - POST /login - to authenticate a user
		 - `{"email" : "johndoe@gmail.com",
		 "password" : "password@123"
		 }`
		 
	 - POST /task - to create a task
		 - header - token (received from /login api)
		 - `{"name" : "Go for walk"}`
	 - GET /task - to get all the task of a user
		 - header - token (received from /login api)
	 - To create admin user add a boolean `isAdmin : true` in /register payload
	 - GET /admin/users - to get list of all users
		 - header - token (recieved from login api, with `isAdmin = true`)
	


## Registration Validation Document

For registeration, there are following Constraints:

 - Password: Should have more than 8 characters
 - Email : Should be Compliant with Regex : `/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`
 - Phone Number: Should be compliant with Regex : `/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/`
