import React from 'react';
import ReactDom from 'react-dom';

import {FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap';

class Addlist extends React.Component{
    addList = (ev) => {
        ev.preventDefault();
        const name = ReactDom.findDOMNode(this.refs.listname).value;

        this.props.add_list_remote(name, this.props.url);
        ReactDom.findDOMNode(this.refs.listname).value = '';
    }

    render() {
      return (<form  onSubmit={ this.addList }>
                <FormGroup>
                <InputGroup bsSize="sm">
                    <FormControl type="text" ref="listname" placeholder="Add list"/>
                    <InputGroup.Button>
                        <Button type="submit" bsStyle="primary">Add</Button>
                    </InputGroup.Button>
                </InputGroup>
                </FormGroup>
              </form>);
    }
}

export default Addlist;
