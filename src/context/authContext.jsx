import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/firebase";
import { SoamarContext } from "./soamarContext";

export const AuthContext = createContext({})
const provider = new GoogleAuthProvider();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const checkLoggedInUser = () => {
        const sessionToken = sessionStorage.getItem('@AuthFirebase:token')
        const sessionUser = sessionStorage.getItem('@AuthFirebase:user')

        if (sessionToken && sessionUser) {
            setUser(JSON.parse(sessionUser))
        }
    }

    const singin = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user)
            sessionStorage.setItem('@AuthFirebase:token', token)
            sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))
            checkLoggedInUser()

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const singOut = () => {
        sessionStorage.clear()
        setUser(null)
    }

    useEffect(() => {
        checkLoggedInUser()
    } ,[])

    return (
        <AuthContext.Provider value={{singOut, user, singin, Logged: !!user}}>
            {children}
        </AuthContext.Provider>
    )
}