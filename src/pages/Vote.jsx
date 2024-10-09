import React, { useState } from 'react';
import axios from 'axios';

function Vote(){
    const [vote, setVote] = useState('');
    const [message, setMessage] = useState('');

    const handleVote = async () => {
        try {
            const response = await axios.post('https://votingjs-backend.onrender.com/vote', { vote });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error casting vote!');
        }
    };

    return (
        <div>
            <h1>Cast Your Vote</h1>
            <div>
                <input 
                    type="radio" 
                    value="Option1" 
                    checked={vote === 'Option1'} 
                    onChange={(e) => setVote(e.target.value)} 
                /> Option 1
            </div>
            <div>
                <input 
                    type="radio" 
                    value="Option2" 
                    checked={vote === 'Option2'} 
                    onChange={(e) => setVote(e.target.value)} 
                /> Option 2
            </div>
            <button onClick={handleVote}>Vote</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Vote;
