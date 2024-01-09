'use client';
import React, { memo } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui';
import { SelectTrigger } from './CustomSelect.style';

export type CustomSelectProps = {
  value: string;
  values?: string[];
  disabled?: boolean[];
  onChange: (value: string) => void;
};

const CustomSelectComponent: React.FC<CustomSelectProps> = ({
  value,
  values,
  disabled,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange} disabled={!values || values.length === 0}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values?.map((val, index) => (
            <SelectItem key={index} value={val} disabled={disabled?.[index]}>
              {val}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const CustomSelect = memo(CustomSelectComponent);
