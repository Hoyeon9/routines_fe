import React, { useEffect, useState } from "react";
import Routine from "./Routine";

export default function RoutineList(){
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const userId = sessionStorage.getItem('userId')
    const [routines, setRoutines] = useState([]);
    const [reload, setReload] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
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
        setReload(false);
    }, [reload])
    return (
        <div className="routine-list-container">
            {userId ? <div className="routine-list">
                {routines.map((routine, idx) => <Routine key={idx} name={routine.routineName} desc={routine.routineDesc} id={routine.routineId} setReload={setReload}/>)}
                {showAddModal ?
                 <AddModal setShowAddModal={setShowAddModal} userId={userId} setReload={setReload}/>
                 :<button onClick={() => {setShowAddModal(true)}}>추가하기</button>}
            </div>
             : <div className="error-page">404</div>}
        </div>
    )
}

function AddModal({setShowAddModal, userId, setReload}){
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const handleSave = e => {
        e.preventDefault();
        const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
        fetch(`${serverAddress}/api/routine`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, routineName: name, routineDesc: desc})
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            setShowAddModal(false);
            setReload(true);
        })
    }
    return(
        <div className="add-modal">
            <form>
                <div>
                    <label>이름</label>
                    <input type="text" id="name" name="name" placeholder="루틴의 이름 입력하기" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label>설명</label>
                    <input type="text" id="desc" name="desc" placeholder="루틴의 설명 입력하기" value={desc} onChange={e => setDesc(e.target.value)} required />
                </div>
                <button type="submit" onClick={handleSave}>확인</button>
                <button onClick={e => {e.preventDefault(); setShowAddModal(false);}}>취소</button>
            </form>
        </div>
    )
}