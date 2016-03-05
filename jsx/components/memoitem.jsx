var $ = require ('jquery');
import React from 'react';

class Memoitem extends React.Component{
    constructor(props) {
       super(props);
       this.state = {data: this.props.data};
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

    render() {
      return (<div>{ this.state.data.content } <em>{ this.state.data.created }</em></div>);
    }
}

export default Memoitem;