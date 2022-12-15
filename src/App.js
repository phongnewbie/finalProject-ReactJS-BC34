import logo from './logo.svg';
import './App.css';
import MainPage from './components/LayOut/MainPage';
// import './components/LayOut/main.css'
import LogIn from './Info/Account/LogIn';
import Register from './Info/Account/Register';
// import AllBody from './components/LayOut/AllBody';


import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from "./utils/history";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path="./Info/Account/LogIn.jsx" element={<LogIn/>}>
            <Route path="register" element={<Register/>}/>

          </Route>
        </Routes>

      </HistoryRouter>
        
    </div>
  );
}

export default App;
