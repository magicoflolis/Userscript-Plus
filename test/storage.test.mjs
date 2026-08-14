import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.chrome = {
  runtime: {},
  storage: {
    local: {
      async get() {
        return {};
      },
      async set() {},
      async remove() {}
    }
  }
};

const { DEFAULT_CONFIG, normalizeConfig } = await import('../src/js/storage.js');

test('normalizeConfig preserves defaults for missing nested config', () => {
  const cfg = normalizeConfig({ preview: { code: true } });

  assert.equal(cfg.preview.code, true);
  assert.equal(cfg.preview.metadata, DEFAULT_CONFIG.preview.metadata);
  assert.deepEqual(Object.keys(cfg.theme), Object.keys(DEFAULT_CONFIG.theme));
  assert.deepEqual(
    cfg.engines.map((engine) => engine.name),
    DEFAULT_CONFIG.engines.map((engine) => engine.name)
  );
});

test('normalizeConfig carries known engine customizations without dropping defaults', () => {
  const cfg = normalizeConfig({ engines: [{ name: 'github', enabled: true, token: 'abc123' }] });
  const github = cfg.engines.find((engine) => engine.name === 'github');

  assert.equal(github.enabled, true);
  assert.equal(github.token, 'abc123');
  assert.equal(typeof github.query, 'string');
});

test('normalizeConfig preserves custom engines while restoring known defaults', () => {
  const cfg = normalizeConfig({
    engines: [
      { name: 'custom', enabled: true, query: 'https://example.test/{host}.json' },
      { name: 'greasyfork', enabled: false }
    ]
  });

  assert.deepEqual(
    cfg.engines.map((engine) => engine.name),
    ['custom', 'greasyfork', 'sleazyfork', 'github']
  );
  assert.equal(cfg.engines.find((engine) => engine.name === 'greasyfork').enabled, false);
  assert.deepEqual(cfg.engines[0], {
    name: 'custom',
    enabled: true,
    query: 'https://example.test/{host}.json'
  });
});
