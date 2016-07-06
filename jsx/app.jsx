import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators.jsx';

import Memoboard from './components/memoboard.jsx';

function mapStateToProps(state) {
    return {
        lists: state.lists
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Memoboard);

export default App;