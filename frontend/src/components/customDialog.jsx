import "./CustomDialog.css"
const CustomDialog = ({ onYes, onNo, onCancel, message }) => {
    return (
        <div className='dialog'>
            <p>{message}</p>
            <button className="btnDialog yes" onClick={onYes}>Sí</button>
            <button className="btnDialog no" onClick={onNo}>No</button>
            <button className="btnDialog cancel" onClick={onCancel}>Cancelar</button>
        </div>
    )
}
export default CustomDialog
