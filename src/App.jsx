import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VotingPage from './pages/VotingPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vote" element={<VotingPage />} />
            </Routes>
        </Router>
    );
}

export default App; 