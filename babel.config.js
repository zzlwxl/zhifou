module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [ 
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "java", "html","bash","c","python","sql"],
      "plugins": ["line-numbers", "highlight-keywords"],
      "theme": "default",
      "css": true
    }]
  ],
}
