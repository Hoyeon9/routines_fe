import React, { useState } from "react";

export default function Routine({name, desc, id, setReload}){
    const [openConfirm, setOpenConfirm] = useState(false);
    return (
        <div className="routine" style={{border: "1px solid yellow"}}>
            <div className="routine-name">{name}</div>
            <div className="routine-desc">{desc}</div>
            {openConfirm ? <Confirm id={id} setOpenConfirm={setOpenConfirm} setReload={setReload}/> : <button onClick={() => {setOpenConfirm(true)}}>삭제</button>}
        </div>
    )
}

function Confirm({id, setOpenConfirm, setReload}){
    const handleDelete = () => {
        const userId = sessionStorage.getItem('userId');
        const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
        fetch(`${serverAddress}/api/routine`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, 'routineId': id})
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            alert('루틴이 삭제되었습니다.')
            setOpenConfirm(false);
            setReload(true);
        })
    }
    return(
        <div className="confirm-modal">
            정말 삭제하시겠습니까?
            <button onClick={handleDelete}>확인</button>
            <button onClick={() => {setOpenConfirm(false);}}>취소</button>
        </div>
    )
}