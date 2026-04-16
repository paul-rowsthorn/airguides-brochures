import { Font } from '@react-pdf/renderer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS = join(__dirname, '..', 'fonts');

Font.register({
  family: 'Inter',
  fonts: [
    { src: join(FONTS, 'Inter-Light.woff2'), fontWeight: 300 },
    { src: join(FONTS, 'Inter-Regular.woff2'), fontWeight: 400 },
    { src: join(FONTS, 'Inter-SemiBold.woff2'), fontWeight: 600 },
    { src: join(FONTS, 'Inter-Bold.woff2'), fontWeight: 700 },
  ],
});

Font.register({
  family: 'Playfair',
  fonts: [
    { src: join(FONTS, 'PlayfairDisplay-Regular.woff2'), fontWeight: 400 },
    { src: join(FONTS, 'PlayfairDisplay-SemiBold.woff2'), fontWeight: 600 },
    { src: join(FONTS, 'PlayfairDisplay-Bold.woff2'), fontWeight: 700 },
    { src: join(FONTS, 'PlayfairDisplay-Italic.woff2'), fontWeight: 400, fontStyle: 'italic' },
  ],
});

// Disable hyphenation
Font.registerHyphenationCallback(word => [word]);
