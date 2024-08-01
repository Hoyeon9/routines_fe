import React, { useState } from "react";

export default function Routine({name, desc, id, setReload}){
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    return (
        <>
            {!openEdit ? <div className="routine" style={{border: "1px solid yellow"}}>
                <div className="routine-name">{name}</div>
                <div className="routine-desc">{desc}</div>
                <button onClick={()=>{setOpenEdit(true)}}>수정</button>
                {openConfirm ? <DeleteConfirm id={id} setOpenConfirm={setOpenConfirm} setReload={setReload}/>
                : <button onClick={() => {setOpenConfirm(true)}}>삭제</button>}
            </div>
            : <EditRoutine id={id} originName={name} originDesc={desc} setOpenEdit={setOpenEdit} setReload={setReload} />}
        </>
    )
}

function DeleteConfirm({id, setOpenConfirm, setReload}){
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

function EditRoutine({id, originName, originDesc, setOpenEdit, setReload}){
    const [name, setName] = useState(originName);
    const [desc, setDesc] = useState(originDesc);
    const handleUpdate = e => {
        e.preventDefault();
        const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
        const userId = sessionStorage.getItem('userId');
        if(name.trim() === ''){
            if(name.trim() === '') setName('');
            return
        }
        fetch(`${serverAddress}/api/routine`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({routineId: id, userId, routineName: name, routineDesc: desc})
        })
        .then(res => {
            if(!res.ok){
                throw new Error(`HTTP error: ${res.status}`)
            }
            setOpenEdit(false);
            setReload(true);
        })
    }
    return(
        <div className="routine-edit-modal">
            <form>
                <div>
                    <label>이름</label>
                    <input type="text" id="name" name="name" placeholder="루틴의 이름 입력하기" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label>설명</label>
                    <input type="text" id="desc" name="desc" placeholder="루틴의 설명 입력하기" value={desc} onChange={e => setDesc(e.target.value)} />
                </div>
                <button type="submit" onClick={handleUpdate}>확인</button>
                <button onClick={e => {e.preventDefault(); setOpenEdit(false);}}>취소</button>
            </form>
        </div>
    )

}