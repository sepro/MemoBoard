var $ = require ('jquery');
import React from 'react';
import ReactDom from 'react-dom';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
       this.addList = this.addList.bind(this);
    }

    addList() {
        var postdata = {name: ReactDom.findDOMNode(this.refs.listname).value};

        $.ajax({
            type: 'POST',
            url: this.props.url,
            data: postdata,
            dataType: 'json',
            success: function(data) {
                this.props.onAdd();
            }.bind(this)
        });


    }

    render() {
      return (<form className="form-inline pull-right addlist">
                <input type="text" name="listname" ref="listname" placeholder="Add list"/>
                <input type="button" onClick={this.addList} value="add" />
                </form>);
    }
}

export default Addlist;