const pluginSEO = require('eleventy-plugin-seo');

module.exports = function (eleventyConfig) {
    /* Allow passthrough of CSS */
    eleventyConfig.addPassthroughCopy('_src/css');

    return {
        dir: {
            input: '_src',
            includes: '_includes',
            output: '_site',
        },
    };
};
