const { DateTime } = require('luxon');

const hljs = require('@11ty/eleventy-plugin-syntaxhighlight');
const rss = require('@11ty/eleventy-plugin-rss');
const seo = require('eleventy-plugin-seo');

const filters = require('./_src/_11ty/filters.js');

module.exports = function (eleventyConfig) {
  // third-party plugins
  eleventyConfig.addPlugin(hljs);
  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPlugin(seo, require('./_src/_data/seo.json'));

  // passthrough file copy
  eleventyConfig.addPassthroughCopy('_src/css');
  eleventyConfig.addPassthroughCopy('_src/img');

  // filters
  Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });

  // config
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  /* Collection of all tags */
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return filterTagList([...tagSet]).sort();
  });

  // settings
  return {
    dir: {
      input: '_src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
