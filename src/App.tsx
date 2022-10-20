import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

import LoginScreen from './Screens/Login/LoginScreen';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginScreen/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
