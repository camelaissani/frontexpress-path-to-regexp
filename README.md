# frontexpress-path-to-regexp

[Frontexpress](https://github.com/camelaissani/frontexpress) plugin to support Express-style path string such as /user/:name.

[![Build Status](https://travis-ci.org/camelaissani/frontexpress-path-to-regexp.svg?branch=master)](https://travis-ci.org/camelaissani/frontexpress-path-to-regexp)
 [![Code Climate](https://codeclimate.com/github/camelaissani/frontexpress-path-to-regexp/badges/gpa.svg)](https://codeclimate.com/github/camelaissani/frontexpress-path-to-regexp)
 [![Coverage Status](https://coveralls.io/repos/github/camelaissani/frontexpress-path-to-regexp/badge.svg?branch=master)](https://coveralls.io/github/camelaissani/frontexpress-path-to-regexp?branch=master)
 ![Size Shield](https://img.shields.io/badge/size-1.82kb-brightgreen.svg)

 # Installation

 ```shell
 npm install frontexpress-path-to-regexp --save
 ```

 # Usage

```js
import frontexpress from 'frontexpress';
import pathToRegexp from 'frontexpress-path-to-regexp';

// Front-end application
const app = frontexpress();

app.use(pathToRegexp);

// now all express-style path are supported :)
app.get('/:foo*', (req, res) => {
    document.querySelector('.content').innerHTML = res.responseText;
});
```

> This plugin uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for matching the route paths; see the path-to-regexp documentation for all the possibilities in defining route paths. The same library used in Express.
