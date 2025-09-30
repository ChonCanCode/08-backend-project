# 08-Backend-project-Project-2

## Daily progress

### 20250919 - File creation/configeration

1. Installing Node Version Manager - https://github.com/nvm-sh/nvm?tab=readme-ov-file

   - Why is it important? Why do we need it in this project?

2. File creation

```
-Project 2
    |-public
    |-src
        |- middleware
            |- authRoutes.js
        |- routes
            |- authRoutes.js
            |- todoRoutes.js
    |- .env
    |- package.json
    |- README.md
    |- todo-app.rest
```

3. What is 'npm install express bcryptjs jsonwebtoken'?

### 20250920 - Modern modules, static assets, \_\_dirname, res.sendFile, Path structure, env.PORT

1. Modern modules: import/export vs require.

2. Serving static assets with express.static().

3. Using \_\_dirname in ES Modules (fileURLToPath + path.dirname).

4. Sending full files (res.sendFile) instead of inline HTML.

5. Cleaner file/project structure (/public).

6. Environment variables (process.env.PORT) for flexible deployment.

### 20250921 - Code review

1. import path, { dirname } from "path",

   - "path" is a Node.js core module. It helps you work with filesystem paths in a cross-platform way (winodow, macOC, Linus).

     - path.join() - joins path segments correctrly from the current OS.
     - path.resolves() - resolveos absolute paths.
     - path.diraname(file) - gets the directory part of a path string.
     - path.basename(file) - get just the filename.
     - path.extname(file) - gets a file's extension.

   - Why path and { dirname }?
     - "path" This gives your the whole path module object, with all its functions inside like above.
     - Named export { dirname } instead of accessing path.dirname(...) you can directly import dirname as a named import.

2. Naming convention & special built-in variables: "\_\_dirname" & "\_\_filename"

   - Node.js inject them automatically + Global variable in every module without needing to import or require. + Have a special meaning tried to the environment
   - In this code here both "\_\_dirname" & "\_\_filename" are naming convetion to let other develope know provided by the enviornment/runtime. This means the context will be given to your code automatically by Node.js or the browser.

3. Term "environment" meaning & enviornment vairables

   - An environment is the context where your code is executed it define:
     - What global object/ variables are available
     - What APIs you can use
     - How code is loaded and run
   - "const PORT = process.env.PORT || 5000;"
     - "process.env" - 'process' is a global object in Node.js that represnts the current Node.js process (the running instance of your app). 'process.env' is an object containing all the environment variables availabel to that process.
     - Environment variables are key-vale paris that the operating system or the runtime provdes to configure your program.

4. 'import { fileURLToPath } from "url";'
   - URL = Uniform Resource Locator → basically a “link” or “address” that tells you where a resource is located.
   - Path = is the location of a file or folder in your filesystem.
   - "url" is a Node.js built-in module provides the following functions:
     - fileURLToPath - converts a file URL to a normal path
     - URL - class for creating and parsing URLS.
     - pathToFileURL - converts a filesystem path to a file URL>
5. 'import.meta.url'
   - 'import.meta' - a special built-in object that contains metadata about the current ES Module.
   - 'import.meta.url' - the URL of the current module file
6. app.use(express.static(path.join(\_\_dirname, "../public")))

   - After the 'index.html' is loaded it will enable to obtain other files in the same folder
   - It tells Express - If aa reqeuest comes in for a file, look inside the "../public" and serve it automatically if it exists.

### 20250924 - SQLite

1. What is SQLite?

   - A Lightweight, embedded, relational database management system (RDBMS). It is simple, self-contained and serverless.

2. `import { DatabaseSync } from "node:sqlite";`:

   - Importing the synchronous SQLite databse class from the `node:sqlite` package.
   - `DatabaseSync` enable you to work with SQLite in a blocking (synchronous) way, instead of asynchronous promises/callbacks.

3. `const db = new DatabaseSync(":memory:");`:

   - `new DatabaseSync(":memory")` creates a temporary in-memory databse that exists only ywhen your program runs.
     - `new` JS does 4 things under the hood, you need this when calling a class or a constructuor function that is designed to initilise an object:
       1. Create a new object `{}`
       2. Sets the object's prototype to `something.prototype`
       3. Runs the `DatabaseSync()` function as a constructuor
       4. Return the new object

4. Create the `users Table

   ```
      db.exec(`
         CREATE TABLE user(
         id INTEGER,
         username TEXT UNIQUE,
         password TEXT
         )
      `);
   ```

- `db.exec()` executes raw SQL statements.
- `CREATE TABLE user (...)` defines a new table named user with columns:
  - `id INTEGER` > a number field
  - `username TEXT UNIQUE` > a text field that must be unique (no tow users can have the same username).

### 20250927 - Understand endpoint better, and how middleware work like if.. then...

1. What is `endpoint` and what is it important in backend?

- An `endpoint` is a specific URL route in your backend that your frontend or client can talk to. It usually responds to a particular HTTP method (`GET`,`POST`,`PUT`,`DELETE`, etc)

2. `app.use(...)`

- Is like a filter if it matching its requirement it will perform a certain function, so it will take in all information first then decide whether to react.

  - `app.use(express.json())` does not blindly parse every incoming request, it only acts on requests that have

    ```
    http

    content-type: application/json
    ```

  - `app.use(express.static(...))` if request matches a static file, sersve it.
  - `app.use("/auth", authRoutes)` If the incoming request path starts with /auth, Express will forward it to the authRoutes router.

### 20250928 - Moving on to todo, learning bcrypt

1. `todo-app.rest` emulation, ensuring both register and login have endpoint enabling with a location for them to reach e.g.

   ```
   router.post("/register", (req, res) => {
   const { username, password } = req.body;
   console.log(username, password);
   res.sendStatus(201);
   });
   ```

2. Leaning how to `encrypt` the password

```
import bcrypt from "bcryptjs";

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
});
```

1.  `import bcrypt from "bcryptjs";`

- importing bcryptji libaray which is a JS implementation of the bcrypt algorithm.
- bcrypt is a hashing function designed for securely storing passwords, hashing function is special type of mathematical function that takes an input and turns it into a fixed-length string of characters usually looking random.
-

2. `const { username, password } = req.body;`

- This extrac the usesrname and password from the JSON content which parsed via middelware `app.use(express.json())`.

3. `const hashedPassword = bcrypt.hashSync(password, 8)`

- It returns a hashed version of the passwrod.
- `password` the plane password from the user
- `8` -> teh salt rounds (also called cost factor)
  - it tells bcrypt how many times to process teh data.
  - Higher number = more secure by slower
  - common values: 8 - 12
- `hashSync` means it runs synchronously (blocking). There's also `hash` (async, uses, callbacks or promises).

### 20250929 - Code review authRoutes.js

1. `.Router()`, `jwt/jsonwebtoken`,

```
js

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
```

- `express.Router()` - creates a mini-router object that you can mount insdie your main server (`app.use("/auth", router)` for example)
  - It is like a mini Express app that only handles routes and middleware.
  - Instead of putting everything in to `server.js` or `app.js`, you group related routes into separarte files.
  - Then you "mount" that router into your main app wiht `app.use()`
  - Avoid multiple servers, if calling `express()` in every route file, you would be making multiple app instances. Only one app should call `.listen()` to start the server.
  - `express.Router()` designed to be mounted onto your main app.
- `jsonwebtoken`(`jwt`) - Is a library to generate tokens so users can stayed logged in without sending their password every time.

2. `db.prepare(...)`, `VALUES (?, ?)`

```
js

const insertUser = db.prepare(
  `INSERT INTO users(username, password) VALUES (?, ?)`
);
insertUser.run(username, hashedPassword);
```

- Uses ? placeholders to prevent SQL injection.
- if user signs up with `username = "hacker'); DROP TABLE users; --"`

```
sql

INSERT INTO users(username, password)
VALUES ('hacker'); DROP TABLE users; --', 'hashedpass'

```

### 20250930 - Code review

1. `try {...} catch (err) {...}`
   1. `try {...}` block
      - JS executes everything inside the `try` block normally.
      - If everything succeeds, it moves on and the `catch` block is ignored.
   2. If an error happens (e.g., database insert fails, JWT signing throws an eroor, etc.):
      - JS immediately jumps out of the `try` block.
      - It skips the rest of the code in `try`.
      - Then it executes the `catch (err) {...}`block.
2. `.lastInsertRowid`

   - We are using better-sqlite3(`db.prepare(...).run(...)`)
   - When we call `.run(...)` on an `INSERT` statement, it returns an object like this:

     ```
     js

     {
        chenges: 1, // how many rows were inserted/updated/deleted
        lastInsertRowid: 5 // the ID (primary key) of the last inserted row.
     }
     ```

   - `lastInsertRowid` give you the new user's unique ID (the value of their `id` column, assuming `users.id` is `INTEGER PRIMARY KEY AUTOINCREMENT`)
