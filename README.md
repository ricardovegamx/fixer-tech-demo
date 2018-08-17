# MEXICAN PESO HISTORICAL FX RATES

This technical demo app consumes Fixer.io API and display the Mexican Peso (MXN) against World's Top Currencies in any given date.

## Caveats

1. The Fixer.io API has limited endpoints for the FREE Plan. The base currency is EUR and it cannot be changed unless you upgrade to a paid plan. Basically, you can only request historic information in any given date (starting in 1999).

2. For this reason, I had to create a function to convert the EUR base currency into a MXN to be able to display the data as the exam requested.

3. The exam required to build one single JS file so I had to alter the default Vue Cli build system using `vue.config.js` to disable splitting between **source** and **vendor** code.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

Once you run this command, it will be accessible from: 

`http://localhost:8080/`

### Compiles and minifies for production
```
npm run build
```

The build system is Webpack based.

## Tech Stack

1. [VueJS Framework 2.5](https://vuejs.org/)
2. [Vue-Cli 3](https://cli.vuejs.org/)
2. [Tailwind CSS](https://tailwindcss.com/)

## Directory Structure

### Folders

**dist/** contains public files ready for production.

**node_modules/** all dependencies defined in `package.json` file. It will be created as soon as `npm install` is ran.

**public/** all files that don't go through Webpack. For example, `index.html` it's been used as template to inject the main App.vue component.

**src/** contains the actual code that will be built through build process.

### Files

**.eslintrc** contains linter rules that favor best practices for Vue development.

**.gitignore** contains entries about files and folders that must not be version controled.

**babel.config.js** is the file to configure behavior of Babel compiler.

**package-lock.json** contains all dependencies and the specific version that must be installed for each one of them. 

**package.json** contains all dependencies and scripts to be able to run and build the app.

**tailwind.js** is the Tailwind CSS configuration file. You can tweak fonts, colors, add new styles and all available options in the library.

**vue.config.js** optional file to modify the default behavior of the vue cli service. More information [can be found in the official docs](https://cli.vuejs.org/config/#global-cli-config).

## Notes

Used localStorage in order to minimize API requests. All successful responses are saved and displayed right away if they are requested again.