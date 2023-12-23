import { useState, useEffect } from "react";
import { getPassphrase } from "../lib/random";
import Clipboard from "./Clipboard";
import Message from "./Message";
import PasswordStrengthBar from 'react-password-strength-bar';
import { ArrowClockwise, EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function Passphrase({ passphraseFormVisible = true }) {
    const wordCountMin = 3;
    const wordCountMax = 50;

    const [message, setMessage] = useState("");
    const [passphrase, setPassphrase] = useState("");
    const [passphraseVisible, setPassphraseVisible] = useState(false);

    const [wordCount, setWordCount] = useState(
        sessionStorage.getItem('wordCount') ? Number(sessionStorage.getItem('wordCount')) : 3
    );
    const [wordSeparator, setWordSeparator] = useState(
        sessionStorage.getItem('wordSeparator') ? sessionStorage.getItem('wordSeparator') : ""
    );
    const [wordCase, setWordCase] = useState(
        sessionStorage.getItem('wordCase') ? sessionStorage.getItem('wordCase') : "camelcase"
    );

    function validateAndSetWordCase(input) {
        if (input === "lowercase" || input === "uppercase" || input === "camelcase") {
            setWordCase(input);
        }
    }

    useEffect(() => {
        let message = [];

        if (wordCount < wordCountMin || wordCount > wordCountMax) {
            message.push(`Word count must be between ${wordCountMin} and ${wordCountMax}.`);
        }

        if (wordSeparator.length > 1) {
            message.push("Word separator must be a single character.");
        }

        if (wordCase !== "lowercase" && wordCase !== "uppercase" && wordCase !== "camelcase") {
            message.push("Word case must be one of the following: lowercase, uppercase, or camelcase.");
        }

        setMessage(message.join("\n"));
    }, [wordCount, wordSeparator, wordCase]);

    useEffect(() => {
        sessionStorage.setItem('wordCount', wordCount)
        sessionStorage.setItem('wordSeparator', wordSeparator)
        sessionStorage.setItem('wordCase', wordCase)

        if (wordCount < wordCountMin || wordCount > wordCountMax) {
            setPassphrase("");
            return;
        }

        if (wordSeparator.length > 1) {
            setPassphrase("");
            return;
        }

        if (wordCase !== "lowercase" && wordCase !== "uppercase" && wordCase !== "camelcase") {
            setPassphrase("");
            return;
        }

        setPassphrase(getPassphrase(wordCount, wordSeparator, wordCase));
    }, [wordCount, wordSeparator, wordCase])

    return (
        <form 
            onSubmit={ (e) => e.preventDefault() }
            className={`mx-auto rounded border border-light p-3 m-3 ${passphraseFormVisible ? 'd-block' : 'd-none'}`}
        >
            <Message message={message}/>
            <div className="container">

                <div className="row mb-3 text-center">
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="word-separator" className="me-3 text-center text-xxl-left d-block d-xxl-inline-block">Word Separator</label>
                        <input 
                            name="word-separator"
                            type="text" 
                            id="word-separator" 
                            maxLength={1}
                            defaultValue={ wordSeparator }
                            onChange={ (e) => setWordSeparator(e.target.value) }
                        />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="word-case" className="me-3 text-center text-xxl-left d-block d-xxl-inline-block">Word Case</label>
                        <select 
                            id="word-case" 
                            name="word-case" 
                            onChange={ (e) => validateAndSetWordCase(e.target.value) }
                            defaultValue={ wordCase }
                        >
                            <option value="lowercase">Lowercase</option>
                            <option value="uppercase">Uppercase</option>
                            <option value="camelcase">Camelcase</option>
                        </select>
                    </div>

                </div>
                <div className="text-center mb-4">
                    <label htmlFor="word-count" className="d-block">Word Count</label>
                    <input 
                        name="word-count" 
                        type="number" 
                        id="word-count" 
                        min={ wordCountMin }
                        max={ wordCountMax } 
                        defaultValue={ wordCount } 
                        onChange={ (e) => setWordCount(Number(e.target.value)) }
                        className="text-center"
                    />
                </div>
               
                <div className="mb-3 text-center">
                    <div>
                        <label htmlFor="passphrase" className="d-inline-block me-2"><b>Passphrase</b></label>
                        {
                            passphraseVisible 
                            ? <EyeFill className="d-inline-block" onClick={ () => setPassphraseVisible(!passphraseVisible) }/>
                            : <EyeSlashFill className="d-inline-block" onClick={ () => setPassphraseVisible(!passphraseVisible) }/>
                        }
                    </div>
                    <input 
                        name="passphrase" 
                        type={ passphraseVisible ? "text" : "password"} 
                        id="passphrase" 
                        readOnly={ true }
                        value={ passphrase }
                        className="w-100 text-center p-3"
                    />
                </div>

                <div className="text-center">
                    <PasswordStrengthBar password={passphrase} />
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="passphrase-visible" className="me-3">Show Passphrase</label>
                    <input type="checkbox" id="passphrase-visible" checked={ passphraseVisible } onChange={ (e) => setPassphraseVisible(e.target.checked) } />
                </div>

                <div className="text-center">
                    <button 
                        type="submit" 
                        onClick={ () => {
                            setPassphrase(getPassphrase(
                                    wordCount, 
                                    wordSeparator, 
                                    wordCase
                                )
                            )
                        } }
                        className="btn btn-success my-3"
                        disabled={ message.length > 0 }
                    >
                        <ArrowClockwise className="me-2"/>Generate New Passphrase
                    </button>
                    <Clipboard valueToCopy={ passphrase }/>
                </div>
            </div>
        </form>
    );
  }
  
  export default Passphrase;
  