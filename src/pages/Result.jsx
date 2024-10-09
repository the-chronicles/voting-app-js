import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result (){
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await axios.get('https://votingjs-backend.onrender.com/results');
            setResults(response.data);
        };
        fetchResults();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Voting Results</h1>
            <table style={{ margin: '0 auto', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result => (
                        <tr key={result.id}>
                            <td>{result.name}</td>
                            <td>{result.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Result;

