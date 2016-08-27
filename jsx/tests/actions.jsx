import {expect} from 'chai';

import * as actionCreators from '../actions/actionCreators.jsx';

describe("ActionCreators", function() {
  it("should be able to add a list", function() {

    var action = actionCreators.add_list({'name': 'new_list'});
    expect(action['type']).to.equal('ADD_LIST');
    expect(action['data']['name']).to.equal('new_list');

  });

  it("should be able to update a list", function() {

    var action = actionCreators.update_list(1, 'new name');
    expect(action['type']).to.equal('UPDATE_LIST');
    expect(action['list_index']).to.equal(1);
    expect(action['name']).to.equal('new name');
  });

  it("should be able to delete a list", function() {

    var action = actionCreators.delete_list(1);
    expect(action['type']).to.equal('DELETE_LIST');
    expect(action['list_index']).to.equal(1);
  });

  it("should be able to add an item", function() {

    var action = actionCreators.add_item(1, {'content': 'new item'});
    expect(action['type']).to.equal('ADD_ITEM');
    expect(action['list_index']).to.equal(1);
    expect(action['data']['content']).to.equal('new item');
  });

  it("should be able to update an item", function() {

    var action = actionCreators.update_item(1, 2, 'new name');
    expect(action['type']).to.equal('UPDATE_ITEM');
    expect(action['list_index']).to.equal(1);
    expect(action['item_index']).to.equal(2);
    expect(action['content']).to.equal('new name');
  });

  it("should be able to delete an item", function() {

    var action = actionCreators.delete_item(1, 2);
    expect(action['type']).to.equal('DELETE_ITEM');
    expect(action['list_index']).to.equal(1);
    expect(action['item_index']).to.equal(2);
  });

  it("should be able to (re-)load data", function() {

    var action = actionCreators.load_data([]);
    expect(action['type']).to.equal('LOAD_DATA');
    expect(action['data'].length).to.equal(0);
  });

});

