const pluginSEO = require('eleventy-plugin-seo');

module.exports = function (eleventyConfig) {
    return {
        dir: {
            input: '_src',
            includes: '_includes',
            output: '_site',
        },
    };
};
