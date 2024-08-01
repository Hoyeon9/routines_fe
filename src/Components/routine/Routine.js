import React from "react";

export default function Routine({name, desc}){
    return (
        <div className="routine">
            <div className="routine-name">{name}</div>
            <div className="routine-desc">{desc}</div>
        </div>
    )
}