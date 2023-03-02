const { DateTime } = require('luxon');

/* eleventy-plugin-syntaxhighlight plugin */
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

/* RSS plugin */
const pluginRss = require('@11ty/eleventy-plugin-rss');

/* markdown-it */
const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  /* Add eleventy-plugin-syntaxhighlight plugin */
  eleventyConfig.addPlugin(syntaxHighlight);

  /* Add RSS plugin */
  eleventyConfig.addPlugin(pluginRss);

  /* Set up excerpt */
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
  });

  /* Allow passthrough of CSS folder */
  eleventyConfig.addPassthroughCopy('_src/css');

  /* Allow passthrough of img folder */
  eleventyConfig.addPassthroughCopy('_src/img');

  /* Add filter for markdown-it; ensures excerpts are processed through markdown */
  eleventyConfig.addFilter('md', function (content = '') {
    return markdownIt({ html: true }).render(content);
  });

  /* Add filter for readable date */
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  /* Add filter for HTML date string */
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  /* Add filter for permalink date string */
  eleventyConfig.addFilter('pathDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy/LL/dd');
  });

  /* Add filter for first `n` elements of a collection */
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  /* Filter certain tags from the tag list on a post */
  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    );
  }

  /* Add filter for filterTagList */
  eleventyConfig.addFilter('filterTagList', filterTagList);

  /* Collection of all tags */
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return filterTagList([...tagSet]).sort();
  });

  return {
    dir: {
      input: '_src',
      includes: '_includes',
      output: '_site',
    },
  };
};
