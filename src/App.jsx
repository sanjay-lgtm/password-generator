import { useState } from 'react';
import './App.css'
import usePasswordGenerator from './hooks/use-password-genratetor';
import PasswordStrengthIndicator from './component/StrengthChechker.jsx';


function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState();

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData);
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator()

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500)
  }
  return (
    <div className='container'>
      {/* password text and copy */ }
      { password && (
        <div className='header'>
          <div className='title'>{ password }</div>
          {/* <button className='copyBtn' onClick={ handleCopy }>{ copied ? "Copied" : "copy" }</button> */ }
          <Button text={ copied ? "Copied" : "copy" } 
          onClick={handleCopy} customClass="copyBtn" />
        </div>
      ) }

      {/* character length */ }
      <div className='charlength'>
        <span>
          <label>Character Length</label>
          <label>{ length }</label>
        </span>
        <input type='range' min='4' max='20' value={ length } onChange={ (e) => setLength(e.target.value) } />
      </div>
      {/* checkboxes */ }
      <div className='checkboxes'>
        { checkboxData.map((checkbox, index) => {
          return (
            <div key={ index }>
              <input type='checkbox'
                onChange={ () => handleCheckboxChange(index) }
                checked={ checkbox.state } />
              <label>{ checkbox.title }</label>
            </div>
          )
        }) }
      </div>
      {/* strength */ }
      <PasswordStrengthIndicator password={ password } />
      {/* ErrorHandling */ }
      { errorMessage && <div className='errorMessage'>{ errorMessage }</div> }
      {/* genrate button */ }
      <button className='generateBtn' onClick={ () => generatePassword(checkboxData, length) }>Generate password</button>
    </div>
  )
}

export default App
