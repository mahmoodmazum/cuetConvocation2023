import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import OnlineRegistration from './components/OnlineRegistration';
import PaymentInfo from './components/PaymentInfo';
import { ToastContainer } from 'react-toastify';
import PaymentVerification from './components/PaymentVerification';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <div className='wrapper'>
    <Sidebar
        title="Convocation 2023"
        uniName="CUET"
        home="Home"
        sectionName1="Registration"
        subSectionName1="Registration Info"
        subSectionName2="Online Registration"
        subSectionName3="Download Entry Pass"
        subSectionName4="test 1"
        subSectionName5="test 2"
        subSectionName6="test 3"
      />
      
      <Routes>
        
        <Route path="/" element={<Home/>}></Route>
        <Route path="online_registration_form" element={<OnlineRegistration/>}></Route>
        <Route path="go_for_payment/:rollNo" element={<PaymentInfo/>}></Route>
        <Route path='download_entry_pass' element={<PaymentVerification/>}></Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
