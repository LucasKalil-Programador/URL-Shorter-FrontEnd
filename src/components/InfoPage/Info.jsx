import { useState } from "react";
import "./Info.css"
import { useEffect } from "react";

export default function Info(params) { 
  const [remainTimeSTR, setRemainTimeSTR] = useState("Remain time: 00:00:00");
  const [remainAccessSTR, setRemainAccessSTR] = useState("Remain access: 0");
  const [status, setStatus] = useState(true);

  function timeStamp(timeMS) {
    const h = Math.floor(timeMS / 3600000).toString().padStart(2, '0');
    timeMS = timeMS % 3600000;
    const m = Math.floor(timeMS / 60000).toString().padStart(2, '0');
    timeMS = timeMS % 60000;
    const s = Math.floor(timeMS / 1000).toString().padStart(2, '0');
    return `${h}:${m}:${s}`
  }

  function remainTime() {
    const data = params.data;
    const expirationDate = new Date(data.expirationDateTime);
    const registrationDate = new Date(data.registrationDateTime);
    
    if(registrationDate.toUTCString() === expirationDate.toUTCString()) {
      return <>Remain time: UNLIMITED</>;
    } else {
      setStatus((expirationDate - Date.now()) > 0);
      return <>Remain time: {timeStamp(expirationDate - Date.now())}</>
    }
  }

  function remainAccess() {
    const data = params.data;
    if(!("maxAccess" in data) || data.maxAccess === -1) {
      return "Remain access: UNLIMITED";
    } else {
      const remain = data.maxAccess - data.accessCount;
      setStatus(remain > 0);
      return `Remain access: ${remain}`;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainTimeSTR(remainTime());
      setRemainAccessSTR(remainAccess());
    }, 250);
    return () => {clearInterval(interval);};
  }, [remainTimeSTR]);
  
  useEffect(() => {
    setStatus(true);
  }, 
  [params])

  return (
    <div className="Info">
        <div className="InfoValue Left">{remainTimeSTR}</div>
        <div className="InfoValue Right">{remainAccessSTR}</div>
        <div className="InfoValue Status">{status? "Active": "Expired"}</div>
    </div>
  )
}
