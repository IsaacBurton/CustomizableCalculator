import { useState } from "react";

export function Function(props) {
  const { 
      name: functionName, 
      isEnabled = isEnabled,
      onCheckChange= onCheckChange,
  } = props;

  return (
    <div>
        <input type='checkbox' checked={isEnabled} onChange={onCheckChange} />{functionName}
    </div>
  )
}