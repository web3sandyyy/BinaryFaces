import React, { useState } from 'react';
import { Settings, Github, Package, Shuffle, Menu, X } from 'lucide-react';
import AvatarGenerator from './AvatarGenerator';
import { ConfigPanel } from './components/config-panel';

function App() {
  const [config, setConfig] = useState({
    value: 'binary-faces',
    width: 200,
    bgColor: '#10b981',
    isRounded: false,
    onlyFace: false,
    border: true,
    borderColor: '#000000',
    borderSize: 2
  });
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWidthChange = (value: number[]) => {
    setConfig(prev => ({
      ...prev,
      width: value[0]
    }));
  };

  const handleToggle = (name: string) => (checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const generateRandom = () => {
    const randomValue = Math.random().toString(36).substring(2, 8);
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
    setConfig(prev => ({
      ...prev,
      value: randomValue,
      width: config.width,
      bgColor: randomColor,
      isRounded: config.isRounded,
      onlyFace: config.onlyFace,
      border: config.border,
      borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
      borderSize: config.borderSize
    }));
  };

  const copyConfig = () => {
    const configStr = `<AvatarGenerator
  value="${config.value}"
  width={${config.width}}
  bgColor="${config.bgColor}"
  isRounded={${config.isRounded}}
  onlyFace={${config.onlyFace}}
  border={${config.border}}
  borderColor="${config.borderColor}"
  borderSize={${config.borderSize}}
/>`;
    navigator.clipboard.writeText(configStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const NavLinks = () => (
    <>
      <button
        onClick={generateRandom}
        className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        <span>Random</span>
      </button>
      <a
        href="https://www.npmjs.com/package/binary-faces"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <Package className="w-5 h-5" />
        <span>NPM</span>
      </a>
      <a
        href="https://github.com/web3sandyyy/BinaryFaces"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <Github className="w-5 h-5" />
        <span>GitHub</span>
      </a>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-emerald-500" />
              <h1 className="text-2xl font-bold text-gray-900">Binary Faces Demo</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLinks />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <div className="flex flex-col space-y-4">
                <NavLinks />
              </div>
            </div>
          )}
        </div>
      </header>
 
      <main className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex items-center justify-center min-h-[400px] bg-white rounded-lg shadow-sm p-8">
              <AvatarGenerator {...config} />
            </div>

            <ConfigPanel
              config={config}
              onChange={handleInputChange}
              onWidthChange={handleWidthChange}
              onToggle={handleToggle}
              copied={copied}
              onCopy={copyConfig}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;