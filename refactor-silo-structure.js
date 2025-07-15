
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const root = path.resolve(__dirname, 'apps/web');
const srcRoot = path.join(root, 'src');
const componentsGlobal = path.join(srcRoot, 'app', 'components', 'Global');
const featuresRoot = path.join(srcRoot, 'features');
const publicFolder = path.join(root, 'public');

const productList = ['AEGIS', 'COMPASS', 'VANTA', 'LENS', 'USER_DASHBOARD'];

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function moveAndStubPlaceholder(product) {
    const src = path.join(srcRoot, 'app', 'components', product, 'component-placeholder.tsx');
    const destDir = path.join(featuresRoot, product.toLowerCase(), 'components');
    const dest = path.join(destDir, 'component-placeholder.tsx');
    ensureDir(destDir);
    if (fs.existsSync(src)) {
        fs.writeFileSync(dest, `// TODO: Implement ${product} components here\n`);
        fs.unlinkSync(src);
        console.log(`✅ Stubbed placeholder for ${product}`);
    } else {
        console.log(`⚠️ No placeholder found for ${product}`);
    }
}

function moveGlobalComponents() {
    if (!fs.existsSync(componentsGlobal)) {
        console.log('❌ Global components folder not found.');
        return;
    }

    const files = fs.readdirSync(componentsGlobal).filter(f => f.endsWith('.tsx'));
    files.forEach(file => {
        const srcPath = path.join(componentsGlobal, file);
        let destPath;

        const matchedProduct = productList.find(product =>
            file.toLowerCase().includes(product.toLowerCase())
        );

        if (matchedProduct) {
            const destDir = path.join(featuresRoot, matchedProduct.toLowerCase(), 'components');
            ensureDir(destDir);
            destPath = path.join(destDir, file);
        } else {
            const destDir = path.join(srcRoot, 'components', 'common');
            ensureDir(destDir);
            destPath = path.join(destDir, file);
        }

        fs.renameSync(srcPath, destPath);
        console.log(`📦 Moved ${file} to ${destPath.replace(root + '/', '')}`);
    });
}

function moveMedia() {
    const mappings = [
        { from: 'Background Videos', to: 'media/videos' },
        { from: 'General Images', to: 'media/images' },
    ];

    mappings.forEach(({ from, to }) => {
        const srcDir = path.join(publicFolder, from);
        const destDir = path.join(publicFolder, to);
        ensureDir(destDir);
        if (fs.existsSync(srcDir)) {
            const mediaFiles = fs.readdirSync(srcDir);
            mediaFiles.forEach(file => {
                const src = path.join(srcDir, file);
                const dest = path.join(destDir, file);
                fs.renameSync(src, dest);
                console.log(`🎞️  Moved ${file} to ${to}`);
            });
        }
    });
}

function rewriteImports() {
    const pattern = path.join(srcRoot, '**/*.tsx');
    glob.sync(pattern).forEach(file => {
        let content = fs.readFileSync(file, 'utf-8');
        const original = content;

        content = content.replace(
            /['"](?:\.\/)?components\/Global\/([^'"]+)['"]/g,
            (match, p1) => {
                for (const product of productList) {
                    if (p1.toLowerCase().includes(product.toLowerCase())) {
                        return `'@/features/${product.toLowerCase()}/components/${p1}'`;
                    }
                }
                return `'@/components/common/${p1}'`;
            }
        );

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf-8');
            console.log(`✍️  Rewrote imports in ${file.replace(root + '/', '')}`);
        }
    });
}

function main() {
    console.log('🚀 Starting SILO structure refactor...');
    productList.forEach(moveAndStubPlaceholder);
    moveGlobalComponents();
    moveMedia();
    rewriteImports();
    console.log('✅ Refactor complete.');
}

main();
