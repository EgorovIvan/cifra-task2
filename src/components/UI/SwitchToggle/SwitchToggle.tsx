import React, { useState } from 'react';
import './switch_toggle.scss';

interface SwitchToggleProps {
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ initialChecked = false, onChange }) => {
  const [checked, setChecked] = useState(initialChecked);

  const toggleSwitch = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="tips-container">
      <div className={`switch ${checked ? 'checked' : ''}`} onClick={toggleSwitch}>
        <div className="ellipse" />
      </div>
    </div>
  );
};

export default SwitchToggle;
