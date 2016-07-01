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

        var postdata = new URLSearchParams();
        postdata.append('name', ReactDom.findDOMNode(this.refs.listname).value);

        axios.post(this.props.url, postdata, {headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
            .then((response) => {
                this.props.onAdd();
                ReactDom.findDOMNode(this.refs.listname).value = "";
            })
            .catch((err) => {
                console.error(err);
            });
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