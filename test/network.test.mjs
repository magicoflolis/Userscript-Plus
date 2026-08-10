import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.chrome = { runtime: {}, storage: { local: {} } };

const { default: Network, NetworkError } = await import('../src/js/network.js');

test('Network.req returns parsed JSON for successful responses', async () => {
  globalThis.fetch = async (url, params) => ({
    ok: true,
    async json() {
      return { url, method: params.method };
    }
  });

  assert.deepEqual(await Network.req('https://example.test/data', 'get'), {
    url: 'https://example.test/data',
    method: 'GET'
  });
});

test('Network.req throws NetworkError without parsing failed responses', async () => {
  let parsed = false;
  globalThis.fetch = async () => ({
    ok: false,
    status: 503,
    statusText: 'Service Unavailable',
    async json() {
      parsed = true;
      return {};
    }
  });

  await assert.rejects(
    () => Network.req('https://example.test/fail'),
    (error) => error instanceof NetworkError && error.status === 503
  );
  assert.equal(parsed, false);
});
