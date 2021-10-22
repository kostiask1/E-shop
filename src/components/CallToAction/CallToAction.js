import React, { useState, useEffect } from "react"

const CallToAction = () => {
    const [action, setAction] = useState("")
    const actions = [
        "Streetstyle. Youth. Eco-friendly.",
        "Beauty. Quality. Comfort",
    ]
    useEffect(() => {
        setAction(actions[0])
        let interval = setInterval(() => {
            let index = Math.floor(Math.random() * actions.length)
            setAction(actions[index])
            return (_) => clearTimeout(interval)
        }, 2000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <p className="call-to-action">{action}</p>
}

export default CallToAction
