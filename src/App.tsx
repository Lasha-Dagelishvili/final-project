import ErrorBoundary from './components/error-boundary';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <ErrorBoundary>
    <AppRoutes />
  </ErrorBoundary>
);

export default App;
