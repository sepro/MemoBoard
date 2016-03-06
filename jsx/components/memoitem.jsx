var $ = require ('jquery');
import React from 'react';

import Deletebutton from './deletebutton.jsx'

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: {content: '', created:''}};
    }

    loadFromServer() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: (data)  => {
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

    render() {
      return (<div>{ this.state.data.content } <em>{ this.state.data.created }</em>
      <Deletebutton onDelete={this.props.onChange} url={this.state.data.uri} /></div>);
    }
}

export default Memoitem;