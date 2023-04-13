# CLIENT

## SUMMARY:
1. `GET METHOD`
    ```shell
        const loadData = async () => {
            const response = await axios.get("http://localhost:5000/api/get");
            setData(response.data);
        }
    ```

2. `POST METHOD`
    ```shell
        axios.post("http://localhost:5000/api/post", {
            name,
            email,
            contact,
        })
        .then(() => {
            setState({ name: "", email: "", contact: ""});
        })
        .catch((err) => toast.error(err.response.data));
    ```

3. `UPDATE METHOD`
    ```shell
        axios.put(`http://localhost:5000/api/update/${id}`, {
            name,
            email,
            contact,
        })
        .then(() => {
            setState({ name: "", email: "", contact: ""});
        })
        .catch((err) => toast.error(err.response.data));
    ```

4. `DELETE METHOD`
    ```shell
            const deleteContact = (id) => {
            if(window.confirm("Are you sure you want to delete the contact?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact deleted successfully");
            setTimeout(() => loadData(), 500);
            }
        } 
    ```

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

1. Setup the `Home.js`
    ```shell
        import React,{ useState, useEffect } from 'react'
        import {Link} from 'react-router-dom';
        import './Home.css';
        import {toast} from 'react-toastify';
        import axios from 'axios';

        const Home = () => {
        const [data, setData] = useState([]);

        //GET METHOD
        const loadData = async () => {
            const response = await axios.get("http://localhost:5000/api/get");
            setData(response.data);
        }

        useEffect(() => {
            loadData();
        }, [])
        
        //DELETE METHOD
        const deleteContact = (id) => {
            if(window.confirm("Are you sure you want to delete the contact?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact deleted successfully");
            setTimeout(() => loadData(), 500);
            }
        } 

        return (
            <div style={{marginTop: '150px'}}>
            <Link to='/addContact'>
                <button className='btn btn-contact'>Add Contact</button>
            </Link>
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
                        <button className='btn btn-delete' onClick={() => deleteContact(item.id)}>Delete</button>
                        
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

1. Setup the `AddEdit.js`

    ```shell
        import React, {useState, useEffect} from 'react'
        import {useNavigate, useParams, Link} from 'react-router-dom';
        import './AddEdit.css';
        import axios from 'axios';
        import {toast} from 'react-toastify';

        const initialState = {
            name: "",
            email: "",
            contact: "",
        };

        const AddEdit = () => {
            const [state, setState] = useState(initialState);
            const {name, email, contact} = state;
            const navigate = useNavigate();
            const { id } = useParams();

            // GET USER INFORMATION USING THE ID
            useEffect(() => {
            axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setState({...resp.data[0] }));
            }, [id])
            

            const handleSubmit = (e) => {
                e.preventDefault();
                if(!name || !email || !contact) {
                    toast.error("Please provide value into each input field");
                } else {
                    // POST METHOD 
                    if (!id) {
                        axios.post("http://localhost:5000/api/post", {
                            name,
                            email,
                            contact,
                        })
                        .then(() => {
                            setState({ name: "", email: "", contact: ""});
                        })
                        .catch((err) => toast.error(err.response.data));
                    toast.success("Contact added successfully")
                    } else {
                        // UPDATE METHOD USING ID
                        axios.put(`http://localhost:5000/api/update/${id}`, {
                            name,
                            email,
                            contact,
                        })
                        .then(() => {
                            setState({ name: "", email: "", contact: ""});
                        })
                        .catch((err) => toast.error(err.response.data));
                    toast.success("Contact updated successfully")
                    }
                    
                    setTimeout(() => navigate("/"), 500);
                }
            };

            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setState({ ...state, [name]: value });
            };

            return (
            <div style={{marginTop: '100px'}}>
                <form style={{
                    margin: 'auto',
                    padding: '15px',
                    maxWidth: '400px',
                    alignContent: 'center'
                }}
                onSubmit={handleSubmit}
                >
                    <label htmlFor='name'>Name</label>
                    <input 
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Your Name...'
                    value={name || ""}
                    onChange={handleInputChange}
                    />

                    <label htmlFor='email'>Email</label>
                    <input 
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Your Email...'
                    value={email || ""}
                    onChange={handleInputChange}
                    />

                    <label htmlFor='contact'>Contact</label>
                    <input 
                    type='number'
                    id='contact'
                    name='contact'
                    placeholder='Your Contact No.'
                    value={contact || ""}
                    onChange={handleInputChange}
                    />
                    <input type='submit' value={id ? 'Update' : 'Save'} />
                    <Link to="/">
                        <input type='button' value="Go Back"/>
                    </Link>
                </form>
            </div>
        )
        }

        export default AddEdit
    ```

1. Setup the `View.js`
    ```shell
        import React,{ useState, useEffect } from 'react'
        import { useParams, Link } from 'react-router-dom';
        import axios from 'axios';
        import './View.css';

        const View = () => {
            const [user, setUser] = useState({});

            const {id} = useParams();

            // GET USER INFORMATION USING THE ID
            useEffect(() => {
                axios.get(`http://localhost:5000/api/get/${id}`)
                .then((resp) => setUser({...resp.data[0] }));
            }, [id])
            

            return (
                <div style={{marginTop: '150px'}}>
                    <div className="card">
                        <div className="card-header">
                            <p>User Contact Detail</p>
                        </div>
                        <div className="container">
                            <strong>ID: </strong>
                            <span>{id}</span>
                            <br />
                            <br />
                            <strong>Name: </strong>
                            <span>{user.name}</span>
                            <br />
                            <br />
                            <strong>Email: </strong>
                            <span>{user.email}</span>
                            <br />
                            <br />
                            <strong>Contact: </strong>
                            <span>{user.contact}</span>
                            <br />
                            <br />
                            <Link to="/">
                                <div className="btn btn-edit">Go Back</div>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        export default View
    ```