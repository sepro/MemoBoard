var $ = require ('jquery');
import React from 'react';
import ReactDom from 'react-dom';


class Additem extends React.Component{
    constructor(props) {
       super(props);
       this.addItem = this.addItem.bind(this);
    }

    addItem() {
        var postdata = {content: ReactDom.findDOMNode(this.refs.itemname).value};

        console.log(name);

        $.ajax({
            type: 'POST',
            url: this.props.url,
            data: postdata,
            dataType: 'json',
            success: function(data) {
                this.props.onAdd();
                ReactDom.findDOMNode(this.refs.itemname).value = "";
            }.bind(this)
        });


    }

    render() {
      return (<div>
            <div className="input-group input-group-sm">
                <input className="form-control input-sm" type="text" name="itemname" ref="itemname" placeholder="Add item"/>
                <span className="input-group-btn">
                <button className="btn btn-success btn-sm" type="button" onClick={this.addItem.bind(this)}>Add</button>
                </span>
                </div>
            </div>);
    }
}

export default Additem;