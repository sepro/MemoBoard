var $ = require ('jquery');
import React from 'react';

import Memoitem from './memoitem.jsx'
import Deletebutton from './deletebutton.jsx'
import Additem from './additem.jsx'

class Memolist extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: this.props.data};
       this.reLoad = this.reLoad.bind(this);
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

    reLoad() {
        console.log('Called: memolist.reLoad');
        this.setState({data: {items: []}});
        this.loadFromServer();
    }

    render() {
      return (<div><strong>{ this.state.data.name }</strong> <Deletebutton onDelete={this.props.onChange} url={this.state.data.uri} />
         {this.state.data.items.map(function(memoitemData ,i){
            return <Memoitem key={i} data={memoitemData} url={memoitemData.uri} onChange={this.reLoad}/>;
          }.bind(this))}
      <Additem url={this.state.data.items_uri} onAdd={this.reLoad}/>
      </div>);
    }
}

export default Memolist;