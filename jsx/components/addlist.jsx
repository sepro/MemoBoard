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
                ReactDom.findDOMNode(this.refs.listname).value = "";
            }.bind(this)
        });


    }

    render() {
      return (<div className="input-group input-group-sm addlist">
                <input className="form-control input-sm" type="text" name="listname" ref="listname" placeholder="Add list"/>
                <span className="input-group-btn">
                <button className="btn btn-primary btn-sm" type="button" onClick={this.addList}>Add</button>
                </span>
              </div>);
    }
}

export default Addlist;