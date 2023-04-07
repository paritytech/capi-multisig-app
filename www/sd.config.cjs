const StyleDictionaryModule = require('style-dictionary')
const { makeSdTailwindConfig } = require('sd-tailwindcss-transformer')
const StyleDictionaryPackage = require("style-dictionary");
const { registerTransforms } = require("@tokens-studio/sd-transforms");
const StyleDictionary = require("style-dictionary");

// generate tailwind config
const sdConfig = makeSdTailwindConfig({
  type: 'all',
  isVariables: true,
  source: [`src/theme/figma/dark.json`, `src/theme/figma/light.json`, `src/theme/figma/global.json`],
  transforms: ['attribute/cti', 'name/cti/kebab'],
  buildPath: `src/theme/`,
  tailwind: {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    plugins: ['forms', 'line-clamp']
  }
})

// to-do:
// add plugin: 'prettier-plugin-tailwindcss',


// set formats and transforms for style dictionary
const StyleDictionaryWithTailwind = StyleDictionaryModule.extend(sdConfig)
StyleDictionaryWithTailwind.buildAllPlatforms()

registerTransforms(StyleDictionary);

StyleDictionaryPackage.registerFormat({
  name: "css/variables",
  formatter: function (dictionary) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join("\n")}\n}`;
  },
});

StyleDictionaryPackage.registerFormat({
  name: "tailwind/colors",
  formatter: function (dictionary) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `"${prop.name}": "${prop.value}",`)
      .join("\n")}\n}`;
  },
});

StyleDictionaryPackage.registerFormat({
  name: "tailwind/fontFamily",
  formatter: function (dictionary) {
    return `${this.selector} {\n${dictionary.allProperties
      .map(
        (prop) =>
          `"${prop.name.substring(0, prop.name.indexOf("-font-family"))}": "${
            prop.value
          }",`
      )
      .join("\n")}\n}`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: "size/px",
  type: "value",
  transitive: true,

  matcher: (token) => ["fontWeights"].includes(token.type),
  transformer: (token) => (token.value === "Regular" ? 400 : 700),

  matcher: (token) =>
    ["fontSizes", "dimension", "borderRadius", "spacing"].includes(token.type),
  transformer: (token) => parseFloat(token.value) + "px",
});

// generate css for each token set
["light", "dark", "semantic", "global"].map((theme) => {
  const themeVariables = StyleDictionary.extend({
    source: [`src/theme/figma/${theme}.json`],
    include: [`src/theme/figma/global.json`],
    platforms: {
      web: {
        transformGroup: "tokens-studio",
        transforms: [
          'ts/descriptionToComment',
          'ts/size/px',
          'ts/size/css/letterspacing',
          'ts/size/lineheight',
          'ts/type/fontWeight',
          'ts/resolveMath',
          'ts/typography/css/shorthand',
          'ts/border/css/shorthand',
          'ts/shadow/css/shorthand',
          'ts/color/css/hexrgba',
          'ts/color/modifiers',
          'name/cti/kebab',
        ],
        buildPath: "src/theme/",
        files: [
          {
            destination: `${theme}.css`,
            format: "css/variables",
            selector:
              theme === "dark" ? `:root[data-theme="${theme}"]` : `:root`,
            filter: ({ isSource }) => {
              return isSource;
            },
          },
          // {
          //   destination: `${theme}.js`,
          //   format: "tailwind/colors",
          //   selector: "module.exports = ",
          //   filter: ({ isSource }) => {
          //     return isSource;
          //   },
          // },
          // {
          //   destination: `${theme}.js`,
          //   format: "tailwind/fontFamily",
          //   selector: "module.exports = ",
          //   filter: (token) => {
          //     return token.type === "fontFamilies";
          //   },
          // },
        ],
      },
    },
  });
  themeVariables.cleanAllPlatforms();
  themeVariables.buildAllPlatforms();
});
