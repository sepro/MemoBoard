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

  it("should be able to update an item", function() {

    var data = actionCreators.update_item(1, 2, 'new name');
    chai.expect(data['type']).to.equal('UPDATE_ITEM');
    chai.expect(data['list_index']).to.equal(1);
    chai.expect(data['item_index']).to.equal(2);
    chai.expect(data['content']).to.equal('new name');
  });

  it("should be able to delete an item", function() {

    var data = actionCreators.delete_item(1, 2);
    chai.expect(data['type']).to.equal('DELETE_ITEM');
    chai.expect(data['list_index']).to.equal(1);
    chai.expect(data['item_index']).to.equal(2);
  });

  it("should be able to (re-)load dataa", function() {

    var data = actionCreators.load_data([]);
    chai.expect(data['type']).to.equal('LOAD_DATA');
    chai.expect(data['data'].length).to.equal(0);
  });

});

