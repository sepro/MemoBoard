import {expect} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Additem from '../../components/additem.jsx';

function setup() {
    let props = {
        lists: [{uri: 'http://localhost:5000'}],
        list_index: 0
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Additem {...props} />);
    let output = renderer.getRenderOutput();

    return {props, output, renderer}
}

describe('Additem component', () => {
    it('should render correctly', () => {
        const { props, output } = setup();

        expect(output.type).to.equal('form');
    });
});