// 1. Setup express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// 5. Connect MySQL databse to the Backend
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "BuchokoyMysql.1990",
    database: "crud_contact"
});

// 2. Setup other dependencies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// 6.  Access the database from the browser
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

// 7. POST METHOD for adding data
app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// 8. DELETE METHOD for deleting data
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

// 9. GETTING THE ID FIRST BEFORE UPDATING
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

// 10. UPDATE METHOD
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

// 4. Get / from the localhost browser and use it.
// app.get("/", (req, res) => {
//     res.send("Hello Express");
// })

// 5. Update STEP 4 to Connect MySQL database to the Backend
app.get("/", (req, res) => {
    // 6. Disable first all the contents inside here when doing Step 6 above.
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('john doe', 'john@gmail.com', 12345553)";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

// 3. Setup localhost
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})