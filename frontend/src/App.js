import Passphrase from "./components/Passphrase";
import Password from "./components/Password";
import { useState } from 'react';

function App() {
  const [ passwordFormVisible, setPasswordFormVisible ] = useState(
    sessionStorage.getItem('passwordFormVisible') === 'false' ? false : true
  )
  const [ passphraseFormVisible, setPassphraseFormVisible ] = useState(
    sessionStorage.getItem('passphraseFormVisible') === 'true' ? true : false
  )


  function showForm(passwordForm, passphraseForm) {
    if ( (passwordForm && passphraseForm) || (!passwordForm && !passphraseForm) )
      return

    setPasswordFormVisible(passwordForm);
    sessionStorage.setItem('passwordFormVisible', passwordForm);
    setPassphraseFormVisible(passphraseForm);
    sessionStorage.setItem('passphraseFormVisible', passphraseForm);
  }

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="row">
            <div className="col text-center my-3">
              <h1 className="text-center">Random { passwordFormVisible ? 'Password' : 'Passphrase' } Generator</h1>
            </div>
          </div>
          <div className="row">
            <div className="col text-center my-3">
              <button 
                onClick={ () => { showForm(true, false) } }
                className={ `d-inline-block me-3 my-3 btn ${ passwordFormVisible ? 'btn-primary' : 'btn-outline-primary' }` }
              >
                  Password
              </button>
              <button 
                onClick={ () => { showForm(false, true) } }
                className={ `d-inline-block me-3 my-3 btn ${ passphraseFormVisible ? 'btn-primary' : 'btn-outline-primary' }` }
              >
                Passphrase
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col my-3">
              <Password passwordFormVisible={passwordFormVisible}/>
              <Passphrase passphraseFormVisible={passphraseFormVisible}/>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer m-auto py-3 text-center">
        <p className="p-4 m-4">
          All 
          {
            passwordFormVisible
            ? ` passwords `
            : ` passphrases ` 
          } 
          are created using only client JavaScript.
        </p>
      </footer>
    </div>
  );
}

export default App;
