import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";
import { Welcome } from "./components/Welcome";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import "./App.css";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <Provider store={store}>
      <main>
        <Router>
          <Routes>
            <Route index element={<Welcome />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
