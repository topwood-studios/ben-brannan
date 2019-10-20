const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  webpack: cfg => {
    cfg.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader"
    });
    return cfg;
  }
});
