import {
  FAVE_STOP,
  POPU_STOPS,
  REMOVE_LOCAL_STOP,
  REMOVE_FAVE_STOP,
  TOGGLE_STOP,
  FETCH_FAVE_REQUEST,
  FETCH_FAVE_SUCCESS,
  FETCH_FAVE_FAILURE
} from './fave-stop-actions'


//@app.route('/api/v2/stops/<stopId>')

const initialState = {
  faveStops: [],
  faveStopApi: []
}

export default function faveStops(state = initialState, action) {

  switch (action.type) {

    case TOGGLE_STOP:
      let removeCurState;
      if (localStorage.hrtFaves) {
        let curFaves = JSON.parse(localStorage['hrtFaves'])
        let removeCurIndex;
        //checks to see if stop is already in favestops
        curFaves.faveStops.forEach((element, index) => {
          if (element == action.routeId) {
            removeCurIndex = index;
            removeCurState = Object.assign({}, state, {
              faveStops: [
                ...state.faveStops.slice(0, removeCurIndex),
                ...state.faveStops.slice(removeCurIndex + 1)
              ]
            })
            localStorage['hrtFaves'] = JSON.stringify({faveStops: removeCurState.faveStops});
        }})
      }
      if (!removeCurState) {  
        removeCurState = Object.assign({}, state, {
          faveStops: [
            ...state.faveStops, action.routeId
          ]
        })
        localStorage['hrtFaves'] = JSON.stringify({faveStops: removeCurState.faveStops});
      }
      return removeCurState
 

    case FAVE_STOP:
      let newFaves = Object.assign({}, state, {
        faveStops: [
          ...state.faveStops, action.routeId
        ]
      })
      localStorage['hrtFaves'] = JSON.stringify({faveStops: newFaves.faveStops});
      return newFaves

    case POPU_STOPS:
      if (localStorage.hrtFaves) {
        let oldFaves = JSON.parse(localStorage['hrtFaves'])
        let popuFaves = Object.assign({}, state, {
          faveStops: [
            oldFaves
          ]
        })

        return popuFaves
      }
      return state

    case REMOVE_FAVE_STOP:
      let hrtFaves = JSON.parse(localStorage['hrtFaves'])
      let removeIndex;
      hrtFaves.faveStops.forEach(function (element, index) {
          if (element == action.routeId) removeIndex = index
      })

      let removeFaveState = Object.assign({}, state, {
        faveStops: [
          ...state.faveStops.slice(0, removeIndex),
          ...state.faveStops.slice(removeIndex + 1)
        ]
      })
      localStorage['hrtFaves'] = JSON.stringify({faveStops: removeFaveState.faveStops});
      return removeFaveState

    case REMOVE_LOCAL_STOP:
      localStorage.removeItem('hrtFaves')
      return initialState

    case FETCH_FAVE_REQUEST:
      return initialState

    case FETCH_FAVE_SUCCESS:

    let obj = {
      stopId : "123",
      buses : action.response
    }

    let arr = []
    arr.push(obj)

    return Object.assign({}, state, {
      isFetching: false,
      faveStopApi: [
        ...arr
      ]
    })

    case FETCH_FAVE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

    default:
      return state
  }
}
