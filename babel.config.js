module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [ 
    ["prismjs", {
      "languages": ["javascript", "css", "markup", "java", "html"],
      "plugins": ["line-numbers", "highlight-keywords"],
      "theme": "default",
      "css": true
    }]
  ],
}
