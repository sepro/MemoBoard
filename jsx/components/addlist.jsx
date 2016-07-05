import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
       this.addList = this.addList.bind(this);
    }

    addList(ev) {
        ev.preventDefault();
        const name = ReactDom.findDOMNode(this.refs.listname).value;

        this.props.add_list_remote(name, this.props.url);
    }

    render() {
      return (<form  onSubmit={ this.addList }>
                <div className="input-group input-group-sm addlist">
                    <input className="form-control input-sm" type="text" name="listname" ref="listname" placeholder="Add list"/>
                    <span className="input-group-btn">
                        <input className="btn btn-primary btn-sm" type="submit" value="Add" />
                    </span>
                </div>
              </form>);
    }
}

export default Addlist;