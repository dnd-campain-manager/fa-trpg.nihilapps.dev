'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  CustomCheck, CustomDate,
  CustomInput, CustomLabel, CustomRadio, CustomSelect,
  CustomTextArea
} from '@/src/components';
import { FormField, FormItem, Message } from '@/src/shadcn';

interface Props {
  name: string;
  label?: string;
  codeLabel?: string;
  type?: 'text' | 'password'| 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  showMessage?: boolean;
  code?: string;
  mode?: 'input' | 'radio' | 'select' | 'checkbox' | 'textarea' | 'date';
  form: UseFormReturn;
  itemName?: string;
  validate?: boolean;
  singleInput?: boolean;
  styles?: ClassNameValue;
}

export function CustomFormItem({
  name, label, codeLabel, type = 'text', placeholder, disabled = false, showMessage = true, code, mode = 'input', form, validate = true, itemName, styles, singleInput,
}: Props) {
  const css = {
    default: twJoin([
      `!space-y-0 !mb-0`,
      styles,
    ]),
    input: twJoin([
      singleInput && `!mt-0`,
    ]),
  };

  return (
    <>
      <FormField
        render={({ field, }) => (
          <FormItem className={css.default}>
            {label && (
              <CustomLabel
                name={name}
                itemName={itemName}
                form={form}
                mode={mode}
                disabled={disabled}
                validate={validate}
                fieldLabel
              >
                {label}
              </CustomLabel>
            )}
            {mode === 'input' && (
              <CustomInput
                name={name}
                type={type}
                field={field}
                form={form}
                disabled={disabled}
                validate={validate}
                placeholder={placeholder}
                styles={css.input}
              />
            )}
            {mode === 'select' && (
              <CustomSelect
                name={name}
                code={code}
                field={field}
                form={form}
                disabled={disabled}
                label={codeLabel}
                validate={validate}
                styles={css.input}
              />
            )}
            {mode === 'radio' && (
              <CustomRadio
                name={name}
                itemName={itemName}
                code={code}
                label={codeLabel}
                field={field}
                form={form}
                disabled={disabled}
                validate={validate}
                styles={css.input}
              />
            )}
            {mode === 'checkbox' && (
              <CustomCheck
                itemName={itemName}
                code={code}
                label={codeLabel}
                form={form}
                disabled={disabled}
                validate={validate}
                styles={css.input}
              />
            )}
            {mode === 'textarea' && (
              <CustomTextArea
                name={name}
                field={field}
                form={form}
                disabled={disabled}
                validate={validate}
              />
            )}
            {mode === 'date' && (
              <CustomDate
                name={name}
                field={field}
                form={form}
                disabled={disabled}
                validate={validate}
              />
            )}
            {(showMessage && form.formState.errors[name]) && (
              <Message color='red'>
                {form.formState.errors[name].message as string}
              </Message>
            )}
          </FormItem>
        )}
        name={name}
      />
    </>
  );
}
