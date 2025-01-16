import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <ErrorBoundary>
    <AppRoutes />
  </ErrorBoundary>
);

export default App;
