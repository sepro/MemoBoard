var $ = require ('jquery');
import React from 'react';

import Memoitem from './memoitem.jsx'
import Button from './button.jsx'
import Additem from './additem.jsx'

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: {items: []}};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data) => {
            this.setState({data: data});
          },
          error: (xhr, status, err)  => {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    deleteItem(url) {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function() {
                this.loadFromServer();
            }.bind(this)
        });
    }

    render() {
      return (<div><strong>{ this.state.data.name }</strong> <Button onClick={this.props.handleDelete} text="Delete list" />
         {this.state.data.items.map(function(memoitemData){
            return <Memoitem key={memoitemData.id} url={memoitemData.uri} handleDelete={this.deleteItem.bind(this, memoitemData.uri)} />;
          }.bind(this))}
      <Additem url={this.state.data.items_uri} onAdd={this.loadFromServer.bind(this)}/>
      </div>);
    }
}

export default Memolist;