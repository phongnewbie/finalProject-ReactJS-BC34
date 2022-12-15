import "./App.css";

import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from "./utils/history";
import 'antd/dist/reset.css';

import LogIn from "./Info/Account/LogIn";
import Register from "./Info/Account/Register";
import TrangChu from "./templates/trangChu/TrangChu";
import IndexCyberbugs from "./components/Cyberbugs/IndexCyberbugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path="./Info/Account/LogIn.jsx" element={<LogIn/>}>
            <Route path="register" element={<Register/>}/>
          </Route>
          <Route path="/" element={<TrangChu />}>
            <Route path="/" element={<IndexCyberbugs />} />
            <Route path="/createproject" element={<CreateProject />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
