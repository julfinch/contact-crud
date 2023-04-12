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
        import { ToastContainer, toast } from 'react-toastify';
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