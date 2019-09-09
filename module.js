/**
 * A simple module loader as anolog of Node.js Module
 * 关键点：模块机制、module.exports和exports的区别等
 * */
function loadModule(filename, module, require) {
    const wrappedSrc=`(function(module, exports, require) {
         ${fs.readFileSync(filename, 'utf8')}
       })(module, module.exports, require);`;
    eval(wrappedSrc);
}

const require = (moduleName) => {
    console.log(`Require invoked for module: ${moduleName}`);
    const id = require.resolve(moduleName);
    if(require.cache[id]) {
        return require.cache[id].exports;
    }
    //module metadata
    const module = {
        exports: {},
        id: id
    };
    //Update the cache
    require.cache[id] = module;
    //load the module
    loadModule(id, module, require);
    //return exported variables
    return module.exports;
};

require.cache = {};

/**
 * 其中，resolve算法大致如下：
 * File modules: If moduleName starts with / , it is already considered an absolute path to the module and it's returned as it is. If it starts with ./, then moduleName is considered a relative path, which is calculated starting from the requiring module.
 * Core modules: If moduleName is not prefixed with / or ./, the algorithm will first try to search within the core Node.js modules.
 * Package modules: If no core module is found matching moduleName, then the search continues by looking for a matching module in the first node_modules
 *    directory that is found navigating up in the directory structure starting from the requiring module. The algorithm continues to search for a match by looking into the next node_modules directory up in the directory tree, until it reaches the root of the filesystem.
 * 完整算法如下：https://nodejs.org/api/modules.html#modules_all_together
 * 匹配到的模块为如下：
 *  1、<moduleName>.js
 *  2、<moduleName>/index.js
 *  3、The directory/file specified in the main property of <moduleName>/package.json
 * */
require.resolve = (moduleName) => {
    /* resolve a full module id from the moduleName */
};

