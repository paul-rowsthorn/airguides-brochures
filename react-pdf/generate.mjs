import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { TongaBrochure } from './src/brochure.mjs';

const output = process.argv[2] || 'tonga-brochure.pdf';

console.log('Generating PDF...');
console.time('PDF generated');

await renderToFile(React.createElement(TongaBrochure), output);

console.timeEnd('PDF generated');
console.log(`Saved to: ${output}`);
