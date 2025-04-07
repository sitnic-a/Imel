import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";
import { Welcome } from "./components/Welcome";
import { Register } from "./components/Register";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <main>
        <Router>
          <Routes>
            <Route index element={<Welcome />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
