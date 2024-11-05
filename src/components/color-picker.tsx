import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface ColorPickerProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorPicker({ label, value, name, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="h-9 w-9 rounded-md border border-input"
        />
        <Input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1"
        />
      </div>
    </div>
  );
}