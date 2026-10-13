import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { hideToast } from "../../redux/reducers/UIReducer";
import './styles.scss';

const TOAST_DURATION_MS = 2500;

export const Toast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.ui.toast);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => dispatch(hideToast(toast.id)), TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [toast, dispatch]);

  return (
    <div className='toast-region' role='status' aria-live='polite'>
      {toast && <div className='toast' key={toast.id}>{toast.message}</div>}
    </div>
  );
};
