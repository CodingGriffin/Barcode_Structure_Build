import React, { useState, useEffect } from 'react';
import { BarChart3, Calendar, Package, Hash, Shield, Info, AlertCircle } from 'lucide-react';

interface BarcodeComponents {
  memoryCapacity: string;
  yearCode: string;
  lotNumber: string;
  productSeries: string;
  checkCharacter: string;
}

const BarcodeBuilder: React.FC = () => {
  const [components, setComponents] = useState<BarcodeComponents>({
    memoryCapacity: 'A',
    yearCode: 'A',
    lotNumber: 'AA',
    productSeries: 'AAA',
    checkCharacter: '0'
  });

  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  // Memory capacity options (inferred)
  const memoryCapacities = [
    { code: 'A', capacity: '1GB' },
    { code: 'B', capacity: '2GB' },
    { code: 'C', capacity: '4GB' },
    { code: 'D', capacity: '8GB' },
    { code: 'E', capacity: '16GB' },
    { code: 'F', capacity: '32GB' },
    { code: 'G', capacity: '64GB' },
    { code: 'H', capacity: '128GB' },
    { code: 'I', capacity: '256GB' },
    { code: 'J', capacity: '512GB' },
  ];

  // Year codes
  const yearCodes = Array.from({ length: 26 }, (_, i) => ({
    code: String.fromCharCode(65 + i),
    year: 2008 + i
  }));

  // Generate lot numbers (AA = 1, AB = 2, etc.) - Complete sequence to ZZ = 676
  const generateLotNumbers = () => {
    const lotNumbers = [];
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        const code = String.fromCharCode(65 + i) + String.fromCharCode(65 + j);
        const value = i * 26 + j + 1;
        lotNumbers.push({ code, value });
      }
    }
    return lotNumbers;
  };

  const lotNumbers = generateLotNumbers();

  // Generate product series numbers (AAA = 1, AAB = 2, etc.) - Complete sequence to ZZZ = 17,576
  const generateProductSeries = () => {
    const productSeries = [];
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        for (let k = 0; k < 26; k++) {
          const code = String.fromCharCode(65 + i) + String.fromCharCode(65 + j) + String.fromCharCode(65 + k);
          const value = i * 676 + j * 26 + k + 1;
          productSeries.push({ code, value });
        }
      }
    }
    return productSeries;
  };

  const productSeries = generateProductSeries();

  // Simple check character calculation (sum of ASCII values mod 10)
  useEffect(() => {
    const baseString = components.memoryCapacity + components.yearCode + components.lotNumber + components.productSeries;
    const checkSum = baseString.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    setComponents(prev => ({ ...prev, checkCharacter: (checkSum % 10).toString() }));
  }, [components.memoryCapacity, components.yearCode, components.lotNumber, components.productSeries]);

  const fullBarcode = components.memoryCapacity + components.yearCode + components.lotNumber + components.productSeries + components.checkCharacter;

  const componentInfo = {
    memoryCapacity: {
      title: 'Memory Capacity',
      description: 'Single letter code representing storage capacity',
      icon: BarChart3,
      color: 'bg-blue-500',
      position: 0,
      tooltip: 'Please confirm these codes or provide a correct list.'
    },
    yearCode: {
      title: 'Calendar Year',
      description: 'Year of manufacture (A=2008 to Z=2033)',
      icon: Calendar,
      color: 'bg-indigo-500',
      position: 1,
      tooltip: 'Please be advised that only 8 more years are possible with the current barcode schema.'
    },
    lotNumber: {
      title: 'Lot Number',
      description: 'Two-letter lot identification (AA=1 to ZZ=676)',
      icon: Package,
      color: 'bg-emerald-500',
      position: 2,
      tooltip: 'Will this be specified when every order is placed?'
    },
    productSeries: {
      title: 'Product Series',
      description: 'Three-letter series code (AAA=1 to ZZZ=17,576)',
      icon: Hash,
      color: 'bg-purple-500',
      position: 5,
      tooltip: 'Please confirm these codes. Will this be specified when the order is placed?'
    },
    checkCharacter: {
      title: 'Check Character',
      description: 'Validation digit for error detection',
      icon: Shield,
      color: 'bg-rose-500',
      position: 7,
      tooltip: 'Is this random or specified?'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative text-center mb-8">
          <div className="left-4 mt-5 transform -translate-y-1/2" style={{width: "15%"}}>
            <img 
              src="https://imagedelivery.net/MKEvMIcAFUaEDbHj7BP86Q/55f99260-44f4-430e-19da-235c6405cb00/public" 
              alt="Well Assembled Meetings Logo" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Barcode Display */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Barcode</h2>
            <div className="inline-flex bg-gray-900 rounded-lg p-6">
              <div className="flex font-mono text-4xl font-bold text-white tracking-wider">
                {fullBarcode.split('').map((char, index) => {
                  let componentKey = '';
                  let bgColor = 'bg-gray-700';
                  let hoverColor = 'bg-gray-700';
                  
                  if (index === 0) {
                    componentKey = 'memoryCapacity';
                    bgColor = 'bg-blue-500';
                    hoverColor = 'bg-blue-600';
                  } else if (index === 1) {
                    componentKey = 'yearCode';
                    bgColor = 'bg-indigo-500';
                    hoverColor = 'bg-indigo-600';
                  } else if (index >= 2 && index <= 3) {
                    componentKey = 'lotNumber';
                    bgColor = 'bg-emerald-500';
                    hoverColor = 'bg-emerald-600';
                  } else if (index >= 4 && index <= 6) {
                    componentKey = 'productSeries';
                    bgColor = 'bg-purple-500';
                    hoverColor = 'bg-purple-600';
                  } else if (index === 7) {
                    componentKey = 'checkCharacter';
                    bgColor = 'bg-rose-500';
                    hoverColor = 'bg-rose-600';
                  }

                  const isHovered = hoveredComponent === componentKey;
                  const finalBgColor = isHovered ? hoverColor : bgColor;

                  return (
                    <span
                      key={index}
                      className={`px-3 py-2 mx-1 rounded transition-all duration-200 ${finalBgColor}`}
                      onMouseEnter={() => setHoveredComponent(componentKey)}
                      onMouseLeave={() => setHoveredComponent(null)}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Component Builders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Memory Capacity */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
            onMouseEnter={() => setHoveredComponent('memoryCapacity')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Permanent Tooltip */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800 font-medium">
                  Please confirm these codes or provide a correct list.
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Memory Capacity</h3>
            </div>
            <select
              value={components.memoryCapacity}
              onChange={(e) => setComponents(prev => ({ ...prev, memoryCapacity: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {memoryCapacities.map(memory => (
                <option key={memory.code} value={memory.code}>
                  {memory.code} - {memory.capacity}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">Position 1 • Letter code for storage capacity</p>
          </div>

          {/* Year Code */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
            onMouseEnter={() => setHoveredComponent('yearCode')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Permanent Tooltip */}
            <div className="mb-4 p-3 bg-blue-200 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-blue-900 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-900 font-medium">
                  Please be advised that only 8 more years are possible with the current barcode schema.
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Calendar Year</h3>
            </div>
            <select
              value={components.yearCode}
              onChange={(e) => setComponents(prev => ({ ...prev, yearCode: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              {yearCodes.map(year => (
                <option key={year.code} value={year.code}>
                  {year.code} - {year.year}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">Position 2 • Manufacturing year (A=2008)</p>
          </div>

          {/* Lot Number */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
            onMouseEnter={() => setHoveredComponent('lotNumber')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Permanent Tooltip */}
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-800 font-medium">
                  Will this be specified when every order is placed?
                  Are these used only once each a year?
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Lot Number</h3>
            </div>
            <select
              value={components.lotNumber}
              onChange={(e) => setComponents(prev => ({ ...prev, lotNumber: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            >
              {lotNumbers.map(lot => (
                <option key={lot.code} value={lot.code}>
                  {lot.code} - Lot #{lot.value}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">Positions 3-4 • Lot identification (AA=1 to ZZ=676)</p>
          </div>

          {/* Product Series */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl lg:col-span-2"
            onMouseEnter={() => setHoveredComponent('productSeries')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Permanent Tooltip */}
            <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-purple-800 font-medium">
                  Please confirm these codes. Will this be specified when the order is placed?
                  Are these used only once each a year?
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <Hash className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Product Series</h3>
            </div>
            <select
              value={components.productSeries}
              onChange={(e) => setComponents(prev => ({ ...prev, productSeries: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            >
              {productSeries.map(series => (
                <option key={series.code} value={series.code}>
                  {series.code} - Series #{series.value}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">Positions 5-7 • Product series number (AAA=1 to ZZZ=17,576)</p>
          </div>

          {/* Check Character */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
            onMouseEnter={() => setHoveredComponent('checkCharacter')}
            onMouseLeave={() => setHoveredComponent(null)}
          >
            {/* Permanent Tooltip */}
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-rose-800 font-medium">
                  Is this random or specified?
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="p-2 bg-rose-100 rounded-lg mr-3">
                <Shield className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Check Character</h3>
            </div>
            <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-center font-mono text-xl font-bold">
              {components.checkCharacter}
            </div>
            <p className="text-sm text-gray-500 mt-2">Position 8 • Auto-calculated validation digit</p>
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Barcode Structure Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(componentInfo).map(([key, info]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className={`p-2 ${info.color} rounded-lg mr-3`}>
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800">{info.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Complete Barcode: {fullBarcode}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Memory:</strong> {memoryCapacities.find(m => m.code === components.memoryCapacity)?.capacity}
              </div>
              <div>
                <strong>Year:</strong> {yearCodes.find(y => y.code === components.yearCode)?.year}
              </div>
              <div>
                <strong>Lot:</strong> #{lotNumbers.find(l => l.code === components.lotNumber)?.value}
              </div>
              <div>
                <strong>Series:</strong> #{productSeries.find(s => s.code === components.productSeries)?.value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeBuilder;