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

3.  **Environment Variables**: Configuration for the application is managed through a `.env` file in the project root. The `dotenv.config()` function reads this file and loads the variables into Node.js's `process.env` object.

    Create a `.env` file and add the necessary variables:
    ```
    PORT=4000
    MONGO_URI=<your_mongodb_uri>
    ```
    note that we added /products in the URI as the database is targeting a products page not the application home page. Note that we created a cluster and a project on mongodb where we got the connection string.
    * Note tha the network access is restricted to the IP of the device you are working on. 
    * I allowed access from everywhere for this project 


    **Note**: The `.env` file should be listed in `.gitignore` and should not be committed to version control.

4.  **Database Connection**: The connection logic is in `backend/config/db.js`. The application connects to MongoDB before starting the Express server. If the connection fails, the process will exit.

5.  **Data Models**: The application uses Mongoose to define schemas for the data. The models are located in the `backend/models` directory.
    -   **Product Model**: Located at `backend/models/product.model.js`, this schema defines the structure for products, including `name`, `price`, and `image` fields, along with timestamps.

## Running the Application

To start the server in **development mode** (which will automatically restart on file changes), use the `dev` script:
```bash
npm run dev
```

This command executes `node backend/server.js` to start the application.
This command executes `nodemon backend/server.js` to start the application using nodemon to reflect changes automatically.


# Screenshots 
![alt text](image.png)