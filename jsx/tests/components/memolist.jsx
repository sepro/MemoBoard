import {expect} from 'chai';

import React from 'react';
import {Panel} from 'react-bootstrap';
import TestUtils from 'react-addons-test-utils';

import Memolist from '../../components/memolist.jsx';

function setup() {
    let props = {
        url: 'http://localhost:5000',
        uri: 'http://localhost:5000',
        list_index: 0,
        key: 0,
        lists: [{name: 'list', items:[{content: 'test item', id: 'item'}]}]
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Memolist {...props} />);
    let output = renderer.getRenderOutput();

    return {props, output, renderer}
}

describe('Memolist component', () => {
    it('should render correctly', () => {
        const { props, output } = setup();

        expect(output.type).to.equal(Panel);
    });

    it('should render markdown', () => {
        const { props, output } = setup();
        var test = new Memolist(props);

        expect(test.renderMarkdown("*test*").__html).to.equal('<p><em>test</em></p>\n');
    });
});