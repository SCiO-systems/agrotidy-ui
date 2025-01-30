import './App.css';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-pro/css/all.css';
import '@fortawesome/fontawesome-pro/css/fontawesome.css';

function App() {
	console.log('test');
	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
