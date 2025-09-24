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
