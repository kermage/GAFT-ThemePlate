# GAFT-ThemePlate
> Automate WordPress theme development with Grunt.

> *Using Automattic's Underscores (_s) as starter theme and Zurb's Foundation as framework.*

## Requirements

- [Node.js](http://nodejs.org): Install from the NodeJS website.
- [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
- [Bower](http://bower.io): Run `[sudo] npm install -g bower`


*Verify installation:*
```bash
> node --version && npm --version
> bower --version && grunt --version
```


## Quickstart

- Keep it simple, head over to http://underscores.me and generate your _s based theme.
- Extract the generated theme into your Wordpress development themes directory.
- Navigate to your theme folder and clone the repository manually or using:
```bash
> git clone https://github.com/kermage/GAFT-ThemePlate.git tmp
> mv tmp/* && rm -rf tmp
```
- Edit *'name'* and *'version'* fields in the **package.json** file with your theme details.
- Finally, run `npm install` to setup everything.
*It will automatically install the necessary dependencies and front-end packages. Also initialize basic configurations (copy files, update paths, and insert imports).


## Usage (available commands)
- While working on project:
`grunt test` - Run predefined tasks *'grunt build'* whenever file changes are made. *(Browser autoreload using LiveReload)*
- For building assets:
`grunt build` - Sass compiled *(expanded)*, JS concatenated, and images optimized.
- For building minified assets:
`grunt dist` - Sass compiled *(compressed)*, JS minified, and images optimized.
- For deployment:
`grunt deploy` - Copy and compress actual theme files to **release** folder.
