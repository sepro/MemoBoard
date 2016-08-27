import chai from 'chai';

import * as actionCreators from '../actions/actionCreators.jsx';

describe("ActionCreators", function() {
  it("should be able to add a list", function() {

    var action = actionCreators.add_list({'name': 'new_list'});
    chai.expect(action['type']).to.equal('ADD_LIST');
    chai.expect(action['data']['name']).to.equal('new_list');

  });

  it("should be able to update a list", function() {

    var action = actionCreators.update_list(1, 'new name');
    chai.expect(action['type']).to.equal('UPDATE_LIST');
    chai.expect(action['list_index']).to.equal(1);
    chai.expect(action['name']).to.equal('new name');
  });

  it("should be able to delete a list", function() {

    var action = actionCreators.delete_list(1);
    chai.expect(action['type']).to.equal('DELETE_LIST');
    chai.expect(action['list_index']).to.equal(1);
  });

  it("should be able to add an item", function() {

    var action = actionCreators.add_item(1, {'content': 'new item'});
    chai.expect(action['type']).to.equal('ADD_ITEM');
    chai.expect(action['list_index']).to.equal(1);
    chai.expect(action['data']['content']).to.equal('new item');
  });

  it("should be able to update an item", function() {

    var action = actionCreators.update_item(1, 2, 'new name');
    chai.expect(action['type']).to.equal('UPDATE_ITEM');
    chai.expect(action['list_index']).to.equal(1);
    chai.expect(action['item_index']).to.equal(2);
    chai.expect(action['content']).to.equal('new name');
  });

  it("should be able to delete an item", function() {

    var action = actionCreators.delete_item(1, 2);
    chai.expect(action['type']).to.equal('DELETE_ITEM');
    chai.expect(action['list_index']).to.equal(1);
    chai.expect(action['item_index']).to.equal(2);
  });

  it("should be able to (re-)load data", function() {

    var action = actionCreators.load_data([]);
    chai.expect(action['type']).to.equal('LOAD_DATA');
    chai.expect(action['data'].length).to.equal(0);
  });

});

