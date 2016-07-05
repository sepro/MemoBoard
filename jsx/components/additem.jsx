import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';


class Additem extends React.Component{
    constructor(props) {
       super(props);
       this.addItem = this.addItem.bind(this);
    }

    addItem(ev) {
        ev.preventDefault();

        var postdata = new URLSearchParams();
        postdata.append('content', ReactDom.findDOMNode(this.refs.itemname).value);

        axios.post(this.props.uri, postdata, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                ReactDom.findDOMNode(this.refs.itemname).value = "";
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
      return (
            <form onSubmit={this.addItem}>
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