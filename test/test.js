/*eslint-env mocha*/
import {assert} from 'chai';
import sinon from 'sinon';
import pluginObj from '../index';

describe('Plugin structure', () => {
    it('check plugin name', () => {
        assert.strictEqual(pluginObj.name, 'frontexpress-path-to-regexp');
    });

    it('check application setting \'route matcher\' is updated', () => {
        let routeMatcher;
        const application = {
            set(id, fn) {routeMatcher = fn;}
        };

        pluginObj.plugin(application);
        assert(routeMatcher);
        assert(typeof routeMatcher === 'function');
    });
});

describe('Routes', () => {
    let routeMatcher;

    beforeEach(() => {
        const application = {
            set(id, fn) {routeMatcher = fn;}
        };

        pluginObj.plugin(application);
    });

    it('all routes match', () => {
        const route = {uri: undefined, method: undefined};

        let request = {uri: '/page/1', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {});

        request = {uri: '/', method: 'POST', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {});
    });

    it('/', () => {
        const route = {uri: '/', method: 'GET'};

        let request = {uri: '/page/1', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), false);
        assert.deepEqual(request.params, {});

        request = {uri: '/', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {});

        request = {uri: '/', method: 'POST', params:{}};
        assert.strictEqual(routeMatcher(request, route), false);
        assert.deepEqual(request.params, {});
    });

    it('/^api/', () => {
        const route = {uri: /^\/api/, method: 'GET'};

        let request = {uri: '/apes/1', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), false);
        assert.deepEqual(request.params, {});

        request = {uri: '/api', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {});

        request = {uri: '/api/a', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {});
    });

    it('/page/:id', () => {
        const route = {uri: '/page/:id', method: 'GET'};

        let request = {uri: '/page/1', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {id: 1});

        request = {uri: '/page/1,2,3', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {id: [1,2,3]});

        request = {uri: '/page/1.5,2.5,3.5', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {id: [1.5,2.5,3.5]});

        request = {uri: '/page/my%20test%20st%C3%A5le%20car%20saab', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {id: 'my test ståle car saab'});
    });

    it('/:foo*', () => {
        const route = {uri: '/:foo*', method: 'GET'};

        let request = {uri: '/bar/baz', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {foo: 'bar/baz'});
    });

    it('/:foo/(.*)', () => {
        const route = {uri: '/:foo/(.*)', method: 'GET'};

        let request = {uri: '/test/route', method: 'GET', params:{}};
        assert.strictEqual(routeMatcher(request, route), true);
        assert.deepEqual(request.params, {foo: 'test', '0': 'route'});
    });
});