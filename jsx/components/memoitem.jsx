import React from 'react';
import ReactDom from 'react-dom';
import moment from'moment';

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {edit: false};
    }

    componentDidUpdate() {
        if ( this.state.edit ) {
            ReactDom.findDOMNode(this.refs.itemname).focus();
        }
    }

    handleItemClick = () => {
        this.setState({edit: true});
    }

    handleAcceptClick = () => {
        const item_index = this.props.item_index;
        const list_index = this.props.list_index;
        const uri = this.props.lists[list_index].items[item_index].uri;

        const content =  ReactDom.findDOMNode(this.refs.itemname).value;

        this.props.update_item_remote(list_index, item_index, content, uri);
        this.setState({edit: false});
    }

    handleCancelClick = () => {
        this.setState({edit: false});
    }

    handleKeyDown = (event) => {
         if(event.key == 'Enter'){
            this.handleAcceptClick();
         } else if(event.key == 'Escape') {
            this.handleCancelClick();
         }
    }

    handleDeleteClick = () => {
      const item_index = this.props.item_index;
      const list_index = this.props.list_index;
      const uri = this.props.lists[list_index].items[item_index].uri;

      this.props.delete_item_remote(list_index, item_index, uri);
    }

    render() {
        const item_index = this.props.item_index;
        const list_index = this.props.list_index;
        const uri = this.props.lists[list_index].items[item_index].uri;
        const date = this.props.lists[list_index].items[item_index].created ? moment(this.props.lists[list_index].items[item_index].created).format("DD-MM-YY HH:mm") : '';

        var content;

        if (this.state.edit) {
        content = <tr><td className="col-sm-12 col-xs-12" colSpan="3"><div className="input-group input-group-sm edititem">
                <input className="form-control input-sm" type="text" name="itemname" ref="itemname" onKeyDown={this.handleKeyDown} defaultValue={ this.props.lists[list_index].items[item_index].content }/>
                <span className="input-group-btn">
                <button className="btn btn-success btn-sm" type="button" onClick={this.handleAcceptClick}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button className="btn btn-default btn-sm" type="button" onClick={this.handleCancelClick}><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                </span>
                </div></td></tr>
        } else {

        content = <tr>
                    <td className="col-sm-6 col-xs-10 first" onClick={this.handleItemClick}>{ this.props.lists[list_index].items[item_index].content }</td>
                    <td className="col-sm-4 hidden-xs text-muted"><em className="item-date">{ date }</em></td>
                    <td className="col-sm-2 col-xs-2 text-muted last"><div className="pull-right"><span onClick={ this.handleDeleteClick } className="text-muted glyphicon glyphicon-remove"></ span></div></td>
                  </tr>
        }

        return ( content
        );
    }
}

export default Memoitem;
