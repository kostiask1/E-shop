import React, { useState, useEffect } from "react"
import App from "./App"
import { AuthState } from "./context/Auth/auth-state"
import { app } from "./base"
const db = app.firestore()

const AppWrapper = () => {
    const [loading, setLoading] = useState("")
    const [ip, setIp] = useState(0)
    const [whitelist, setWhitelist] = useState(null)
    
    fetch("https://www.cloudflare.com/cdn-cgi/trace").then(async (data) => {
        let response = await data.text()
        let gotIp = response.split("\n")[2]
        gotIp = gotIp.slice(3, -1)
        setIp(gotIp)
    })

    const getWhitelist = async () => {
        try {
            let gotWhitelist = await db.collection("whitelist").get()
            gotWhitelist
                ? (gotWhitelist = gotWhitelist.docs.map((doc) => doc.data()))
                : (gotWhitelist = [])
            if (gotWhitelist.length) {
                gotWhitelist = Object.values(gotWhitelist[0].ips)
            }

            setWhitelist(gotWhitelist)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getWhitelist()
        const timeout = setTimeout(
            () =>
                setLoading(
                    "Ваш айпи был заблокирован или у вас плохое соединение с сетью"
                ),
            5000
        )
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    if (
        ip !== 0 &&
        ((whitelist && whitelist.length && !whitelist.includes(ip)) ||
            (whitelist !== null && whitelist.length === 0))
    ) {
        return (
            <AuthState>
                <App />
            </AuthState>
        )
    } else return <p>{loading}</p>
}

export default AppWrapper
