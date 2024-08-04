// src/components/Results.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Result (){
    const [results, setResults] = useState({ option1: 0, option2: 0 });

    useEffect(() => {
        const fetchResults = async () => {
            const response = await axios.get('http://localhost:5000/results');
            setResults(response.data);
        };

        fetchResults();
    }, []);

    return (
        <div>
            <h1>Voting Results</h1>
            <p>Option 1: {results.option1} votes</p>
            <p>Option 2: {results.option2} votes</p>
        </div>
    );
};

export default Result;

