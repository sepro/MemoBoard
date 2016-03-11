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
           date =  moment(this.state.data.created).format("DD-MM-YY HH:mm");
      }

      return (<tr>
      <td className="col-sm-6 col-xs-10 first">{ this.state.data.content }</td>
      <td className="col-sm-4 hidden-xs text-muted"><em className="item-date">{ date }</em></td>
      <td className="col-sm-2 col-xs-2 text-muted last"><div className="pull-right"><Button onClick={this.props.handleDelete} glyph="glyphicon glyphicon-remove" /></div></td>
      </tr>);
    }
}

export default Memoitem;