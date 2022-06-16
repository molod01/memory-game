import MemoryGame from './components/MemoryGame/MemoryGame'
import Layout from './components/Layout';
import Home from './components/Home/Home';
import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route path="game" element={<MemoryGame />}/>
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
