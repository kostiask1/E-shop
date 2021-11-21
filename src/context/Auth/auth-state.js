import React, { useReducer } from "react"
import axios from "axios"
import { authReducer } from "./auth-reducer"
import { authContext } from "./auth-context"
import CryptoJS from "crypto-js"
import { local_expirationDate } from "../../localStorage"
const LOGIN = "LOGIN"
const KEY = process.env.REACT_APP_KEY

export const AuthState = ({ children }) => {
    const initialState = {
        admin: false,
    }
    const [state, dispatch] = useReducer(authReducer, initialState)
    const duration = 1000 * 3600 * 24
    const encryptWithCryptoJS = (plainText) => {
        const key = CryptoJS.enc.Utf8.parse(JSON.stringify({ KEY }))
        const iv1 = CryptoJS.enc.Utf8.parse(JSON.stringify({ KEY }))
        const encrypted = CryptoJS.AES.encrypt(plainText, key, {
            keySize: 16,
            iv: iv1,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })
        return encrypted + ""
    }

    const decryptionWithCryptoJS = (cipher) => {
        const key = CryptoJS.enc.Utf8.parse(JSON.stringify({ KEY }))
        const iv1 = CryptoJS.enc.Utf8.parse(JSON.stringify({ KEY }))
        const plainText = CryptoJS.AES.decrypt(cipher, key, {
            keySize: 16,
            iv: iv1,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })

        return plainText.toString(CryptoJS.enc.Utf8)
    }

    const login = async (credits) => {
        let url = ""
        credits.type === "login"
            ? (url =
                  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg")
            : credits.type === "signup"
            ? (url =
                  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg")
            : (url = false)
        if (!url) return false

        const request = axios.post(url, credits)
        request.then(() => {
            const expirationDate = new Date(new Date().getTime() + duration)
                .getTime()
                .toString()
            localStorage.setItem(
                local_expirationDate,
                encryptWithCryptoJS(expirationDate)
            )
            auth()
        })
    }

    const logout = () => {
        localStorage.removeItem(local_expirationDate)
        dispatch({ type: LOGIN, payload: false })
    }

    const auth = () => {
        if (
            localStorage.getItem(local_expirationDate) &&
            +decryptionWithCryptoJS(
                localStorage.getItem(local_expirationDate)
            ) >= new Date().getTime()
        ) {
            let expirationDate = new Date(new Date().getTime() + duration)
                .getTime()
                .toString()
            localStorage.setItem(
                local_expirationDate,
                encryptWithCryptoJS(expirationDate)
            )
            return dispatch({ type: LOGIN, payload: true })
        } else {
            return logout()
        }
    }

    const { admin } = state

    return (
        <authContext.Provider
            value={{
                login,
                auth,
                logout,
                admin,
            }}
        >
            {children}
        </authContext.Provider>
    )
}
