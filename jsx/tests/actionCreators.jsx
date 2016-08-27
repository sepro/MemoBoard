import chai from 'chai';

import * as actionCreators from '../actions/actionCreators.jsx';

describe("ActionCreators", function() {
  it("should be able to add a list", function() {

    var data = actionCreators.add_list({'name': 'new_list'});
    chai.expect(data['type']).to.equal('ADD_LIST');
    chai.expect(data['data']['name']).to.equal('new_list');

  });

  it("should be able to update a list", function() {

    var data = actionCreators.update_list(1, 'new name');
    chai.expect(data['type']).to.equal('UPDATE_LIST');
    chai.expect(data['list_index']).to.equal(1);
    chai.expect(data['name']).to.equal('new name');
  });

  it("should be able to delete a list", function() {

    var data = actionCreators.delete_list(1);
    chai.expect(data['type']).to.equal('DELETE_LIST');
    chai.expect(data['list_index']).to.equal(1);
  });

  it("should be able to add an item", function() {

    var data = actionCreators.add_item(1, {'content': 'new item'});
    chai.expect(data['type']).to.equal('ADD_ITEM');
    chai.expect(data['list_index']).to.equal(1);
    chai.expect(data['data']['content']).to.equal('new item');
  });

});

