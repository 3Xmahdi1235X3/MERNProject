import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnnimatedRoutes from "./components/AnnimatedRoutes";
function App() {
  return (

    <Router>
       <ToastContainer/>
       <Header /> 

      <main className="py-3 pl-0 d-flex">
        <Container>
          
          <AnnimatedRoutes/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
