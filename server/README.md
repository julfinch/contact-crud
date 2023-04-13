# SERVER

## SUMMARY:
1. `GET METHOD`
    ```shell
        app.get("/api/get", (req, res) => {
            const sqlGet = "SELECT * FROM contact_db";
            db.query(sqlGet, (error, result) => {
                res.send(result);
            });
        });
    ```
1. `POST METHOD`
    ```shell
        app.post("/api/post", (req, res) => {
            const {name, email, contact} = req.body;
            const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
            db.query(sqlInsert, [name, email, contact], (error, result) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    ```
1. `METHOD FOR GETTING THE ID`
    ```shell
        app.get("/api/get/:id", (req, res) => {
            const { id } = req.params;
            const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
            db.query(sqlGet, id, (error, result) => {
                if(error) {
                    console.log(error);
                }
                res.send(result);
            });
        });
    ```
1. `UPDATE METHOD`
    ```shell
        app.put("/api/update/:id", (req, res) => {
            const { id } = req.params;
            const { name, email, contact } = req.body
            const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
            db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
                if(error) {
                    console.log(error);
                }
                res.send(result);
            });
        });
    ```
1. `DELETE METHOD`
    ```shell
        app.delete("/api/remove/:id", (req, res) => {
            const { id } = req.params;
            const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
            db.query(sqlRemove, id, (error, result) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    ```
### INITIATE PROJECT
1. Create folder named `contact-book`, and inside it create a `server` folder. 
1. Type NPM init to initialize the project server and click ENTER consecutively until package.json is created.
    ```shell
        npm init
    ```
1. Install dependecies below:
    ```shell
        npm i body-parser cors express mysql2 nodemon
    ```
1. Create a new file called `index.js`
    ```shell
        const express = require("express");
        const app = express();
        const bodyParser = require("body-parser");
        const cors = require("cors");

        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        })
    ```
1. Go to `package.json` and add `nodemon server` under scripts.
    ```shell
        "server": "nodemon index.js",
    ```
1. Type `npm run server` in the terminal to run nodemon and start server.
1. Open `localhost:5000` in the browser and we will get `Cannot GET /`. 
1. Go back to `index.js` and let's try to get and connect `/` to the app:
    ```shell
        app.get("/", (req, res) => {
            res.send("Hello Express");
        })
    ```

### CREATING MYSQL DATABASE
1. Open **MySQL Workbench**, click **Local instance** and under **SCHEMAS**, right-click and then select **Create Schema**.
1. Write under name **crud_contact**, click Apply, click Apply again and then Finish. We should be able to see **crud_contact** already under **SCHEMAS**.
1. Under **SCHEMAS**, click dropdown for **crud_contact**, right-click on the **Table** and select **Create a Table**.
1. Set-up the following for our Table and click `Apply`, another `Apply` and then `Finish`.
    ```shell
        Table Name: contact_db
        Column Name-----------Datatype----------PK----NN----AI
        id--------------------INT---------------✅----✅---✅
        name------------------VARCHAR(100)-------------✅
        email-----------------VARCHAR(100)-------------✅
        contact---------------VARCHAR(45)--------------✅
    ```
1. To verify that our Table was create, click **crud_contact > Tables > contact_db**, right-click and select **Select Rows - Limit 100**.

### CONNECTING DATABASE TO THE SERVER
1. Go to `index.js` and setup mysql.
    ```shell
        const mysql = require("mysql2");

        const db = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "BuchokoyMysql.1990",
            database: "crud_contact"
        });
    ```
1. Update STEP 4 with the new code below:
    ```shell
        app.get("/", (req, res) => {
            const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('john doe', 'john@gmail.com', 12345553)";
            db.query(sqlInsert, (error, result) => {
                console.log("error", error);
                console.log("result", result);
                res.send("Hello Express");
            })
        })
    ```
1. On the MySQL Workbench under **contact_db**, click the third button at the top of the table with a ⚡ **lightning icon** to see if the data is inserted to the table. Our first data should appear in the table.
1. Go back to `index.js` and add the STEP 6 code:
    ```shell
        app.get("/api/get", (req, res) => {
            const sqlGet = "SELECT * FROM contact_db";
            db.query(sqlGet, (error, result) => {
                res.send(result);
            });
        });
    ```
1. Disable the `sqlInsert` for the mean time.
    ```shell
        app.get("/", (req, res) => {
            <!-- const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('john doe', 'john@gmail.com', 12345553)";
            db.query(sqlInsert, (error, result) => {
                console.log("error", error);
                console.log("result", result);
                res.send("Hello Express");
            }); -->
        });
    ```
1. Open browser and go to `localhost:5000/api/get` and we should be able to see the contents of our database already.
    ```shell
        [{"id":1,"name":"john doe","email":"john@gmail.com","contact":"12345553"}]
    ```
1. From here, we need to create the CLIENT side.

### POST METHOD
1. After doing the client side and successfully show the data from the server, set the POST method:
    ```shell
        app.post("/api/post", (req, res) => {
            const {name, email, contact} = req.body;
            const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
            db.query(sqlInsert, [name, email, contact], (error, result) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    ```

### DELETE METHOD
    ```shell
        app.delete("/api/remove/:id", (req, res) => {
            const { id } = req.params;
            const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
            db.query(sqlRemove, id, (error, result) => {
                if(error) {
                    console.log(error);
                }
            });
        });
    ```

### METHOD TO GET THE ID BEFORE UPDATING
    ```shell
        app.get("/api/get/:id", (req, res) => {
            const { id } = req.params;
            const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
            db.query(sqlGet, id, (error, result) => {
                if(error) {
                    console.log(error);
                }
                res.send(result);
            });
        });
    ```

### UPDATE METHOD
    ```shell
        app.put("/api/update/:id", (req, res) => {
            const { id } = req.params;
            const { name, email, contact } = req.body
            const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
            db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
                if(error) {
                    console.log(error);
                }
                res.send(result);
            });
        });
    ```