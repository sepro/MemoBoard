import React from 'react';
import ReactDom from 'react-dom';


class Additem extends React.Component{
    addItem(ev) {
        ev.preventDefault();

        const content = ReactDom.findDOMNode(this.refs.itemname).value;
        const list_index = this.props.list_index;
        const uri = this.props.lists[list_index].items_uri;

        this.props.add_item_remote(list_index, content, uri);
        ReactDom.findDOMNode(this.refs.itemname).value = '';
    }

    render() {
      return (
            <form onSubmit={ this.addItem.bind(this) }>
                <div className="input-group input-group-sm">
                    <input className="form-control input-sm" type="text" name="itemname" ref="itemname" placeholder="Add item"/>
                    <span className="input-group-btn">
                        <input className="btn btn-success btn-sm" type="submit" value="Add" />
                    </span>
                </div>
            </form>
            );
    }
}

export default Additem;
