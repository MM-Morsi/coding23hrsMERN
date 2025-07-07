# MERN Project Notes

## Project Setup

1.  **Module Type**: This project uses ES Modules. The `"type": "module"` property is set in `package.json`, which allows for the use of `import`/`export` syntax.

2.  **Dependencies**: The core dependencies were installed using npm:
    ```bash
    npm install express dotenv mongoose
    ```
    For development, `nodemon` is used to automatically restart the server on file changes. It was installed as a dev dependency:
    ```bash
    npm install -D nodemon
    ```

3.  **Environment Variables**: Configuration for the application is managed through a `.env` file in the project root. This file is loaded by the `dotenv` package.

    Create a `.env` file and add the necessary variables:
    ```
    PORT=4000
    ```
    **Note**: The `.env` file should be listed in `.gitignore` and should not be committed to version control.

## Running the Application

To start the server for development, use the `dev` script from `package.json`:

```bash
npm run dev
```

This command executes `node backend/server.js` to start the application.
This command executes `nodemon backend/server.js` to start the application using nodemon to reflect changes automatically.