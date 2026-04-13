'use client'
import React, { useEffect, useState } from 'react'

function Transactions() {

    // concepts called react hooks [useState, useEffect]
    const [counter, setCounter] = useState(0)

    useEffect(() => {

        console.log("I run again", counter);

    }, [counter])

    function handleIncrement() {
        setCounter(counter + 1)
        console.log(counter)
    }

    return (
        <div>
            <button className={"btn"} onClick={e => handleIncrement()}>Increment</button>
            <h1>{counter}</h1>
        </div>
    )
}

export default Transactions