import React, { useRef, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';

import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

export default function InputMask({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (pickerRef, value) => {
        pickerRef.setInputValue(value);
      },
      clearValue: pickerRef => {
        pickerRef.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span>{error}</span>}
    </>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
};
