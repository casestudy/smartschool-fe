import React from 'react';
import ReactDOM from 'react-dom/client';

import { Store } from './State/Store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export default function MainApp() {
	return (
		<>
			<Provider store={Store} children={<App/>}></Provider>
		</>
	);
}

const root = ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
);
root.render(<MainApp/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
