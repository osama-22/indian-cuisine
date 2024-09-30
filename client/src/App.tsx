import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DishTable from './components/DishTable';
import DishDetails from "./pages/DishDetails";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => (
  <UserProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dishes/:name"
          element={
              <DishDetails />
          }
        />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;
