import {Routes, Route, Link,} from "react-router-dom"
import Detail from "./pages/Detail";
import NewQuestion from "./pages/NewQuestion";
import Questions from "./pages/Questions";
function App() {
  return (
    <div className="App">
    <Link to="/" >Questions</Link>
    <Link to="/new" >New Questions</Link>
    <hr />
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/new" element={<NewQuestion />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
    </div>
  );
}

export default App;
