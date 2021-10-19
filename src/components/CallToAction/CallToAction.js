import React, { useState, useEffect } from "react"

const CallToAction = () => {
    const [action, setAction] = useState("")
    const actions = ["buy our shoppers", "buy our rings", "only the best goods"]
    useEffect(() => {
        let index = Math.floor(Math.random() * actions.length)
        setAction(actions[index])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <p>{action}</p>
}

export default CallToAction
