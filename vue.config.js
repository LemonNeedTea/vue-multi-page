const path = require('path')
const CreateTemplate = require('./createTemplate')
const routes = require('./src/routes')
const { pages } = require('./pages.dev');

let prodPages = {};
let devPages = {};

routes.routes.forEach(route=>{
    const name = route.name
    prodPages[name]= {
        entry: './routerTml/'+name + '.js',
        template: 'public/index.html',
        title: 'Index Page',
    }
})

pages.forEach(page=>{ devPages[page] = prodPages[page] })
console.log(process.env.NODE_ENV );

module.exports = {
    configureWebpack : config => {
        config.resolve.alias = Object.assign({},config.resolve.alias,{ '@': path.resolve(__dirname, '/src') }) 
        config.plugins.push(new CreateTemplate())
    },
    pages: process.env.NODE_ENV === 'production'  ? prodPages : devPages
}