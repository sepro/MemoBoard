import React from 'react';
import axios from 'axios';

import Memolist from './memolist.jsx'
import Addlist from './addlist.jsx'

class Memoboard extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: []};
    }

    loadFromServer() {
        axios.get(this.props.url)
            .then((response) => {
                this.setState({data: response.data});
            })
            .catch((err) => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    deleteList(url) {
        axios.delete(url)
            .then((response) => {
                this.loadFromServer();
            });
    }

    render() {
      return (<div className="container">
                <div className="row">
                <div className="col-lg-4 col-sm-6 col-xs-12"><h1>MemoBoard</h1></div>
                <div className="col-lg-4  visible-lg"></div>
                <div className="col-lg-4 col-sm-6 col-xs-12">
                <Addlist url={this.props.url} onAdd={this.loadFromServer.bind(this)}/></div>
                </div>
                <hr />
                <div className="row">
                  {this.state.data.map(function(memolistData){
                        return <Memolist key={memolistData.id} url={memolistData.uri} handleDelete={this.deleteList.bind(this, memolistData.uri)} />;
                  }.bind(this))}
                </div>
      </div>);
    }
}

export default Memoboard;