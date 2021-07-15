const path = require('path')
const fs = require('fs')

class CreateTemplate {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('CreateTemplatePlugin', (compilation) => {
            let mainFileContent = fs.readFileSync(path.join(__dirname, './src/main.js'), 'utf8')
            let routerFileContent = fs.readFileSync(path.join(__dirname, './src/router.js'), 'utf8')
            let routesFileContent = fs.readFileSync(path.join(__dirname, './src/routes.js'), 'utf8')

            const root = 'routerTml'

            if (!fs.existsSync(path.join(__dirname, root))) {
                fs.mkdirSync(path.join(__dirname, root))
            }

            const reg = /\{\s+path[\s\S]*?name:\s+'(\w+)'[\s\S]*?(meta[\s\S]*?\})?\s+\}/gm;

            let result = '';

            while (result = reg.exec(routesFileContent)) {
                let name = result[1];
                let conent = result[0];

                const outRouterFile = path.join(__dirname, root, name + '-router.js');
                const outMainFile = path.join(__dirname, root, name + '.js');

                const outRouterConent = routerFileContent.replace(/\'{{routes}}\'/g, conent);
                const outMainContent = mainFileContent.replace(/\'{{router}}\'/g, '"./' + name + '-router.js"');

                fs.writeFileSync(outRouterFile, outRouterConent)
                fs.writeFileSync(outMainFile, outMainContent)



            }




        });
    }
}

module.exports = CreateTemplate