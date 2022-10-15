import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from './Screens/Login/LoginScreen';

function App() {
	localStorage.setItem("collapsed", "false");
	return (
		<div className="App">
			<LoginScreen></LoginScreen>
		</div>
	);
}

export default App;
