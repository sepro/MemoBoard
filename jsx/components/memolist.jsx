import React from 'react';
import ReactDom from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Memoitem from './memoitem.jsx';
import Button from './button.jsx';
import Additem from './additem.jsx';

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {edit:false};
    }

    componentDidUpdate() {
        if ( this.state.edit ) {
            ReactDom.findDOMNode(this.refs.listname).focus();
        }
    }

    handleHeaderClick = () => {
        this.setState({edit: true});
    }

    handleAcceptClick = () => {
        this.setState({edit: false});
        this.props.update_list_remote(this.props.list_index, ReactDom.findDOMNode(this.refs.listname).value, this.props.lists[this.props.list_index].uri);
    }

    handleCancelClick = () => {
        this.setState({edit: false});
    }

    handleDeleteClick = () => {
      const list_index = this.props.list_index;
      const uri = this.props.lists[list_index].uri;
      this.props.delete_list_remote(list_index, uri);
    }

    handleKeyDown = (event) => {
         if(event.key == 'Enter'){
            this.handleAcceptClick();
         } else if(event.key == 'Escape') {
            this.handleCancelClick();
         }
    }

    render() {
      const list_index = this.props.list_index;
      const uri = this.props.lists[list_index].uri;

      var header;
      if ( this.state.edit ) {
        header = <div className="input-group input-group-sm">
                <input className="form-control input-sm" type="text" name="listname" ref="listname" onKeyDown={ this.handleKeyDown } defaultValue={ this.props.lists[this.props.list_index].name }/>
                <span className="input-group-btn">
                <button className="btn btn-success btn-sm" type="button" onClick={ this.handleAcceptClick }><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button className="btn btn-default btn-sm" type="button" onClick={ this.handleCancelClick }><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                </span>
                </div>;
      } else {
        header = <div>
                    <h4 className="panel-title  pull-left" onClick={ this.handleHeaderClick }>{ this.props.lists[this.props.list_index].name !== '' ? this.props.lists[this.props.list_index].name : 'Unnamed list' } </h4>
                    <div className="btn-group pull-right"><Button onClick={ this.handleDeleteClick } glyph="glyphicon glyphicon-remove" /></div>
                 </div>;

      }

      return (<div className="col-lg-4 col-sm-6 col-xs-12">
      <div className="panel panel-default">
      <div className="panel-heading clearfix">{ header }</div>

      <div className="table-responsive">
        <table className="table table-striped">
        <ReactCSSTransitionGroup component="tbody"  transitionName="example" transitionEnterTimeout={300} transitionLeave={false}>
         { this.props.lists[this.props.list_index].items.map((memoitemData,i ) => {
            return <Memoitem key={ memoitemData.id } item_index={ i } { ...this.props } />;
          })}

         </ReactCSSTransitionGroup>
         </table>
      </div>

      <div className="panel-body">
      <Additem uri={this.props.lists[this.props.list_index].items_uri} {...this.props} />
      </div>
      </div>
      </div>);
    }
}

export default Memolist;
