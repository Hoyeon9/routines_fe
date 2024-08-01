import React, { useState } from "react";

export default function Routine({name, desc, id, setReload}){
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    return (
        <>
            {!openEdit ? <div className="routine">
                <div className="routine-content">
                    <h3 className="routine-name">{name}</h3>
                    <div className="routine-desc">{desc}</div>
                </div>
                <div className="btns">
                    <button className="edit" onClick={()=>{setOpenEdit(true); setOpenConfirm(false);}}>수정</button>
                    {openConfirm ? <DeleteConfirm id={id} setOpenConfirm={setOpenConfirm} setReload={setReload}/>
                    : <button className="delete" onClick={() => {setOpenConfirm(true); setOpenEdit(false);}}>삭제</button>}
                </div>
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
            <span>정말 삭제하시겠습니까?</span>
            <div className="confirm-btns">
                <button className="confirm" onClick={handleDelete}>삭제</button>
                <button className="cancel" onClick={() => {setOpenConfirm(false);}}>취소</button>
            </div>
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
                    <label>이름: </label>
                    <input type="text" id="name" name="name" placeholder="루틴의 이름 입력하기" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label>설명: </label>
                    <textarea type="textarea" id="desc" name="desc" placeholder="루틴의 설명 입력하기" value={desc} onChange={e => setDesc(e.target.value)} />
                </div>
                <div className="btns">
                    <button className="confirm" type="submit" onClick={handleUpdate}>확인</button>
                    <button className="cancel" onClick={e => {e.preventDefault(); setOpenEdit(false);}}>취소</button>
                </div>
            </form>
        </div>
    )

}