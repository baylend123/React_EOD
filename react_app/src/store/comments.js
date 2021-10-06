const GET_COMMENTS = 'comments/LOAD'
const DELETE_COMMENT = 'comment/DELETE'


const getCommentsAction = (commentsOject) => {
    
    return {
        type: GET_COMMENTS,
        payload: commentsOject
    }
}

const deleteCommentAction = (deletedComment) => {
    return {
        type: DELETE_COMMENT,
        payload: deletedComment
    }
}

export const getCommentsThunk = () => async (dispatch) => {
    const response = await fetch('/comments')
    let comment_obj = await response.json()
    let commentArr = comment_obj.comments
    console.log(commentArr)
    if(response.ok){
        dispatch(getCommentsAction(commentArr))
    }else{
        //error stuff
    }
}

export const deleteCommentThunk = (id) => async (dispatch) => {
    const response = await fetch(`/delete/${id}`)
    if(response.ok){
        dispatch(deleteCommentAction(id))
    }else{
        //error stuff
    }
} 


const initialState = {}
export default function commentsReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload
        case DELETE_COMMENT:
            delete newState[action.payload]
            return newState 
        default:
            return state
    }
    
}