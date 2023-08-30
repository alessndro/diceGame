import React from "react"

function Die(props)
{
    console.log(props)
    return (
        <div onDoubleClick={() => props.value.toggle(props.value.id)} className={`dice-div ${props.value.isHeld? "selected" : ""}`}>
            <h1>{props.value.value}</h1>
        </div>
    )
}

export default Die