import { useState, useEffect } from "react";
import { getPassword } from '../lib/random';
import Clipboard from "./Clipboard";
import Message from "./Message";
import PasswordStrengthBar from 'react-password-strength-bar';
import { ArrowClockwise, EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function Password({ passwordFormVisible = true }) {
    const lengthMax = 64;
    const lengthMin = 8;
    
    const [message, setMessage] = useState("");  
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const [includeUppercase, setIncludeUppercase] = useState(
        sessionStorage.getItem('includeUppercase') === 'false' ? false : true
    );
    const [includeLowercase, setIncludeLowercase] = useState(
        sessionStorage.getItem('includeLowercase') === 'false' ? false : true
    );
    const [includeNumbers, setIncludeNumbers] = useState(
        sessionStorage.getItem('includeNumbers') === 'false' ? false : true
    );
    const [includeSymbols, setIncludeSymbols] = useState(
        sessionStorage.getItem('includeSymbols') === 'false' ? false : true
    );
    const [length, setLength] = useState(
        sessionStorage.getItem('length') ? Number(sessionStorage.getItem('length')) : 16
    );

    useEffect(() => {
        let builtMessage = [];

        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
          builtMessage.push("At least one of the following must be selected: Uppercase letters, Lowercase letters, Numbers, or Symbols.")
        }


        if (length > lengthMax || length < 1) {
            builtMessage.push(`Length must be between ${lengthMin} and ${lengthMax}.`);
        }
        
        setMessage(builtMessage.join("\n"));
    }, [length, message, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    useEffect(() => {
      sessionStorage.setItem('includeUppercase', includeUppercase);
      sessionStorage.setItem('includeLowercase', includeLowercase);
      sessionStorage.setItem('includeNumbers', includeNumbers);
      sessionStorage.setItem('includeSymbols', includeSymbols);
      sessionStorage.setItem('length', length);

      if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        setPassword("");
        return;
      }

      if (length >= lengthMax || length < 1) {
        setPassword("");
        return;
      }

      setPassword(getPassword(
          length, 
          includeUppercase, 
          includeLowercase, 
          includeNumbers, 
          includeSymbols
        )
      );
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    return (
        <form 
          className={ `mx-auto rounded border border-light p-3 m-3 ${passwordFormVisible ? 'd-block' : 'd-none'}` }
          onSubmit={ (e) => e.preventDefault() }
        >
          <Message message={message}/>
          <div className="container">
            <div className="row mb-3 text-left text-md-center">

              <div className="col-6 col-xxl-3 mb-3">
                <label htmlFor="includeUppercase" className="me-3">Include uppercase letters</label>
                <input 
                  type="checkbox" 
                  id="includeUppercase"
                  onChange={ (e) => setIncludeUppercase(e.target.checked) }
                  defaultChecked={ includeUppercase }
                />
              </div>

              <div className="col-6 col-xxl-3 mb-3">
                <label htmlFor="includeLowercase" className="me-3">Include lowercase letters</label>
                <input 
                  type="checkbox" 
                  id="includeLowercase"
                  onChange={ (e) => setIncludeLowercase(e.target.checked) } 
                  defaultChecked={ includeLowercase }
                />
              </div>

              <div className="col-6 col-xxl-3 mb-3">
                <label htmlFor="includeNumbers" className="me-3">Include numbers</label>
                <input 
                  type="checkbox" 
                  id="includeNumbers"
                  onChange={ (e) => setIncludeNumbers(e.target.checked) } 
                  defaultChecked={ includeNumbers }
                />
              </div>

              <div className="col-6 col-xxl-3 mb-3">
                <label htmlFor="includeSymbols" className="me-3">Include symbols</label>
                <input 
                  type="checkbox" 
                  id="includeSymbols"
                  onChange={ (e) => setIncludeSymbols(e.target.checked) }
                  defaultChecked={ includeSymbols }
                />
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <label htmlFor="length" className="d-block">Length</label>
            <input type="number" 
                    id="length"
                    onChange={(event) => setLength(event.target.value)}
                    max={lengthMax}
                    min={lengthMin}
                    className="d-inline-block w-5 ml-3 text-center"
                    defaultValue={ length }
            />
          </div>

          <div className="mb-3 text-center">
            <div>
              <label htmlFor="password" className="d-inline-block me-2"><b>Password</b></label>
              {
                passwordVisible 
                ? <EyeFill className="d-inline-block" onClick={ () => setPasswordVisible(!passwordVisible) }/>
                : <EyeSlashFill className="d-inline-block" onClick={ () => setPasswordVisible(!passwordVisible) }/>
              }
            </div>
            <input
              id="password" 
              value={password} 
              className="w-100 text-center p-3" 
              type={ passwordVisible ? "text" : "password"}
              readOnly={ true }
            />
          </div>

          <div className="text-center">
            <PasswordStrengthBar password={password} />
          </div>
          
          <div className="mb-3 text-center">
              <label htmlFor="password-visible" className="me-3">Show Password</label>
              <input type="checkbox" id="password-visible" checked={ passwordVisible } onChange={ (e) => setPasswordVisible(e.target.checked) } />
          </div>


          <div className="text-center">
            <button 
                type="submit" 
                onClick={ () => setPassword(
                    getPassword(
                      length, 
                      includeUppercase, 
                      includeLowercase, 
                      includeNumbers, 
                      includeSymbols
                    )
                  ) 
                }
                className={`btn btn-success my-3`}
                disabled={message.length > 0}
              >
                  <ArrowClockwise className="me-2"/>Generate New Password
            </button>
            <Clipboard valueToCopy={password}/>
          </div>
        </form>
      );
  }
  
  export default Password;
  