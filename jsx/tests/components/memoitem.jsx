import {expect} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Memoitem from '../../components/memoitem.jsx';

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
    renderer.render(<Memoitem {...props} />);
    let output = renderer.getRenderOutput();

    return {props, output, renderer}
}

describe('Memoitem component', () => {
    it('should render correctly', () => {
        const { props, output } = setup();

        expect(output.type).to.equal('tr');
    });
});