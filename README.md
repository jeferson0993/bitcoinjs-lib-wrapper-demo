# Bitcoin Wallet

A secure, client-side Bitcoin wallet application built with Angular 18+, modern web technologies with best practices on top of [bitcoinjs-lib-wrapper](https://www.npmjs.com/package/bitcoinjs-lib-wrapper?activeTab=readme).

## Features

- HD Wallet with BIP39 mnemonic generation
- Multiple address management
- Support for different Bitcoin networks (mainnet, testnet)
- Custom transaction fee settings
- QR code generation for addresses
- Transaction history tracking
- Secure, client-side only operations
- Responsive design for mobile and desktop

## Technology Stack

- Angular 18+
- TypeScript
- bitcoinjs-lib-wrapper
- Tailwind CSS
- Jasmine/Karma for unit testing
- Cypress for E2E testing

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/jeferson0993/bitcoinjs-lib-wrapper-demo.git
cd bitcoinjs-lib-wrapper-demo
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

The application will be available at \`http://localhost:4200\`

## Testing

### Unit Tests

Run unit tests with:
\`\`\`bash
npm test
\`\`\`

Generate coverage report:
\`\`\`bash
npm run test:coverage
\`\`\`

### E2E Tests

Run Cypress tests:
\`\`\`bash
npm run test:e2e
\`\`\`

Open Cypress Test Runner:
\`\`\`bash
npm run cypress:open
\`\`\`

## Project Structure

\`\`\`
src/
├── app/
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files
│   ├── pages/           # Route components
│   ├── services/        # Business logic and data services
│   ├── shared/          # Shared components
│   └── types/           # TypeScript interfaces and types
└── styles/              # Global styles
\`\`\`

## Security Considerations

- All cryptographic operations are performed client-side
- Private keys never leave the user's browser
- Sensitive data is encrypted before storage
- No external API dependencies for core wallet functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgments

- bitcoinjs-lib-wrapper
- Angular