const data = require('./data.json');

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    });
    return cfg;
  },
  exportPathMap: async () => {
    const projects = data.projects.reduce(
      (files, { name }) => Object.assign({}, files, {
          [`/${name}`]: {
            page: '/[project]',
            query: { file: name },
          },
        }),
      {},
    );

    const exportPages = {
      '/': { page: '/' },
      ...projects,
    };

    return exportPages;
  },
};
