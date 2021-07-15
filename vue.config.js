const path = require('path')
const CreateTemplate = require('./createTemplate')
const routes = require('./src/routes')


let prodPages = {};

routes.routes.forEach(route=>{
    const name = route.name
    prodPages[name]= {
        entry: './routerTml/'+name + '.js',
        template: 'public/index.html',
        title: 'Index Page',
    }
})

console.log(prodPages)

module.exports = {
    configureWebpack : config => {
        console.log(config)
        config.resolve.alias = Object.assign({},config.resolve.alias,{ '@': path.resolve(__dirname, '/src') }) 
        config.plugins.push(new CreateTemplate())
    },
    pages: prodPages
}