var $ = require ('jquery');
import React from 'react';
var moment = require('moment');

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
      var date = '';

      if (this.state.data.created) {
           date =  moment(this.state.data.created).format("DD-MM-YY");
      }

      console.log(date);
      return (<div className="clearfix"><div className="pull-left">{ this.state.data.content }</div><div className="pull-right text-muted"><em>{ date }</em>
       <Button onClick={this.props.handleDelete} glyph="glyphicon glyphicon-remove" /></div></div>);
    }
}

export default Memoitem;