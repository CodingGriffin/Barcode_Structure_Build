# Interactive Barcode Structure Builder

A sophisticated React-based web application for building and visualizing custom barcode structures with real-time component interaction and validation.

## 🚀 Features

- **Interactive Barcode Visualization**: Real-time barcode generation with color-coded component highlighting
- **Component-Based Architecture**: Modular barcode structure with 5 distinct components:
  - Memory Capacity (Position 1)
  - Calendar Year (Position 2) 
  - Lot Number (Positions 3-4)
  - Product Series (Positions 5-7)
  - Check Character (Position 8)
- **Smart Validation**: Automatic check character calculation using ASCII sum modulo 10
- **Responsive Design**: Optimized for desktop and mobile devices
- **Professional UI**: Modern design with Tailwind CSS and Lucide React icons

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support
- **Development**: Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd interactive-barcode-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```
src/
├── components/
│   └── BarcodeBuilder.tsx    # Main barcode builder component
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles with Tailwind
└── vite-env.d.ts            # Vite type definitions
```

## 🎯 Barcode Structure

The application generates 8-character barcodes with the following structure:

| Position | Component | Format | Range | Description |
|----------|-----------|--------|-------|-------------|
| 1 | Memory Capacity | A-J | 10 options | Storage capacity (1GB-512GB) |
| 2 | Calendar Year | A-Z | 26 years | Manufacturing year (2008-2033) |
| 3-4 | Lot Number | AA-ZZ | 676 combinations | Lot identification |
| 5-7 | Product Series | AAA-ZZZ | 17,576 combinations | Product series code |
| 8 | Check Character | 0-9 | Calculated | Validation digit |

## 🔍 Component Details

### Memory Capacity Codes
- A: 1GB, B: 2GB, C: 4GB, D: 8GB, E: 16GB
- F: 32GB, G: 64GB, H: 128GB, I: 256GB, J: 512GB

### Year Encoding
- Sequential alphabetic encoding starting from 2008
- A = 2008, B = 2009, ..., Z = 2033
- **Note**: Current schema supports only until 2033

### Lot Numbers
- Two-letter combinations: AA=1, AB=2, ..., ZZ=676
- Base-26 encoding system

### Product Series
- Three-letter combinations: AAA=1, AAB=2, ..., ZZZ=17,576
- Extended base-26 encoding system

### Check Character
- Calculated using sum of ASCII values modulo 10
- Provides basic error detection capability

## 🎨 UI Features

- **Color-coded Components**: Each barcode segment has distinct colors
- **Hover Interactions**: Visual feedback when hovering over components
- **Real-time Updates**: Instant barcode regeneration on component changes
- **Validation Tooltips**: Contextual information and warnings
- **Professional Branding**: Integrated company logo display

## 🚨 Known Limitations

1. **Year Range**: Current schema only supports years 2008-2033 (26 years)
2. **Memory Codes**: Capacity mappings need confirmation for production use
3. **Check Algorithm**: Simple ASCII sum - consider stronger validation for production

## 🔮 Future Enhancements

- [ ] Extended year range support (multi-character encoding)
- [ ] Advanced check digit algorithms (Luhn, etc.)
- [ ] Barcode export functionality (PNG, SVG, PDF)
- [ ] Batch barcode generation
- [ ] Custom component validation rules
- [ ] Database integration for code management
- [ ] Print-ready barcode formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏢 About

Developed for Well Assembled Meetings - Professional barcode structure management solution.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**