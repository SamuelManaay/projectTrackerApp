import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const ErrorFocus = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext();

  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      const errorElement = document.querySelector(`[name="${keys[0]}"]`);

      if (errorElement) {
        errorElement.focus();
      }
    }
  }, [isSubmitting, isValidating, errors]);

  return null;
};

export default ErrorFocus;
