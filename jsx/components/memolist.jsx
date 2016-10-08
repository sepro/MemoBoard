import React from 'react';
import ReactDom from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Remarkable from 'remarkable';
import removeMd from 'remove-markdown';

import {Row, Col, Panel, Table} from 'react-bootstrap';
import {FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

import Memoitem from './memoitem.jsx';
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
        this.setState({edit: !this.state.edit});
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

    handlePDFClick = (event) => {
      event.preventDefault();
      const list_index = this.props.list_index;
      if (window.XMLHttpRequest !== undefined)
      {
          var jsPDF = require('../external/jspdf.debug');

          var pdf = new jsPDF();
          pdf.text(10, 20, removeMd(this.props.lists[list_index].name));

          this.props.lists[list_index].items.forEach( function(item, i) {
            pdf.text(10, 40+(i*10), removeMd(item.content));
          })

          pdf.save('memolist.pdf');
      }
    }


    handleKeyDown = (event) => {
         if(event.key == 'Enter'){
            this.handleAcceptClick();
         } else if(event.key == 'Escape') {
            this.handleCancelClick();
         }
    }

    renderMarkdown = (md) => {
        var rm = new Remarkable({linkify: true});
        var rawMarkup = rm.render(md);

        return { __html: rawMarkup }
    }

    render() {
      const list_index = this.props.list_index;
      const uri = this.props.lists[list_index].uri;

      var header;
      if ( this.state.edit ) {
        header = <InputGroup bsSize="sm">
                 <FormControl type="text" name="listname" ref="listname" onKeyDown={ this.handleKeyDown } defaultValue={ this.props.lists[list_index].name } />
                 <InputGroup.Button>
                  <Button bsStyle="success" onClick={this.handleAcceptClick}><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></Button>
                 </InputGroup.Button>
                 <InputGroup.Button>
                  <Button bsStyle="default" onClick={this.handleCancelClick}><span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></Button>
                 </InputGroup.Button>
                </InputGroup>;
      } else {
        var dropdown_button = <span className="text-muted glyphicon glyphicon-option-vertical"></span>;
        var dropdown_button_style = {
            border: '0 px',
            margin: 0,
            padding: 0
        }

        header = <div>
                 <div className="pull-right">
                        <ButtonToolbar>
                        <DropdownButton bsStyle="link" title={ dropdown_button } id="dropdown-link" noCaret pullRight style={ dropdown_button_style }>
                        <MenuItem eventKey="1"><span onClick={ this.handlePDFClick } className="text-muted"><span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Get PDF</span></MenuItem>
                        <MenuItem eventKey="2"><span onClick={ this.handleDeleteClick } className="text-muted"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete list</span></MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                 </div>
                 <h4 className="panel-title" onClick={ this.handleHeaderClick }><span dangerouslySetInnerHTML={this.renderMarkdown( this.props.lists[list_index].name !== '' ? this.props.lists[list_index].name : 'Unnamed list')} /></h4>

                 </div>;

      }



      return (<Col lg={4} sm={6} xs={12}>

      <Panel header={ header }>

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
