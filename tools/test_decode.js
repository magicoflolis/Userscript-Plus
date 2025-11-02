import { decode } from '../src/js/util.js';
import assert from 'assert';

const encodedURI = 'https://example.com/%25'; // %25 is '%'
const expectedDecodedURI = 'https://example.com/%';

try {
  const result = decode(encodedURI);
  assert.strictEqual(result, expectedDecodedURI, 'The URI should be decoded');
  console.log('Test passed!');
} catch (e) {
  console.error('Test failed:', e.message);
}
