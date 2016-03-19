var $ = require ('jquery');
import React from 'react';
import ReactDom from 'react-dom';

var moment = require('moment');

import Button from './button.jsx'

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: {content: '', created:''}, edit: false};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data)  => {
            this.setState({data: data});
          },
          error: (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    componentDidUpdate() {
        if ( this.state.edit ) {
            ReactDom.findDOMNode(this.refs.itemname).focus();
        }
    }

    handleItemClick() {
        console.log("Clicked header");
        this.setState({edit: true});
    }

    handleAcceptClick() {
        console.log("Clicked Accept");
        var putdata = {content: ReactDom.findDOMNode(this.refs.itemname).value};

        $.ajax({
            type: 'PUT',
            url: this.state.data.uri,
            data: putdata,
            dataType: 'json',
            success: function() {
                this.loadFromServer();
            }.bind(this)
        });
        this.setState({edit: false});
    }

    handleCancelClick() {
        console.log("Clicked Cancel");
        this.setState({edit: false});
    }

    handleKeyDown(event) {
         if(event.key == 'Enter'){
            this.handleAcceptClick();
         } else if(event.key == 'Escape') {
            this.handleCancelClick();
         }
    }

    render() {
      var date = this.state.data.created ? moment(this.state.data.created).format("DD-MM-YY HH:mm") : '';

      var content;

      if (this.state.edit) {
        content = <tr><td><div><div className="input-group input-group-sm">
                <input className="form-control input-sm" type="text" name="itemname" ref="itemname" onKeyDown={this.handleKeyDown.bind(this)} defaultValue={ this.state.data.content }/>
                <span className="input-group-btn">
                <button className="btn btn-success btn-sm" type="button" onClick={this.handleAcceptClick.bind(this)}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button className="btn btn-default btn-sm" type="button" onClick={this.handleCancelClick.bind(this)}><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                </span>
                </div></div></td></tr>
      } else {
        content = <tr>
                    <td className="col-sm-6 col-xs-10 first" onClick={this.handleItemClick.bind(this)}>{ this.state.data.content }</td>
                    <td className="col-sm-4 hidden-xs text-muted"><em className="item-date">{ date }</em></td>
                    <td className="col-sm-2 col-xs-2 text-muted last"><div className="pull-right"><Button onClick={this.props.handleDelete} glyph="glyphicon glyphicon-remove" /></div></td>
                  </tr>
      }

      return ( content
        );
    }
}

export default Memoitem;