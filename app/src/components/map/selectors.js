// import * as actions from '../../store/actions'

export const mapStateToProps = (state) => {
    const data = state.data;

    return {
        data: data.data,
        dataFetched: data.dataFetched
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {

    }
}