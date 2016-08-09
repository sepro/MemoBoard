import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Row, Col} from 'react-bootstrap';

import Memolist from './memolist.jsx';
import Addlist from './addlist.jsx';

class Memoboard extends React.Component{
    componentDidMount() {
        this.props.fetch_data(this.props.url);
    }

    render() {
      return (<div className="container">
                <Row>
                    <Col lg={4} sm={6} xs={12}><h1>MemoBoard</h1></Col>
                    <Col lg={4} sm={0} xs={0}></Col>
                    <Col lg={4} sm={6} xs={12}>
                        <div className="addlist"><Addlist {...this.props} /></div>
                    </Col>
                </Row>
                <hr />
                <Row>
                <ReactCSSTransitionGroup component="div" transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                  {this.props.lists.map((memolistData, i) => {
                        return <Memolist key={ memolistData.id } list_index={ i } {...this.props}/>;
                  })}
                </ReactCSSTransitionGroup>
                </Row>
      </div>);
    }
}

export default Memoboard;
