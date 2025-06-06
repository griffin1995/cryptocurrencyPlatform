import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

// Toast Context
const ToastContext = createContext();

// Toast types
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "danger",
  WARNING: "warning",
  INFO: "info",
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (message, type = TOAST_TYPES.INFO, duration = 5000) => {
      const id = Date.now() + Math.random();
      const newToast = {
        id,
        message,
        type,
        duration,
        timestamp: new Date(),
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove toast after duration
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.SUCCESS, duration);
    },
    [addToast]
  );

  const showError = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.ERROR, duration);
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.WARNING, duration);
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.INFO, duration);
    },
    [addToast]
  );

  const value = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            bg={toast.type}
            onClose={() => removeToast(toast.id)}
            show={true}
            delay={toast.duration}
            autohide={toast.duration > 0}
          >
            <Toast.Header>
              <strong className="me-auto">
                {toast.type === TOAST_TYPES.SUCCESS && (
                  <i className="bi bi-check-circle-fill me-2"></i>
                )}
                {toast.type === TOAST_TYPES.ERROR && (
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                )}
                {toast.type === TOAST_TYPES.WARNING && (
                  <i className="bi bi-exclamation-circle-fill me-2"></i>
                )}
                {toast.type === TOAST_TYPES.INFO && (
                  <i className="bi bi-info-circle-fill me-2"></i>
                )}
                {toast.type === TOAST_TYPES.SUCCESS && "Success"}
                {toast.type === TOAST_TYPES.ERROR && "Error"}
                {toast.type === TOAST_TYPES.WARNING && "Warning"}
                {toast.type === TOAST_TYPES.INFO && "Info"}
              </strong>
              <small>{toast.timestamp.toLocaleTimeString()}</small>
            </Toast.Header>
            <Toast.Body
              className={
                toast.type === TOAST_TYPES.SUCCESS ||
                toast.type === TOAST_TYPES.ERROR
                  ? "text-white"
                  : ""
              }
            >
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Custom hook to use toasts
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Higher-order component for easy integration
export const withToast = (Component) => {
  return (props) => (
    <ToastProvider>
      <Component {...props} />
    </ToastProvider>
  );
};
