import { useState } from "react";
import { Clipboard as ClipboardIcon } from "react-bootstrap-icons";

function Clipboard({ valueToCopy = true }) {
    const defaultClipboardButtonText = "Copy to Clipboard";
    const copiedClipboardButtonText = "Copied!";
    const clipboardResetTimeout = 3000;
    const [clipboardButtonEnabled, setClipboardButtonEnabled] = useState(true);
    const [clipboardButtonText, setClipboardButtonText] = useState("Copy to Clipboard");

    function copyToClipboard(value) {
        navigator.clipboard.writeText(value);
    }

    function clipboardCopiedAction() {
      setClipboardButtonText(copiedClipboardButtonText);
      setClipboardButtonEnabled(false);

      setTimeout(() => {
        setClipboardButtonText(defaultClipboardButtonText);
        setClipboardButtonEnabled(true);
      }, clipboardResetTimeout);
    }

    return (
      <button
          type="button"
          onClick={ () => {
              copyToClipboard(valueToCopy);
              clipboardCopiedAction();
          }}
          className="btn ms-3 my-3 btn-primary"
          disabled={!clipboardButtonEnabled || valueToCopy.length <= 0}
      >
          <ClipboardIcon className="me-2"/>{clipboardButtonText}
      </button>
    );
  }
  
  export default Clipboard;
  