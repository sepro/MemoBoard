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
            }.bind(this)
        });


    }

    render() {
      return (<div>
                <input type="text" name="itemname" ref="itemname" />
                <input type="button" onClick={this.addItem.bind(this)} value="add" /></div>);
    }
}

export default Additem;