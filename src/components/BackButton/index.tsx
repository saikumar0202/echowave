import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes";

// Goes back in history, or to Discover when the page was opened directly
// (e.g. from a shared link) and there is nothing to go back to.
export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <button className='view__back' aria-label='Back'
            onClick={() => (location.key === 'default' ? navigate(routes.discover()) : navigate(-1))}>
      <i className='fa-solid fa-arrow-left' />
    </button>
  );
};
