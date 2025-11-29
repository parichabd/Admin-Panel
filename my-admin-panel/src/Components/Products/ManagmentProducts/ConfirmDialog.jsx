import styles from "./ConfirmDialog.module.css";
import deletes from "../../../assets/icons/Close.png";

function ConfirmDialog({ open,message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <img src={deletes} alt="بسته شدن" />
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.no} onClick={onConfirm}>حذف</button>
          <button className={styles.yes} onClick={onCancel}>لغو</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
