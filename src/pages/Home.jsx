import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleStartVoting = () => {
        navigate('/vote');
    };

    return (
        <div>
            <h1>Welcome to Hot or Not</h1>
            <button onClick={handleStartVoting}>
                Start Voting
            </button>
        </div>
    );
}

export default Home; 