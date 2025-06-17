import React, { useEffect, useCallback } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isConfirmLoading?: boolean;
  confirmButtonType?: "danger" | "primary";
  closeOnBackdropClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isConfirmLoading = false,
  confirmButtonType = "primary",
  closeOnBackdropClick = true,
}) => {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnBackdropClick) {
        onClose();
      }
    },
    [onClose, closeOnBackdropClick]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {title}
          </h2>
          {subtitle && <p className={styles.modalSubtitle}>{subtitle}</p>}
        </div>

        <div className={styles.modalBody}>{children}</div>

        {onConfirm && (
          <div className={styles.modalFooter}>
            <button className={`${styles.modalButton} ${styles.modalButtonSecondary}`} onClick={onClose} disabled={isConfirmLoading}>
              {cancelText}
            </button>
            <button
              className={`${styles.modalButton} ${confirmButtonType === "danger" ? styles.modalButtonDanger : styles.modalButtonSecondary}`}
              onClick={onConfirm}
              disabled={isConfirmLoading}
            >
              {isConfirmLoading && <div className={styles.loadingSpinner} />}
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
