import React from "react";

import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return { ...state, isAuthenticated: true };
		case "SIGN_OUT_SUCCESS":
			return { ...state, isAuthenticated: false };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function UserProvider({ children }) {
	var [state, dispatch] = React.useReducer(userReducer, {
		isAuthenticated: !!localStorage.getItem("id_token"),
	});

	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>
				{children}
			</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}

function useUserState() {
	var context = React.useContext(UserStateContext);
	if (context === undefined) {
		throw new Error("useUserState must be used within a UserProvider");
	}
	return context;
}

function useUserDispatch() {
	var context = React.useContext(UserDispatchContext);
	if (context === undefined) {
		throw new Error("useUserDispatch must be used within a UserProvider");
	}
	return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
	setError(false);
	setIsLoading(true);

	setTimeout(() => {
		axios.post(
			'http://localhost:8080/connexion',
			JSON.stringify(
				{
					user: login,
					pass: password
				}
			),
			{
				headers: { 'Content-Type': 'application/json' }
			}
		).then(function(response) {
			if (response.data.result != null) {
				localStorage.setItem('id_token', response.data.result.accesModel.codeAcces)
				localStorage.setItem('userName', response.data.result.user)
				localStorage.setItem('userType', response.data.result.accesModel.libelleAcces)
				localStorage.setItem('nomPrenom', response.data.result.personne.prenoms+" "+response.data.result.personne.nom)
				setError(null)
				setIsLoading(false)
				dispatch({ type: 'LOGIN_SUCCESS' })
				history.push('/app/dashboard')
				window.location.reload(false)
			} else {
				//dispatch({ type: "LOGIN_FAILURE" })
				setError(true)
				setIsLoading(false)
			}
		}).catch(function(error) {
			//dispatch({ type: "LOGIN_FAILURE" })
			setError(true)
			setIsLoading(false)
		});
	}, 2000);
}

function signOut(dispatch, history) {
	localStorage.removeItem("id_token")
	localStorage.removeItem("userName")
	localStorage.removeItem("userType")
	localStorage.removeItem("nomPrenom")
	dispatch({ type: "SIGN_OUT_SUCCESS" })
	history.push("/login")
}
