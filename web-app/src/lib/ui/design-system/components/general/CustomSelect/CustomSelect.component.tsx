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
  onChange: (value: string) => void;
};

const CustomSelectComponent: React.FC<CustomSelectProps> = ({
  value,
  values,
  onChange,
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values?.map((val, index) => (
            <SelectItem key={index} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const CustomSelect = memo(CustomSelectComponent);
