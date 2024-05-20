'use client';

import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  CustomCheck, CustomDropDown,
  CustomInput, CustomLabel, CustomRadio, CustomSelect,
  CustomTextArea, DatePicker
} from '@/src/components';
import { FormField, FormItem, Message } from '@/src/shadcn';
import { DropDownData } from '@/src/entities';

interface Props {
  name: string;
  label?: string;
  codeLabel?: string;
  type?: 'text' | 'password'| 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  showMessage?: boolean;
  code?: string;
  dropDownCode?: DropDownData[];
  mode?: 'input' | 'radio' | 'select' | 'checkbox' | 'textarea' | 'date' | 'dropdown';
  form: UseFormReturn;
  itemName?: string;
  validate?: boolean;
  singleInput?: boolean;
  longText?: boolean;
  initDate?: string;
  showItems?: number;
  initValue?: string;
  date?: string;
  setDate?: any;
  styles?: ClassNameValue;
}

export function CustomFormItem({
  name, label, codeLabel, type = 'text', placeholder, disabled = false, showMessage = true, code, mode = 'input', form, validate = true, itemName, styles, singleInput, longText = false, initDate, showItems, dropDownCode, initValue, date, setDate,
}: Props) {
  const [ dropValue, setDropValue, ] = useState(initValue || 'none');

  useEffect(() => {
    if (mode === 'dropdown') {
      form.setValue(name, dropValue, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: !!validate,
      });
    }
  }, [ mode, name, validate, dropValue, ]);

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
                placeholder={placeholder}
                longText={longText}
              />
            )}
            {mode === 'date' && (
              <DatePicker
                date={date}
                setDate={setDate}
                required={validate}
                disabled={disabled}
                initDate={initDate}
                name={name}
                form={form}
              />
              // <CustomDate
              //   name={name}
              //   form={form}
              //   initDate={initDate}
              //   disabled={disabled}
              //   validate={validate}
              //   time={time}
              // />
            )}
            {mode === 'dropdown' && (
              <CustomDropDown
                data={dropDownCode}
                value={dropValue}
                setValue={setDropValue}
                disabled={disabled}
                validate={validate}
                isValidCond={dropValue !== 'none'}
                showItems={showItems}
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
