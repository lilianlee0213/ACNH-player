import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles, defaultTheme} from './theme';
import {QueryClient, QueryClientProvider} from 'react-query';

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={client}>
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<App />
		</ThemeProvider>
	</QueryClientProvider>
);
