import {expect} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Addlist from '../../components/addlist.jsx';

function setup() {
    let props = {
        url: 'http://localhost:5000'
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Addlist {...props} />);
    let output = renderer.getRenderOutput();

    return {props, output, renderer}
}

describe('Addlist component', () => {
    it('should render correctly', () => {
        const { props, output } = setup();

        expect(output.type).to.equal('form');
    });
});