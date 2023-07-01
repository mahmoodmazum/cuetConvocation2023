import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToggleBar from "./ToggleBar";
import axios from "axios";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentInfo() {
  const [loading, setLoading] = useState(false);
  const [btnVisibility, setBtnVisibility] = useState(false);
  const [btnVisibility2, setBtnVisibility2] = useState(true);
  const { rollNo } = useParams();
  const [userRollNo, setUserRollNo] = useState("");
  const [userName, setUserName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userPicFileName, setUserPicFileName] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    setUserRollNo(rollNo);
  }, [rollNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userName ||
      !fatherName ||
      !motherName ||
      !presentAddress ||
      !mobileNumber ||
      !userPicFileName
    ) {
      // Display a notification popup
      toast.error("Every Field is required.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("fatherName", fatherName);
      formData.append("motherName", motherName);
      formData.append("presentAddress", presentAddress);
      formData.append("userPic", userPicFileName);
      formData.append("rollNo", userRollNo);
      formData.append("mobileNumber", mobileNumber);

      const response = await axios.post(
        "http://127.0.0.1:8000/saveUserInfoForPayment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        //console.log(response.data)
        try {
          const responseApi1 = await axios.post(
            "http://127.0.0.1:8000/getApi1Response",{
              rollNo:userRollNo
            }
          );

          //console.log(response.data); // Do something with the response data
          if (responseApi1.data.status === "200") {
            
            try {
              const responseApi2 = await axios.post(
                "http://127.0.0.1:8000/getApi2Response",
                {
                  apiAccessToken: responseApi1.data.access_token,
                  rollNo: userRollNo
                }
              );

              console.log(responseApi1.data); // Do something with the response data
              if (responseApi2.data.status === "200") {
                setSessionToken(responseApi2.data.session_token);
                setBtnVisibility(true);
                setBtnVisibility2(false);
              } else {
                toast.error(responseApi2.data.message, {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            } catch (error) {
              toast.error("Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } else {
            toast.error(responseApi1.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
          
        }
      } else {
        toast.error(response.data.msg, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="content-wrapper">
      <ToggleBar></ToggleBar>
      <div className="content">
        <div className="text-center">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="userName"
              placeholder="Enter Your Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="fatherName"
              placeholder="Enter Your Father Name"
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="motherName"
              placeholder="Enter Your Mother Name"
              onChange={(e) => setMotherName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="mobileNumber"
              placeholder="Enter Your Phone Number"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              id="presentAddress"
              placeholder="Enter Your Present Address"
              onChange={(e) => setPresentAddress(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Upload your picture</label>
            <input
              type="file"
              className="form-control"
              id="userPic"
              onChange={(e) => setUserPicFileName(e.target.files[0])}
            />
          </div>

          {btnVisibility2 && (
            <div className="form-footer mt-6">
              <button
                className="btn btn-primary btn-pill"
                onClick={handleSubmit}
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
                  "Save"
                )}
              </button>
            </div>
          )}

          {btnVisibility && (
            <div className="form-footer mt-6">
              <a
                className="btn btn-primary btn-pill"
                href={
                  "https://spg.sblesheba.com:6313/SpgLanding/SpgLanding/" +
                  sessionToken
                }
              >
                Go to Sonali Bank portal
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
