import { BugFill } from "react-bootstrap-icons";

function Message({ message }) {
    return (
        <>
            {
                message.length > 0
                ?   
                    <div>
                        
                        <p className="text-center text-bg-warning rounded-3 p-3">
                            <BugFill className="me-2"/>
                            {message}
                        </p>
                    </div>
                : null
            }
        </>
    );
}
  
  export default Message;
  