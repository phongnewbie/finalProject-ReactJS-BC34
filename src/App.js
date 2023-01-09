import "./App.css";

import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./utils/history";
import "antd/dist/reset.css";

import LogIn from "./Info/Account/LogIn";
import Register from "./Info/Account/Register";
import TrangChu from "./templates/trangChu/TrangChu";
import IndexCyberbugs from "./components/Cyberbugs/IndexCyberbugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import FormEditProject from "./components/Forms/FormEditProject";
import DrawerCyber from "./HOC/DrawerCyber";
import UserCyberbugs from "./components/Cyberbugs/UserCyberbugs/UserCyberbugs";
import DemoDragDrop from "./pages/DemoDragDrop/demoDragDrop";
import FormEditUser from "./components/Forms/FormEditUser";

function App() {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <DrawerCyber />
        <Routes>
          <Route>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<TrangChu />}>
            <Route path="/" element={<ProjectManagement />} />
            <Route path="/indexcyberbugs" element={<IndexCyberbugs />} />
            <Route path="/projectdetail/:id" element={<IndexCyberbugs />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/formeditproject" element={<FormEditProject />} />
            <Route path="/user/formedituser" element={<FormEditUser />} />
            <Route path="/demoDragDrop" element={<DemoDragDrop />} />
            <Route path="/user" element={<UserCyberbugs />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
