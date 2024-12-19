import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ReservationForm from './pages/Reservation';
import MyReservations from './pages/MyReservations';
import { AuthProvider } from './utils/auth/authContext';
import ProtectedRoute from './utils/auth/ProtectedRoute';
import Register from './pages/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={
              <ProtectedRoute >
                <ReservationForm />
              </ProtectedRoute>
            } />
            <Route path='/my-reservations' element={
              <ProtectedRoute >
                <MyReservations />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
