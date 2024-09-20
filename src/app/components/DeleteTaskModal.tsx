import styles from "../styles/modal.module.scss";

interface DeleteTaskModalProps {
  onClose: () => void;
  onDelete: () => void;
  taskTitle: string;
}

export default function DeleteTaskModal({
  onClose,
  onDelete,
  taskTitle,
}: DeleteTaskModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.deleteContainer}>
          <h2>Deletar tarefa</h2>

          <p className={styles.deleteAsk}>
            Tem certeza que você deseja deletar essa tarefa?
          </p>

          <div className={styles.modalActions}>
            <button onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button onClick={onDelete} className={styles.deleteButton}>
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
