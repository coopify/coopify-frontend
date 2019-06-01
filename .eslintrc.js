module.exports = {
    "env": {
        "browser": true
      },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "linebreak-style": 0,
        "react/no-access-state-in-setstate": false,
    },
    "globals": { "cloudinary" : true }
};