import React from "react";

interface SimpleMDEProps {
  value: string;
  onChange: (value: string) => void;
}

const SimpleMDE: React.FC<SimpleMDEProps> = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Description"
  />
);

export default SimpleMDE;
