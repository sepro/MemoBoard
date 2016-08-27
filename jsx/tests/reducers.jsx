import {expect} from 'chai';

import lists from '../reducers/lists.jsx';

describe("Lists Reducer", function() {

  it("should handle ADD_LIST", function() {
    var defaultState = [];
    var actionAddList = {
      type: 'ADD_LIST',
      data: {'name' : 'new list'}
    };

    var newState = lists(defaultState, actionAddList);

    expect(newState.length).to.equal(1);
  });

  it("should handle UPDATE_LIST", function() {
    var defaultState = [{'name' : 'new list'}];
    var actionUpdateList = {
      type: 'UPDATE_LIST',
      list_index: 0,
      name: 'updated list'
    };

    var newState = lists(defaultState, actionUpdateList);

    expect(newState.length).to.equal(1);
    expect(newState[0]['name']).to.equal('updated list');
  });

  it("should handle DELETE_LIST", function() {
    var defaultState = [{'name' : 'new list'}];
    var actionDeleteList = {
      type: 'DELETE_LIST',
      list_index: 0
    };

    var newState = lists(defaultState, actionDeleteList);

    expect(newState.length).to.equal(0);
  });

  it("should handle ADD_ITEM", function() {
    var defaultState = [{'name' : 'new list', 'items': []}];
    var actionAddItem = {
      type: 'ADD_ITEM',
      list_index: 0,
      data: {'content': 'new item'}
    };

    var newState = lists(defaultState, actionAddItem);

    expect(newState[0]['items'].length).to.equal(1);
  });

  it("should handle UPDATE_ITEM", function() {
    var defaultState = [{'name' : 'new list', 'items': [{'content': 'new item'}]}];
    var actionUpdateItem = {
      type: 'UPDATE_ITEM',
      list_index: 0,
      item_index: 0,
      content: 'updated content'
    };

    var newState = lists(defaultState, actionUpdateItem);

    expect(newState[0]['items'].length).to.equal(1);
    expect(newState[0]['items'][0]['content']).to.equal('updated content');
  });

  it("should handle DELETE_ITEM", function() {
    var defaultState = [{'name' : 'new list', 'items': [{'content': 'new item'}]}];
    var actionDeleteItem = {
      type: 'DELETE_ITEM',
      list_index: 0,
      item_index: 0
    };

    var newState = lists(defaultState, actionDeleteItem);

    expect(newState[0]['items'].length).to.equal(0);
  });

  it("should handle LOAD_DATA", function() {
    var defaultState = [{'name' : 'new list', 'items': [{'content': 'new item'}]}];
    var actionLoad = {
      type: 'LOAD_DATA',
      data: []}

    var newState = lists(defaultState, actionLoad);

    expect(newState.length).to.equal(0);
  });

});