var $ = require ('jquery');
import React from 'react';

import Button from './button.jsx'

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
      <Button onClick={this.props.handleDelete} text="Delete item" /></div>);
    }
}

export default Memoitem;