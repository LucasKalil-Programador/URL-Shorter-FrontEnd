import './URLOutput.css'

export default function URLOutput (props) { 

  function copyToClipBoard(e) {
    if(props.text != '') {
      navigator.clipboard.writeText(props.text);
    }
  }

  if("text" in props && props.text.length > 0) {
    return (
      <div>
        <div className='URLOutput-div'>
          <a className='URLOutput-text'
            target="_blank" 
            href={props.text}>
            {props.text}
          </a>
        </div>
        <button className='URLOutput CopyButton' onClick={copyToClipBoard}>Copy</button>
      </div>
    )
  } else {
    return <></>
  }
}
