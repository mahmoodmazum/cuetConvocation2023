import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Api2Call from './Api2Call';

export default function Api1Call() {
  const [accessToken,setAccessToken]=useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/getApi1Response');
        if(response.data.status==='200'){
          setAccessToken(response.data.access_token);
        }
         //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div>
    {accessToken && <Api2Call token={accessToken}/>} 
  </div>;
}
