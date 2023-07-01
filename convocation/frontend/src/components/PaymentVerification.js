import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ToggleBar from "./ToggleBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "./Pdf";

export default function PaymentVerification() {
  const [getRollNo, setRollNo] = useState("");
  const [goToPdfFlag, setGoToPdfFlag] = useState(false);
  const [name, setName] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/checkPaymentVerification",
        {
          rollNo: getRollNo
        }
      );

      if (response.data.status === "200") {
        setGoToPdfFlag(true);
        setName(response.data.name);
      } else {
        toast.error(response.data.msg, { position: toast.POSITION.TOP_RIGHT });
        setGoToPdfFlag(false);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleValue = (event) => {
    setRollNo(event.target.value);
  };

  return (
    <div className="page-wrapper">
      <ToggleBar />
      <div className="content-wrapper">
        <div className="content">
          <div className="text-center">
            <div className="form-group">
              <TextField
                type="number"
                label="Enter Roll to check"
                variant="outlined"
                value={getRollNo}
                onChange={handleValue}
              />
            </div>
            <Button onClick={handleClick} variant="contained">
              Check
            </Button>
          </div>
        </div>
        {goToPdfFlag && (
  <div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <PDFViewer style={{ width: '100%', height: 'calc(100vh - 300px)' }}>
        <Pdf data={name}/>
      </PDFViewer>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <PDFDownloadLink
        document={<Pdf data={name} />}
        fileName={`entry_pass_${getRollNo}.pdf`}
        style={{ textDecoration: 'none' }}
      >
        <Button variant="contained">Download</Button>
      </PDFDownloadLink>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
