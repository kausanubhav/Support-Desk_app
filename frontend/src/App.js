import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';


function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/new-ticket" element={<PrivateRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route exact path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route exact path="/ticket/:ticketId" element={<PrivateRoute />}>
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>
        </Routes>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
