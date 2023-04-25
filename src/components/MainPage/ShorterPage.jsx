import { useState } from 'react'
import URLInput from './URLInput'
import URLOutput from './URLOutput'
import {API_URL, API_URL_SHORTER_PATH} from '../../const'
import Navbar from "../Navbar"
import "./ShorterPage.css"

export default function ShorterPage () {
  const [shortURL, setShortURL] = useState("");
  const [runningTask, setRunningTask] = useState(false);

  function onError(message) {
    alert(message);
    setRunningTask(false);
  }

  function longToShortURL(props) {
    setRunningTask(true);
    setShortURL("");

    const params = new URLSearchParams();
    if(props.accessLimit >= 1 || props.accessLimit == '') {
      params.append("max_access", props.accessLimit);
    } else {
      onError("Invalid input: Access limit must be a positive integer greater than 0.");
      return;
    }

    if(props.selectedDate != "") {
      const date = new Date(props.selectedDate);
      const minutes = Math.floor((date - Date.now()) / 60000);
      if(minutes >= 1 && minutes <= 2880) {
        params.append("minutes", minutes.toString());
      } else {
        onError("Invalid input: The selected date is in the past. Please select a future date within the next 48 hours to proceed with this action.");
        return;
      }
    }
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalURL: props.longURL }),
    };
    
    const requestURL = `${API_URL_SHORTER_PATH}?${params}`;
    console.log(requestURL)
    fetch(requestURL, requestOptions)
      .then(res => res.json())
      .then(data => {
        if(data.status == 400) {
          alert("Ensure that the URL you enter is valid and begins with 'http://' or 'https://");
          return;
        }

        if("shortPath" in data) {
          setShortURL(API_URL + data.shortPath)
        }
      })
      .catch(error => console.log(error))
      .finally(() => setRunningTask(false));
  }

  return (
    <div>
      <Navbar></Navbar>
      <main className="ShorterPage Main">
        <section>
          <URLInput 
            onClick={longToShortURL}
            disabled={runningTask}
          />
        </section>
        <section>
          <URLOutput text={shortURL}/>
        </section>
      </main>
    </div>
  )
}
