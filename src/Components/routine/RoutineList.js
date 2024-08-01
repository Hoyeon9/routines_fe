import React, { useEffect, useState } from "react";
import Routine from "./Routine";

export default function RoutineList(){
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const userId = sessionStorage.getItem('userId')
    const [routines, setRoutines] = useState([]);
    useEffect(()=>{
        fetch(`${serverAddress}/api/routine/all?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            return res.json();
        })
        .then(data => {
            setRoutines(data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])
    return (
        <div className="routine-list-container">
            {userId ? <div className="routine-list">
                {routines.map((routine, idx) => <Routine key={idx} name={routine.routineName} desc={routine.routineDesc} />)}
            </div>
             : <div className="error-page">404</div>}
        </div>
    )
}