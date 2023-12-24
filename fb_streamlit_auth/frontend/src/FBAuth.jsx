import React, { useCallback, useEffect, useState } from "react"
import {
    withStreamlitConnection,
    Streamlit
} from "streamlit-component-lib"
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const FBAuth = ({args}) => {
    const [firebaseApp, setFirebaseApp] = useState(null);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const loginButtonText = args["login_button_text"] ?? "Login"
    const logoutButtonText = args["logout_button_text"] ?? "Logout"
    const buttonClass = args["class_name"] ?? ""
    const buttonId = args["html_id"] ?? ""

    const handleLogin = () => {
        // Sign in with Google
        const provider = new GoogleAuthProvider();
        const auth = getAuth(firebaseApp);
        signInWithPopup(auth, provider)
            .then( (result) => {
                console.log('Success!', result);
            })
            .catch( (error) => {
                console.error("error", error);
            });
      };
    
    const handleLogout = () => {
        const auth = getAuth(firebaseApp);
        signOut(auth)
            .then( () => {
                console.log('Success sign out')
            })
            .catch( () => {
                console.error('Error signing out')
            })
      };
    console.log(args)
    useEffect(() => {
        const firebaseConfig = {
            apiKey: args.apiKey,
            authDomain: args.authDomain,
            databaseURL: args.databaseURL,
            projectId: args.projectId,
            storageBucket: args.storageBucket,
            messagingSenderId: args.messagingSenderId,
            appId: args.appId,
            measurementId: args.measurementId
        };
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed', user);
            setUser(user);
            
            if (user) {
                let ud = JSON.parse(JSON.stringify(user));
                user.getIdTokenResult().then( (tokenResult) => {
                    console.log("tokenResult", tokenResult);
                    //let isAdmin = !!tokenResult.claims.admin
                    ud.claims = tokenResult.claims;
                }).finally( () => {
                    setUserData(ud);
                });
            } else {
                setUserData(null);
            }
        });

        setFirebaseApp(app);

    }, []);

    
    useEffect(() => {
        
        Streamlit.setComponentValue(userData);
        Streamlit.setFrameHeight()
        Streamlit.setComponentReady()
    }, [userData])

    return  <div className="card">
        <button onClick={user ? handleLogout : handleLogin} className={buttonClass} id={buttonId}>
            {user ? logoutButtonText : loginButtonText}
        </button>
    </div>
}

export default withStreamlitConnection(FBAuth)