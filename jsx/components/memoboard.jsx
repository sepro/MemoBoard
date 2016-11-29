import React from 'react';
import FlipMove from 'react-flip-move';

import {Row, Col} from 'react-bootstrap';

import Memolist from './memolist.jsx';
import Addlist from './addlist.jsx';

class Memoboard extends React.Component{
    _load = () => {
        this.props.fetch_data(this.props.url);

        setTimeout(this._load, 1000);
    }

    componentDidMount() {
        this._load();
    }

    render() {
      return (
            <div className="container">
                <Row>
                    <Col lg={4} sm={6} xs={12}><h1>MemoBoard</h1></Col>
                    <Col lg={4} sm={0} xs={0}></Col>
                    <Col lg={4} sm={6} xs={12}>
                        <div className="addlist"><Addlist {...this.props} /></div>
                    </Col>
                </Row>
                <hr />
                <Row>
                <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)" typeName="div">
                  {this.props.lists.map((memolistData, i) => {
                        return (
                            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12" key={ "wraps" + memolistData.id }>
                                <Memolist key={ memolistData.id } list_index={ i } {...this.props}/>
                            </div>
                        );
                  })}
                </FlipMove>
                </Row>
            </div>
      );
    }
}

export default Memoboard;
