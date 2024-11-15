import { useState } from 'react';
import { ethers } from 'ethers';

function VotingInterface() {
    const [contestants, setContestants] = useState([]);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const handleVote = async (contestantId) => {
        try {
            // Connect to wallet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Contract interaction
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            await contract.vote(contestantId, selectedAmount);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contestants.map(contestant => (
                <div key={contestant.id} className="card">
                    <img src={`https://ipfs.io/ipfs/${contestant.imageHash}`} />
                    <input
                        type="number"
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(e.target.value)}
                    />
                    <button onClick={() => handleVote(contestant.id)}>
                        Vote with Tokens
                    </button>
                </div>
            ))}
        </div>
    );
} 