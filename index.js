import pathToRegexp from 'path-to-regexp';

export default {
    name: 'frontexpress-path-to-regexp',
    plugin(application) {
        const decodeParmeterValue = (encodedValue) => {
            const v = decodeURI(encodedValue);
            return !isNaN(parseFloat(v)) && isFinite(v) ? (Number.isInteger(v) ? Number.parseInt(v, 10) : Number.parseFloat(v)) : v;
        };

        // change the route matcher setting of application
        application.set('route matcher', (request, route) => {

            // check if http method are equals
            if (route.method && route.method !== request.method) {
                return false;
            }

            // route and uri not defined always match
            if (!route.uri || !request.uri) {
                return true;
            }

            //remove query string and anchor from uri to test
            const match = /^(.*)\?.*#.*|(.*)(?=\?|#)|(.*[^\?#])$/.exec(request.uri);
            const baseUriToCheck = match[1] || match[2] || match[3];

            // route path to regexp;
            const keys = [];
            const re = pathToRegexp(route.uri, keys);

            // check request path against route regexp
            const routeMatch = baseUriToCheck.match(re);
            if (!routeMatch) {
                return false;
            }

            // update params in request with keys
            request.params = Object.assign(request.params, keys.reduce((acc, key, index) => {
                let value = routeMatch[index + 1];
                if (value) {
                    value = value.indexOf(',') !== -1 ? value.split(',').map(v => decodeParmeterValue(v)) : value = decodeParmeterValue(value);
                }
                acc[key.name] = value;
                return acc;
            }, {}));

            return true;
        });
    }
};