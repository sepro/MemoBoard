import React from 'react';
import ReactDom from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Row, Col, Panel, Table} from 'react-bootstrap';

import jsPDF from '../external/jspdf.debug';

import Memoitem from './memoitem.jsx';
import Additem from './additem.jsx';

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {edit:false, options:false};
    }

    componentDidUpdate() {
        if ( this.state.edit ) {
            ReactDom.findDOMNode(this.refs.listname).focus();
        }
    }

    handleHeaderClick = () => {
        this.setState({edit: true, config: this.state.config});
    }

    handleHeaderClick = () => {
        this.setState({config: this.state.config, edit: !this.state.edit});
    }

    handleAcceptClick = () => {
        this.setState({edit: false, config: this.state.config});
        this.props.update_list_remote(this.props.list_index, ReactDom.findDOMNode(this.refs.listname).value, this.props.lists[this.props.list_index].uri);
    }

    handleCancelClick = () => {
        this.setState({edit: false, config: this.state.config});
    }

    handleConfigClick = () => {
        this.setState({edit: this.state.edit, config: !this.state.config});
    }

    handleDeleteClick = () => {
      const list_index = this.props.list_index;
      const uri = this.props.lists[list_index].uri;
      this.props.delete_list_remote(list_index, uri);
    }

    handlePDFClick = (event) => {
      event.preventDefault();
      const list_index = this.props.list_index;

      var pdf = new jsPDF();
      pdf.text(10, 20, this.props.lists[list_index].name);

      this.props.lists[list_index].items.forEach( function(item, i) {
        pdf.text(10, 40+(i*10), item.content);
      })

      pdf.save('memolist.pdf');
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
      var configStyle = {};
      if ( this.state.edit ) {
        header = <div className="input-group input-group-sm">
                <input className="form-control input-sm" type="text" name="listname" ref="listname" onKeyDown={ this.handleKeyDown } defaultValue={ this.props.lists[list_index].name }/>
                <span className="input-group-btn">
                <button className="btn btn-success btn-sm" type="button" onClick={ this.handleAcceptClick }><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                <button className="btn btn-default btn-sm" type="button" onClick={ this.handleCancelClick }><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                </span>
                </div>;
      } else {
        header = <div>
                   <div className="pull-right">
                            <div className="btn-group"><span onClick={ this.handleConfigClick } className="text-muted glyphicon glyphicon-option-vertical"></ span></div>
                    </div>
                    <h4 className="panel-title"><span onClick={ this.handleHeaderClick }>{ this.props.lists[list_index].name !== '' ? this.props.lists[list_index].name : 'Unnamed list' } </span></h4>

                 </div>;

      }

      if ( this.state.config ) {
        configStyle = {display: 'inline'}
      } else {
        configStyle = {display: 'none'}
      }

      return (<Col lg={4} sm={6} xs={12}>

      <Panel header={ header }>
        <Row style={ configStyle } fill>
          <Col lg={6} sm={6} xs={12}><span onClick={ this.handlePDFClick } className="text-muted"><span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Get PDF</span></Col>
          <Col lg={6} sm={6} xs={12}><span onClick={ this.handleDeleteClick } className="text-muted"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete list</span></Col>
        </Row>
          <Table striped condensed hover fill>
            <ReactCSSTransitionGroup component="tbody"  transitionName="example" transitionEnterTimeout={300} transitionLeave={false}>
              { this.props.lists[list_index].items.map((memoitemData,i ) => {
                  return <Memoitem key={ memoitemData.id } item_index={ i } { ...this.props } />;
              })}
            </ReactCSSTransitionGroup>
          </Table>

          <Additem uri={ this.props.lists[list_index].items_uri } { ...this.props } />
      </Panel>
    </Col>);
    }
}

export default Memolist;
