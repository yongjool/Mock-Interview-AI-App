import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Using axios instead of fetch
        axios.get('http://localhost:4000/api')
            .then((response) => {
                // Extract the message from the response and set it
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error("There was an error fetching the message!", error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default App;

