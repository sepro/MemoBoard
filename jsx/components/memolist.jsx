var $ = require ('jquery');
import React from 'react';

import Memoitem from './memoitem.jsx'

class Memolist extends React.Component{
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
      return (<div><strong>{ this.state.data.name }</strong>
         {this.state.data.items.map(function(memoitemData ,i){
            return <Memoitem data={memoitemData} url={memoitemData.uri} />;
          })}

      </div>);
    }
}

export default Memolist;