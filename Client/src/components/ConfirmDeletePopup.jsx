import PropTypes from 'prop-types';
import './ConfirmDeletePopup.css'; // Asegúrate de crear este archivo CSS

const ConfirmDeletePopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-delete-overlay">
      <div className="confirm-delete-popup">
        <h2>¿Está Seguro que quiere Borrar la solicitud?</h2>
        <div className="confirm-delete-actions">
          <button onClick={onCancel} className="button cancel-button">No Borrar</button>
          <button onClick={onConfirm} className="button confirm-button">Borrar</button>
        </div>
      </div>
    </div>
  );
};

ConfirmDeletePopup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDeletePopup;
