import React, { useState, useEffect } from "react"

const CallToAction = () => {
  const actions = [
    "Streetstyle. Youth. Eco-friendly.",
    "Beauty. Quality. Comfort",
  ]
  const [action, setAction] = useState(actions[0])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIndex((index) => (index === actions.length - 1 ? 0 : ++index))
      setAction(actions[index])
    }, 3000)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])
  return <p className="call-to-action">{action}</p>
}

export default CallToAction
