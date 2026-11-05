import { defineConfig } from "vite";
import path, { resolve } from 'node:path';
import * as glob from "glob";
import handlebars from 'vite-plugin-handlebars';

const __dirname = import.meta.dirname;

const base_path = './';

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './docs/**',
                    './node_modules/**'
                ]
            }
        ).map((file) => {
            return [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ]
        })
    );
}

export default defineConfig(
    {
        appType: 'mpa',
        base: base_path,
        build: {
            outDir: 'docs',
            rolldownOptions: {
                input: obtenerHtmlFiles()
            }
        },
        plugins: [
            handlebars({
                partialDirectory: "src/components",
            })
        ]
    }
);