const markdownIt = require("markdown-it");

const md = markdownIt({ html: true, typographer: true, linkify: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Long form: 12 August 2026
  eleventyConfig.addFilter("displayDate", (value) =>
    new Date(value).toLocaleDateString("en-NZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  // Machine readable: 2026-08-12
  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  // Renders a markdown string from a data file (About page body, CMS fields).
  eleventyConfig.addFilter("markdown", (value) =>
    value ? md.render(String(value)) : ""
  );

  // Wraps the first percentage or dollar figure in <strong> so the hero
  // headline keeps its emphasis without the editor writing HTML.
  eleventyConfig.addFilter("highlightFigure", (value) => {
    if (!value) return "";
    const text = String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return text.replace(
      /(\$?\d[\d,.]*(?:\s*[–—-]\s*\d[\d,.]*)?\s*[%+]?[MBK]?\+?)/,
      "<strong>$1</strong>"
    );
  });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByTag("posts").reverse()
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
