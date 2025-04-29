import { useState, useEffect } from 'react';
import { useFetch } from "../hooks/useFetch";

export function FunctionCheckbox(props) {
  const { 
      name: functionName, 
      isEnabled: isEnabled,
      courseId: courseId,
      onToggle: onToggle,
  } = props;

  const [isChecked, setIsChecked] = useState(isEnabled);
  const [hasError, setHasError] = useState(false);
  const makeRequest = useFetch();

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }
  }, [hasError])

  async function handleCheckboxChange() {
    const response = await makeRequest(`/functions/${courseId}/`, 'POST', {
      function_name: functionName,
      is_checked: !isChecked,
    });

    if (response.ok) {
      setIsChecked(!isChecked);
      onToggle();
    } else {
      setHasError(true);
    }
  }

  return (
    <div>
        <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>{functionName}
    </div>
  )
}