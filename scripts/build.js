#!/usr/bin/env node

const { build } = require('esbuild');

async function bundle() {
  try {
    await build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node18',
      outfile: 'dist/index.js',
      sourcemap: true,
      minify: true,
      format: 'cjs',
      banner: {
        js: '#!/usr/bin/env node',
      },
      // No external packages, include everything in the bundle
      external: [],
    });
    console.log('Bundle complete! Output: dist/index.js');
  } catch (error) {
    console.error('Bundle failed:', error);
    process.exit(1);
  }
}

bundle(); 