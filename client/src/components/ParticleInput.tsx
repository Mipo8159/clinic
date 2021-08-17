import React, { ChangeEvent } from 'react';

interface ParticleInputProps {
  classname: string;
  error: string;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent) => void;
}
const ParticleInput: React.FC<ParticleInputProps> = ({
  classname,
  error,
  label,
  type,
  placeholder,
  value,
  id,
  name,
  onChange,
}) => {
  return (
    <div className={classname}>
      <label htmlFor={id} className='my__label mb-0'>
        <div className='name__label my__label__important'>
          {label} <span>*</span>
        </div>

        <small className='name__important my__important'>{error}</small>
      </label>

      <input
        type={type}
        id={id}
        className='name__input'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ParticleInput;
