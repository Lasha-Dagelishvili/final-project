import ErrorBoundary from './components/error-boundary';
import AppRoutes from './routes/AppRoutes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QiiTNLBMNfIO9EfOSpN2Hgf20dY3d4282QGTknNw8POJOxFWXF9yCx8DLzPE3BO2Qfp1wTubJVkiyKN6tcMecz0009nS5Mppg'); 

const App = () => (
  <Elements stripe={stripePromise}>
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  </Elements>
);

export default App;
