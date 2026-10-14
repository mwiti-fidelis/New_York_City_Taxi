import './ErrorMessage.css';

export function ErrorMessage({ message }){
    return (
        <>
            <div className="error-msg">{message}</div>
        </>
    )
}