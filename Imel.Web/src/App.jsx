import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";
import { Welcome } from "./components/shared/Welcome";
import { Register } from "./components/shared/Register";
import { Login } from "./components/shared/Login";
import { Dashboard } from "./components/shared/Dashboard";
import { RequireAuth } from "./components/shared/RequireAuth";
import "./App.css";
import { UpdateUser } from "./components/user-components/UpdateUser";
import { LogPreview } from "./components/sensitive-data/LogPreview";
// import { Loader } from "./components/shared/Loader";

function App() {
  return (
    <Provider store={store}>
      <main>
        {/* <Loader /> */}
        <Router>
          <Routes>
            <Route index element={<Welcome />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="user/:id" element={<UpdateUser />}></Route>
              <Route path="/audit/master/logs" element={<LogPreview />}></Route>
            </Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
