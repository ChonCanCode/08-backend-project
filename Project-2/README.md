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
