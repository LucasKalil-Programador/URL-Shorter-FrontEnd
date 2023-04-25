import { useState } from 'react'
import './URLInput.css'

export default function URLInput (props) {
  const [longURL, setLongURL] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [accessLimit, setAccessLimit] = useState("");

  function onClick(e) {
    const shorterProps = {
      longURL: longURL,
      selectedDate: selectedDate,
      accessLimit: accessLimit
    }
    props.onClick(shorterProps);
  }

  return (
    <div className='URLInput'>
        <div className='URLInput DivInput'>
        <input className='URLInput Input'
          disabled={props.disabled} 
          onChange={e => setLongURL(e.target.value)} 
          
          placeholder='https://www.example.com/'/>
        </div>
        
        <div className='URLInput InputDiv'>
          <input 
            className='URLInput DateInput' 
            type='datetime-local' 
            min={new Date().toISOString().slice(0, 16)}
            onChange={e => setSelectedDate(e.target.value)}>
          </input>

          <button className='URLInput ShortenButton'
            disabled={props.disabled} 
            onClick={onClick}>
              {!props.disabled? "Shorten URL": <span className="URLInput loading-icon"></span>}
          </button>

          <input 
            className='URLInput NumberInput' 
            type='number' 
            min={1}
            placeholder='Infinity' 
            onChange={e => setAccessLimit(e.target.value)}>
          </input>
        </div>
    </div>
  )
}
