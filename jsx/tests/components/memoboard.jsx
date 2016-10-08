import {expect} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Memoboard from '../../components/memoboard.jsx';

function setup() {
    let props = {
        url: 'http://localhost:5000',
        uri: 'http://localhost:5000',
        list_index: 0,
        key: 0,
        lists: [{name: 'list', id: 'list', items:[{content: 'test item', id: 'item'}]}]
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Memoboard {...props} />);
    let output = renderer.getRenderOutput();

    return {props, output, renderer}
}

describe('Memoboard component', () => {
    it('should render correctly', () => {
        const { props, output } = setup();

        expect(output.type).to.equal('div');
    });

});