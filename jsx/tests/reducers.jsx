import chai from 'chai';

import * as actionCreators from '../actions/actionCreators.jsx';
import lists from '../reducers/lists.jsx';

describe("Lists Reducer", function() {

  it("should be able to add a list", function() {
    var defaultState = [];
    var actionAddList = actionCreators.add_list({'name' : 'new list'});

    var newState = lists(defaultState, actionAddList);

    chai.expect(newState.length).to.equal(1);
  });

  it("should be able to update a list", function() {
    var defaultState = [{'name' : 'new list'}];
    var actionUpdateList = actionCreators.update_list(0, 'updated list');

    var newState = lists(defaultState, actionUpdateList);

    chai.expect(newState.length).to.equal(1);
    chai.expect(newState[0]['name']).to.equal('updated list');
  });

  it("should be able to delete a list", function() {
    var defaultState = [{'name' : 'new list'}];
    var actionDeleteList = actionCreators.delete_list(0);

    var newState = lists(defaultState, actionDeleteList);

    chai.expect(newState.length).to.equal(0);
  });

  it("should be able to add an item", function() {
    var defaultState = [{'name' : 'new list', 'items': []}];
    var actionAddItem = actionCreators.add_item(0, {'content': 'new item'});

    var newState = lists(defaultState, actionAddItem);

    chai.expect(newState[0]['items'].length).to.equal(1);
  });

  it("should be able to update an item", function() {
    var defaultState = [{'name' : 'new list', 'items': [{'content': 'new item'}]}];
    var actionUpdateItem = actionCreators.update_item(0, 0, 'updated content');

    var newState = lists(defaultState, actionUpdateItem);

    chai.expect(newState[0]['items'].length).to.equal(1);
    chai.expect(newState[0]['items'][0]['content']).to.equal('updated content');
  });

  it("should be able to delete an item", function() {
    var defaultState = [{'name' : 'new list', 'items': [{'content': 'new item'}]}];
    var actionDeleteItem = actionCreators.delete_item(0, 0);

    var newState = lists(defaultState, actionDeleteItem);

    chai.expect(newState[0]['items'].length).to.equal(0);
  });

  it("should be able to (re-)load data", function() {
    var defaultState = [{'name' : 'new list', 'items': [{'content': 'new item'}]}];
    var actionLoad = actionCreators.load_data([]);

    var newState = lists(defaultState, actionLoad);

    chai.expect(newState.length).to.equal(0);
  });

});