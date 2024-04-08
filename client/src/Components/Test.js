import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {setCurrent} from '../redux/dataSlice.js'


const Test = () => {
    const dispatch = useDispatch();
    const currentImgs = useSelector((state)=> state.data.currentImgData)
    console.log(currentImgs);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/${'movies'}/${'1'}`);
                const jsonData = await response.json();
                dispatch(setCurrent(jsonData.data.hits))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className='grid-rows-3 grid-cols-3	grid w-1/3 h-1/5'>
            {currentImgs.map((img)=> (
                <div key={img.id} >
                    <img src={img.largeImageURL} className='w-full h-full'></img>
                </div>
            ))}
        </div>
    )
}

export default Test