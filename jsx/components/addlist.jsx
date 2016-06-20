import React from 'react';
import ReactDom from 'react-dom';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
       this.addList = this.addList.bind(this);
    }

    addList(ev) {
        ev.preventDefault();
        var postdata = {name: ReactDom.findDOMNode(this.refs.listname).value};

        $.ajax({
            type: 'POST',
            url: this.props.url,
            data: postdata,
            dataType: 'json',
            success: function(data) {
                this.props.onAdd();
                ReactDom.findDOMNode(this.refs.listname).value = "";
            }.bind(this)
        });


    }

    render() {
      return (<form  onSubmit={ this.addList }>
                <div className="input-group input-group-sm addlist">
                    <input className="form-control input-sm" type="text" name="listname" ref="listname" placeholder="Add list"/>
                    <span className="input-group-btn">
                        <input className="btn btn-primary btn-sm" type="submit" value="Add" />
                    </span>
                </div>
              </form>);
    }
}

export default Addlist;