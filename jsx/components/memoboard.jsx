var $ = require ('jquery');
import React from 'react';

import Memolist from './memolist.jsx'
import Addlist from './addlist.jsx'

class Memoboard extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: []};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data) => {
            this.setState({data: data});
          },
          error: (xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    deleteList(i, url) {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function() {
                //Item removed now remove from state.
                console.log('Called : memolist.deleteItem');
                var newData = this.state.data;
                newData.splice(i,1);
                this.setState({data: newData});

            }.bind(this)
        });
    }

    render() {
      return (<div>
              {this.state.data.map(function(memolistData ,i){
                    return <Memolist key={memolistData.id} url={memolistData.uri} handleDelete={this.deleteList.bind(this, i, memolistData.uri)} />;
              }.bind(this))}
              <Addlist url={this.props.url} onAdd={this.loadFromServer.bind(this)}/>
      </div>);
    }
}

export default Memoboard;