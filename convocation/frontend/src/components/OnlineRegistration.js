import React, { useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import EligibilityCheck from "./EligibilityCheck";
import ToggleBar from "./ToggleBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OnlineRegistration() {
  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(204);
  const [msg, setMsg] = useState('Your are not eligible for Convocation/Reunion');
  const [url,setUrl]=useState('/');
  const [btnName,setBtnName]=useState('Back to Home');
  const handleValue = (event) => {
    setRollNo(event.target.value);
  };
  const checkRollEligibility = async (event) => {
    event.preventDefault();
    if (!rollNo) {
      // Display a notification popup
      toast.error('Roll number is required.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/checkRollwithVerification",
        {
          rollNo: rollNo,
        }
      );

      console.log(response.data); // Do something with the response data
      if(response.data.status===200){
        setStatus(200);
        const rollNo=response.data.rollNo;
        if(response.data.eligibility==='c' && response.data.payMentVerification===0){
          setMsg("You are Eligible For Convocation");
          setBtnName("Payment For Convocation");
          setUrl('/go_for_payment/'+rollNo);
        }
        else if (response.data.eligibility==='r' && response.data.payMentVerification===0){
          setMsg("You are Eligible For Reunion");
          setBtnName("Payment For Reunion");
          setUrl('/go_for_payment/'+rollNo);
        }
        else if(response.data['payMentVerification']===1){
          setMsg("Your payment has been verified");

        }
        else{
          setMsg("Your are not eligible for Convocation/Reunion");
        }
      }
      else{
        
          setMsg("Something went wrong . Please Try Later");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <ToggleBar></ToggleBar>

      <div className="content-wrapper">
        <div className="content">
          <div className="text-center">
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                id="rollNo"
                placeholder="Enter Your Roll No"
                value={rollNo}
                onChange={handleValue}
                required
              />
            </div>

            <div className="form-footer mt-6">
              <button
                className="btn btn-primary btn-pill"
                onClick={checkRollEligibility}
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <ClipLoader
                    css={css`
                      display: inline-block;
                      vertical-align: middle;
                    `}
                    size={20}
                    color={"#ffffff"}
                    loading={loading}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            {status === 200 && <EligibilityCheck msg={msg} btnName={btnName} url={url}/>}
          </div>
        </div>
      </div>
    </div>
  );
}
