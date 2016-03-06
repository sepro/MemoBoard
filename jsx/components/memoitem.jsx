var $ = require ('jquery');
import React from 'react';

import Deletebutton from './deletebutton.jsx'

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: this.props.data};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
            this.setState({data: data});
          },
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }
        });
    }

    render() {
      return (<div>{ this.state.data.content } <em>{ this.state.data.created }</em>
      <Deletebutton onDelete={this.props.onChange} url={this.state.data.uri} /></div>);
    }
}

export default Memoitem;