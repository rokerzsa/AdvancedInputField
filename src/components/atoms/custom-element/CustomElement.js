import React from 'react';

const CustomElement = ({ attributes, children }) => (
  <span style={{ backgroundColor: 'yellow' }} {...attributes}>
    {children}
  </span>
);

export default CustomElement;
