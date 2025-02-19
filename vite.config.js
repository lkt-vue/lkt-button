import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';

const src = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');
const test = resolve(__dirname, 'test');
const snapshots = resolve(__dirname, 'snapshots');

export default {
    plugins: [vue()],
    resolve: {
        alias: {'@': src, '@test': test},
    },
    build: {
        lib: {
            entry: `${src}/index.ts`,
            name: 'LktButton',
            fileName: 'build',
            formats: ['es']
        },
        outDir,
        minify: true,
        rollupOptions: {
            external: [
                'vue',
                'vue-router',
                'lkt-anchor',
                'lkt-loader',
                'lkt-field',
                'lkt-http-client',
                'lkt-i18n',
                'lkt-tooltip',
                'lkt-modal',
                'lkt-events',
                'lkt-string-tools',
                'lkt-vue-kernel',
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    'lkt-modal': 'LktModal',
                    'lkt-http-client': 'LktHttpClient',
                    'lkt-vue-tools': 'LktVueTools',
                    'lkt-control-tools': 'LktControlTools',
                    'lkt-string-tools': 'LktStringTools',
                },
                sourcemapExcludeSources: true,
            },
        },
    },
    test: {
        coverage: {
            reporter: ['text', 'lcov'],
        },
        resolveSnapshotPath: (testPath, snapExtension) => {
            const path = testPath.split('/').splice(-2);
            return `${snapshots}/${path[0]}/${path[1]}${snapExtension}`;
        },
    },
};
