## Well Come To Create Tasks

* "Create Task" is a simple yet functional project focused on implementing CRUD (Create, Read, Update, Delete) operations. It allows users to manage tasks efficiently by adding new tasks, viewing the task list, updating existing tasks, and deleting tasks as needed. The project demonstrates a practical application of basic operations in a user-friendly interface. It is ideal for understanding the core concepts of CRUD functionality in web development.

* live link : https://createtask-4e8f4.web.app/
* client site github : https://github.com/Masudur400/create-task
* server site github : https://github.com/Masudur400/create-task-server
 ## Technologies
 * Html,
* CSS,
* Tailwind Css,
 * JavaScript,
* React,
* Node.js,
* Express.js,
* MongoDB,
* Firebase, 
 
 ## Run Locally
 * npm i 
 * npm run dev


## impotent for server
{
    "version": 2,
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "index.js",
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
      }
    ]
  }