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

    To install all dependencies, use the following command:
    ```bash
    npm install
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

## API Endpoints

To handle incoming requests, the Express server is configured to parse JSON-formatted request bodies using the `express.json()` middleware. This is essential for the `POST /api/products` endpoint to be able to read the product data sent from the client.

### Create a Product (`POST /api/products`)
This endpoint is responsible for creating a new product and saving it to the database.

*   **Request Body**: The endpoint expects a JSON object in the request body containing the product's `name`, `price`, and `image`.
*   **Asynchronous Function**: The route handler is declared as an `async` function. This is crucial because interacting with a database is an I/O operation that takes time. Using `async/await` allows the server to handle other requests while waiting for the database to save the document, preventing the application from freezing.
*   **Process Flow**:
    1.  The server receives a `POST` request containing the new product's data in `req.body`.
    2.  It uses the `Product` Mongoose model to create a new product document.
    3.  The `await newProduct.save()` line attempts to save this new document to the MongoDB database. The result of the save operation (the saved document) is captured.
    4.  **Success**: If the product is saved successfully, the server responds with a `201 Created` status code, a success message, and the newly created product data. Returning the created document is a common REST API practice as it provides the client with the server-generated `_id` and `timestamps`.
    5.  **Failure**: The endpoint has two main error-handling paths:
        -   **`400 Bad Request`**: If the `name`, `price`, or `image` fields are missing from the request body, the server will respond with this status code.
        -   **`500 Internal Server Error`**: If an error occurs on the server while trying to save the product to the database, the server will respond with this status code.

*   **Testing with Postman**: You can test this endpoint using a tool like Postman. Send a `POST` request to `http://localhost:4000/api/products` with a `Content-Type` header of `application/json` and a raw JSON body like: `{"name": "My Product", "price": 10.99, "image": "image_url.jpg"}`.


### Update a Product (`PUT /api/products/:id`)
This endpoint is responsible for updating an existing product in the database.

*   **Route Parameter**: The `:id` in the path is a route parameter that captures the product's unique identifier. This `id` is expected to be a valid MongoDB ObjectId.
*   **Request Body**: The endpoint expects a JSON object in the request body containing the updated product data.
*   **Process Flow**:
    1.  The server receives a `PUT` request to update a product, with the product's `id` extracted from `req.params.id` and the new product data from `req.body`.
    2.  It uses `await Product.findByIdAndUpdate(id, product, { new: true })` to find and update the product. The result of the operation is captured to verify that a product was actually found. The `{ new: true }` option ensures that the updated product data is returned.
    3.  **Success**: If the product is found and successfully updated, the server responds with a `200 OK` status code, a success message, and the updated product data.
    4.  **Failure**:
        -   **`400 Bad Request`**: If the provided `id` is not a valid MongoDB ObjectId, the server responds with this status code. You can validate the id using `mongoose.Types.ObjectId.isValid(id)`.
        -   **`404 Not Found`**: If no product with the given `id` exists, `findByIdAndUpdate` returns `null`. The code checks for this and responds with a `404` status. This prevents the API from incorrectly reporting success for a non-existent product.
        -   **`500 Internal Server Error`**: If an error occurs on the server while trying to update the product, the server responds with this status code.


### Delete a Product (`DELETE /api/products/:id`)
This endpoint deletes a product from the database based on its ID.

*   **Route Parameter**: The `:id` in the path is the unique identifier of the product to be deleted.
*   **Process Flow**:
    1.  The server receives a `DELETE` request with the product's `id`.
    2.  It validates the `id` to ensure it's a valid MongoDB ObjectId.
    3.  It uses `await Product.findByIdAndDelete(id)` to find and remove the product. The result of this operation (the deleted document or `null`) is captured to verify that a product was actually found before deletion.
    4.  **Success**: If the product is found and deleted, the server responds with a `200 OK` status and a success message.
    5.  **Failure**:
        -   **`400 Bad Request`**: If the provided `id` is not a valid MongoDB ObjectId.
        -   **`404 Not Found`**: If no product with the given `id` exists, `findByIdAndDelete` returns `null`. The code checks for this and responds with a `404` status, ensuring the API accurately reflects that no product was deleted.
        -   **`500 Internal Server Error`**: If a server-side error occurs.


# Screenshots 
![alt text](image.png)