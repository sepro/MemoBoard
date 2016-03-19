var $ = require ('jquery');
import React from 'react';
import ReactDom from 'react-dom';

import Memoitem from './memoitem.jsx'
import Button from './button.jsx'
import Additem from './additem.jsx'

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: {items: []}, edit:false};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data) => {
            this.setState({data: data});
          },
          error: (xhr, status, err)  => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    componentDidUpdate() {
        if ( this.state.edit ) {
            ReactDom.findDOMNode(this.refs.listname).focus();
        }
    }

    deleteItem(url) {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function() {
                this.loadFromServer();
            }.bind(this)
        });
    }

    handleHeaderClick() {
        console.log("Clicked header");
        this.setState({edit: true});
    }

    handleAcceptClick() {
        console.log("Clicked Accept");
        var putdata = {name: ReactDom.findDOMNode(this.refs.listname).value};

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
      var header;
      if ( this.state.edit ) {
        header = <div className="input-group input-group-sm">
                <input className="form-control input-sm" type="text" name="listname" ref="listname" onKeyDown={this.handleKeyDown.bind(this)} defaultValue={ this.state.data.name }/>
                <span className="input-group-btn">
                <button className="btn btn-success btn-sm" type="button" onClick={this.handleAcceptClick.bind(this)}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button className="btn btn-default btn-sm" type="button" onClick={this.handleCancelClick.bind(this)}><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                </span>
                </div>;
      } else {
        header = <div>
                    <h4 className="panel-title  pull-left" onClick={this.handleHeaderClick.bind(this)}>{ this.state.data.name != '' ? this.state.data.name : 'Unnamed list' } </h4>
                    <div className="btn-group pull-right"><Button onClick={this.props.handleDelete} glyph="glyphicon glyphicon-remove" /></div>
                 </div>;

      }

      return (<div className="col-lg-4 col-sm-6 col-xs-12">
      <div className="panel panel-default">
      <div className="panel-heading clearfix">{header}</div>

      <div className="table-responsive">
        <table className="table table-striped">
        <tbody>
         {this.state.data.items.map(function(memoitemData){
            return <Memoitem key={memoitemData.id} url={memoitemData.uri} handleDelete={this.deleteItem.bind(this, memoitemData.uri)} />;
          }.bind(this))}
         </tbody>
         </table>
         </div>
      <div className="panel-body">
      <Additem url={this.state.data.items_uri} onAdd={this.loadFromServer.bind(this)}/>
      </div>
      </div>
      </div>);
    }
}

export default Memolist;