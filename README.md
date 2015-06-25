"Cars" is a short project to practice abstracting models, manipulating datasets, and visualizing the data for end users.



This gulp configuration uses: 

- Browserify to bundle your source
  - Includes jQuery, underscore, backbone, and parsley
  - `init.js` is currently the entry-point for your app
- SCSS to manage CSS dependencies and such
- Any `.html` files found in the `views` folder will be bundled
  - Available via `require('views')`