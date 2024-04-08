import React from 'react'
import { useEffect } from "react";

const Test = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/${'movies'}/${'1'}`);
                const jsonData = await response.json();
                console.log(jsonData);
                // setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    
    return (
        <div>Test</div>
    )
}

export default Test