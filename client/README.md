# CLIENT

### INITIATE PROJECT
1. In the new terminal, type `npx create-react-app client`.
1. Go to the client by typing `cd client`.
1. Install dependencies:
    ```shell
        npm i react-router-dom axios react-toastify
    ```
1. Setup `react-toastify` by pasting:
    ```shell
        import { ToastContainer } from 'react-toastify';
        import 'react-toastify/dist/ReactToastify.css';
        import './App.css';

        function App() {
        return (
            <div className="App">
            <ToastContainer position="top-center"/>
            <h2>Hello React</h2>
            </div>
        );
        }

        export default App;
    ```
1. Start project with `npm start`.

### CREATE FRONT-END
1. Open `App.js` and add the following:
    ```shell
        import { BrowserRouter, Routes, Route } from 'react-router-dom';
        import { ToastContainer } from 'react-toastify';
        import 'react-toastify/dist/ReactToastify.css';
        import './App.css';
        import Home from "./pages/Home";

        function App() {
        return (
            <BrowserRouter>
            <div className="App">
                <ToastContainer position="top-center"/>
                <Routes>
                <Route exact path="/" element={<Home/>} />
                </Routes>
            </div>
            </BrowserRouter>
        );
        }

        export default App;
    ```
1. Under `src folder`, create a `pages folder` and also the files under it, `Home.js` and `Home.css`.
    ```shell
        import React,{ useState, useEffect } from 'react'
        import {Link} from 'react-router-dom';
        import './Home.css';
        import {toast} from 'react-toastify';
        import axios from 'axios';

        const Home = () => {
        const [data, setData] = useState([]);

        const loadData = async () => {
            const response = await axios.get("http://localhost:5000/api/get");
            setData(response.data);
        }

        useEffect(() => {
            loadData();
        }, [])
        

        return (
            <div style={{marginTop: '150px'}}>
            <table className='styled-table'>
                <thead>
                <tr>
                    <th style={{textAlign: 'center'}}>No.</th>
                    <th style={{textAlign: 'center'}}>Name</th>
                    <th style={{textAlign: 'center'}}>Email</th>
                    <th style={{textAlign: 'center'}}>Contact</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                    return (
                    <tr key={item.id}>
                        <th scope='row'>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>
                        <Link to={`/update/${item.id}`}>
                            <button className='btn btn-edit'>Edit</button>
                        </Link>
                        <Link to={`/delete/${item.id}`}>
                            <button className='btn btn-delete'>Delete</button>
                        </Link>
                        <Link to={`/view/${item.id}`}>
                            <button className='btn btn-view'>View</button>
                        </Link>
                        
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        )
        }

        export default Home
    ```
1. Go back to the `server` folder and add the  `post method` inside `index.js`.
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
