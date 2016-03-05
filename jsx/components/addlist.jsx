var $ = require ('jquery');
import React from 'react';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
    }

    addList() {

    }

    render() {
      return (<div>Add List:
                <input type="text" name="listname" ref="listname" />
                <input type="button" onClick={this.addList} value="add" /></div>);
    }
}

export default Addlist;