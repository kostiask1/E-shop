import React, { useReducer } from "react"
import firebase from "firebase/app"
import { authReducer } from "./auth-reducer"
import { authContext } from "./auth-context"
const LOGIN = "LOGIN"

export const AuthState = ({ children }) => {
  const initialState = {
    admin: false,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (credits) => {
    if (!credits.type) return
    console.log(credits.email, credits.password)
    firebase.auth().signInWithEmailAndPassword(credits.email, credits.password)
  }

  const logout = () => {
    firebase.auth().signOut()
    dispatch({ type: LOGIN, payload: false })
  }

  const auth = () => {
    const promise = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: LOGIN, payload: true })
        } else {
          logout()
        }
        resolve()
      })
    })
    return promise
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
