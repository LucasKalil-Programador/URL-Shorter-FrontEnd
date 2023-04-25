import Navbar from "../Navbar"
import "./InfoPage.css"
import {API_URL, API_URL_SHORTER_PATH, API_URL_INFO_PATH} from '../../const'
import { useState } from "react"
import Info from "./Info"

export default function InfoPage () { 
  const [infoData, setInfoData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [urlInputText, setURLInputText] = useState("");

  function SearchInfo(e) {
    setDisabled(true);

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const requestURL = `${API_URL_INFO_PATH}${urlInputText.replace(API_URL, '')}`;
    fetch(requestURL, requestOptions)
      .then(res => res.json())
      .then(setInfoData)
      .catch(e => {
        alert("Invalid Short URL");
      })
      .finally(() => setDisabled(false));
  }

  return (
    <div>
        <Navbar></Navbar>
        <div className="InfoPage Div">
          <input className='InfoPage Input'            
            placeholder={API_URL + "/A3C0"}
            onChange={e => setURLInputText(e.target.value)}/>
          <button className='InfoPage SearchButton' 
            disabled={disabled}
            onClick={e => SearchInfo(e)}>
            {!disabled? "Search": <span className="InfoPage loading-icon"></span>}
          </button>
          <Info className="Info" data={infoData}></Info>
        </div>
    </div>
  )
}
