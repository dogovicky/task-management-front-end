import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import AddTask from "./pages/add_task/AddTask";
import UpdateTask from "./pages/update_task/UpdateTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/task/:taskId" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
