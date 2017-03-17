import * as actions from '../../store/actions'

export const mapStateToProps = (state) => {

    return {
        data: state.data
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(actions.fetchData());
        }
    }
}