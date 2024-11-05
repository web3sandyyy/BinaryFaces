import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Slider} from './ui/slider';
import { ColorPicker } from './color-picker';
import { Copy, Check } from 'lucide-react';

interface ConfigPanelProps {
  config: {
    value: string;
    width: number;
    bgColor: string;
    isRounded: boolean;
    onlyFace: boolean;
    border: boolean;
    borderColor: string;
    borderSize: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWidthChange: (value: number[]) => void;
  onToggle: (name: string) => (checked: boolean) => void;
  copied: boolean;
  onCopy: () => void;
}

export function ConfigPanel({ config, onChange, onWidthChange, onToggle, copied, onCopy }: ConfigPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Customize</h2>
        <button
          onClick={onCopy}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Value (Seed)</Label>
          <Input
            type="text"
            name="value"
            value={config.value}
            onChange={onChange}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Width</Label>
            <span className="text-sm text-gray-500">{config.width}px</span>
          </div>
          <Slider
            value={[config.width]}
            onValueChange={onWidthChange}
            min={100}
            max={400}
            step={1}
            className="py-4"
          />
        </div>

        <ColorPicker
          label="Background Color"
          name="bgColor"
          value={config.bgColor}
          onChange={onChange}
        />

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-between space-x-4">
            <Label className="text-gray-700">Rounded</Label>
            <Switch
              checked={config.isRounded}
              onCheckedChange={onToggle('isRounded')}
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <Label className="text-gray-700">Only Face</Label>
            <Switch
              checked={config.onlyFace}
              onCheckedChange={onToggle('onlyFace')}
            />
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4">
          <Label className="text-gray-700">Border</Label>
          <Switch
            checked={config.border}
            onCheckedChange={onToggle('border')}
          />
        </div>

        {config.border && (
          <div className="space-y-6 pt-4">
            <ColorPicker
              label="Border Color"
              name="borderColor"
              value={config.borderColor}
              onChange={onChange}
            />

            <div className="space-y-2">
              <Label>Border Size (px)</Label>
              <Input
                type="number"
                name="borderSize"
                value={config.borderSize}
                onChange={onChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}