import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Theme from './Theme';
import { GlobalStyles } from './Theme/Globalstyles';
import './Theme/style.css';
import 'antd/dist/antd.css'
import LoginScreen from './Screens/Login/LoginScreen';
import DashboardScreen from './Screens/Dashboard/DashboardScreen';
import RoleScreen from './Screens/Roles/RoleScreen';
import { ThemeProvider } from 'styled-components';

const App = () => {
	let loggedin = localStorage.getItem("loggedin");
	
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={loggedin === 'true'? <DashboardScreen/> : <LoginScreen/>}/>
					<Route path="/dashboard" element={loggedin === 'true'? <DashboardScreen/> : <LoginScreen/>} />
					<Route path="/roles" element={loggedin === 'true'? <RoleScreen/> : <LoginScreen/>} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
