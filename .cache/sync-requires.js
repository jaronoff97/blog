const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-not-found-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/not-found-template.js"))),
  "component---src-templates-tags-list-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/tags-list-template.js"))),
  "component---src-templates-categories-list-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/categories-list-template.js"))),
  "component---src-templates-page-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/page-template.js"))),
  "component---src-templates-post-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/post-template.js"))),
  "component---src-templates-tag-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/tag-template.js"))),
  "component---src-templates-category-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/category-template.js"))),
  "component---src-templates-index-template-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/src/templates/index-template.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/jaronoff/Github/blog/.cache/dev-404-page.js")))
}

