import React from 'react'
import { ServiceInputWrapperWithLabel } from './ServiceInputWrapperWithLabel'
import { Input } from 'react-saasify/src/lib/antd'

export const ServiceInput = ({
  default: defaultValue,
  type,
  onChange,
  propKey,
  ...props
}) => (
  <ServiceInputWrapperWithLabel propKey={propKey} {...props}>
    <Input
      type={type}
      value={defaultValue}
      onChange={onChange}
      name={propKey}
    />
  </ServiceInputWrapperWithLabel>
)
