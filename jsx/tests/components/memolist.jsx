import {expect} from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Memolist from '../../components/memolist.jsx';

function setup() {
    let props = {
        url: 'http://localhost:5000',
        uri: 'http://localhost:5000',
        list_index: 0,
        item_index: 0,
        content: 'test item',
        lists: [{name: 'list', items:[{content: 'test item'}]}]
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Memolist {...props} />);
    let output = renderer.getRenderOutput();

    return {props, output, renderer}
}

describe('Memolist component', () => {

    it('should render correctly', () => {
        const { props, output } = setup();

        expect(output.type).to.equal('tr');
    });

    it('should render markdown', () => {
        var test = new Memolist();

        expect(test.renderMarkdown("*test*").__html).to.equal('<p><em>test</em></p>\n');
    });
});