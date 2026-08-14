import assert from 'node:assert/strict';
import test from 'node:test';

const importExt = async (name) => import(`../src/js/ext.js?${name}-${Date.now()}-${Math.random()}`);

test('webext falls back to chrome when browser has no runtime', async () => {
  const chromeRuntime = { sendMessage: async () => 'ok' };
  globalThis.browser = {};
  globalThis.chrome = { runtime: chromeRuntime };

  const { runtime, webext } = await importExt('chrome-fallback');

  assert.equal(webext, globalThis.chrome);
  assert.equal(runtime, chromeRuntime);
});

test('sendMessage retries transient failures with configurable attempts and delay', async () => {
  let attempts = 0;
  globalThis.browser = {
    runtime: {
      sendMessage: async () => {
        attempts += 1;
        if (attempts < 2) {
          throw new Error('service worker unavailable');
        }
        return { ok: true };
      }
    }
  };
  globalThis.chrome = undefined;

  const { sendMessage } = await importExt('retry');

  assert.deepEqual(await sendMessage({ type: 'ping' }, { attempts: 2, delay: 0 }), { ok: true });
  assert.equal(attempts, 2);
});
