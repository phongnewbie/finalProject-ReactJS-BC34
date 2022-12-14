import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history";
import "antd/dist/antd.css";

import LogIn from "./Info/Account/LogIn";
import Register from "./Info/Account/Register";
import TrangChu from "./templates/trangChu/TrangChu";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<TrangChu />} />
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
