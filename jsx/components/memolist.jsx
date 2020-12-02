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
import MemoModal from './memomodal.jsx';
import CollapseGlyph from './collapseglyph.jsx'

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {edit:false, modalIsOpen: false };
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
        this.props.update_list_remote(this.props.list_index, ReactDom.findDOMNode(this.refs.listname).value, this.props.lists[this.props.list_index].collapsed, this.props.lists[this.props.list_index].uri);
    }

    handleCancelClick = () => {
        this.setState({edit: false});
    }

    handleCollapseClick = () => {
        let collapsed = !this.props.lists[this.props.list_index].collapsed;
        this.props.update_list_remote(this.props.list_index, this.props.lists[this.props.list_index].name, collapsed, this.props.lists[this.props.list_index].uri);
    }

    handleDeleteClick = () => {
      let list_index = this.props.list_index;
      if (this.props.lists[list_index].items.length == 0) {
          this.handleDelete();
      } else {
          this.openModal();
      }
    }

    handleDelete = () => {
      let list_index = this.props.list_index;
      let uri = this.props.lists[list_index].uri;
      this.props.delete_list_remote(list_index, uri);
    }

    openModal = () => {
      this.setState({modalIsOpen: true});
    }

    closeModal = () => {
      this.setState({modalIsOpen: false});
    }

    handlePDFClick = (event) => {
      event.preventDefault();
      let list_index = this.props.list_index;

      /*
        Check if XMLHttpRequest is available and build PDF.
        Mocha tests are run outside the browser, required to exclude this
        from testing (which would fail).
      */
      if (window.XMLHttpRequest !== undefined)
      {
          let jsPDF = require('../external/jspdf.min');

          let pdf = new jsPDF();
          pdf.text(10, 20, removeMd(this.props.lists[list_index].name));

          this.props.lists[list_index].items.forEach( function(item, i) {
            let x = 10 + 80*(i % 2)
            let y = 40+(Math.floor(i/2)*10)
            pdf.text(x, y, removeMd(item.content));
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
        let rm = new Remarkable({linkify: true});
        let rawMarkup = rm.render(md);

        return { __html: rawMarkup }
    }

    render() {
      let list_index = this.props.list_index;
      let uri = this.props.lists[list_index].uri;

      let header;
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
            let dropdown_button = <span className="text-muted glyphicon glyphicon-option-vertical"></span>;
            let dropdown_button_style = {
                border: '0 px',
                margin: 0,
                padding: 0
            }

            header = <div>
                         <div className="pull-right">
                                <ButtonToolbar>
                                <DropdownButton bsStyle="link" title={ dropdown_button } id="dropdown-link" noCaret pullRight style={ dropdown_button_style }>
                                <MenuItem header>Actions</MenuItem>
                                <MenuItem eventKey="1" onClick={ this.handlePDFClick }><span className="text-muted"><span className="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Get PDF</span></MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="2" onClick={ this.handleDeleteClick }><span className="text-muted"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete list</span></MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                         </div>
                         <MemoModal open={this.state.modalIsOpen} close={this.closeModal} delete={this.handleDelete} />
                         <h4 className="panel-title panel-collapse pull-left" onClick={ this.handleCollapseClick }><CollapseGlyph collapsed={this.props.lists[list_index].collapsed} /> </h4>
                         <h4 className="panel-title" onClick={ this.handleHeaderClick }><span dangerouslySetInnerHTML={this.renderMarkdown( this.props.lists[list_index].name !== '' ? this.props.lists[list_index].name : 'Unnamed list')} /></h4>
                     </div>;
      }

      if (this.props.lists[list_index].collapsed) {
             return (
              <Panel header={ header }>
                <Table striped condensed hover fill>
                  <ReactCSSTransitionGroup component="tbody"  transitionName="example" transitionEnterTimeout={200} transitionLeave={150}>
                  </ReactCSSTransitionGroup>
                </Table>
                <ReactCSSTransitionGroup component="span" transitionName="example" transitionEnterTimeout={200} transitionLeave={150}>
                </ReactCSSTransitionGroup>
              </Panel>
          );
      } else {
            return (
              <Panel header={ header }>
                <Table striped condensed hover fill>
                    <ReactCSSTransitionGroup component="tbody"  transitionName="example" transitionEnterTimeout={200} transitionLeave={150}>
                      { this.props.lists[list_index].items.map((memoitemData,i ) => {
                          return <Memoitem key={ memoitemData.id } item_index={ i } { ...this.props } />;
                      })}
                    </ReactCSSTransitionGroup>
                </Table>
                <ReactCSSTransitionGroup component="span" transitionName="example" transitionEnterTimeout={200} transitionLeave={150}>
                <Additem key={ "new_item_" + list_index } uri={ this.props.lists[list_index].items_uri } { ...this.props } />
                </ReactCSSTransitionGroup>
              </Panel>
          );
      }
    }
}

export default Memolist;
