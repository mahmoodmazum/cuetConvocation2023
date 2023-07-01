import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Api2Call(props) {
  const [sessionToken, setSessionToken] = useState(null);
  const { token } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/getApi2Response', {
          apiAccessToken: token,
        });

        if (response.data.status === '200') {
          setSessionToken(response.data.session_token);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const handleRedirect = () => {
      window.location.href = 'https://spg.sblesheba.com:6313/SpgLanding/SpgLanding/' + sessionToken;
    };

    if (sessionToken) {
      handleRedirect();
    }
  }, [sessionToken]);

  return (
    <div>
      {/* No need for button */}
    </div>
  );
}
