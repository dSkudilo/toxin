
import {
  LOAD_CARDS, 
  RATE_NUMBER, 
  SEARCH_DATE, 
  SEARCH_DROPDOWN, 
  SEARCH_OPTIONS
} from './types'

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case  LOAD_CARDS:
      return ''
    case RATE_NUMBER:
      field = 'rateNumbers'  
      return {...state,[field]:value(state,field,action)}
    case SEARCH_OPTIONS:
      field = 'searchOptions'
      const searchOptions = state[field] || []
      const idArr = searchOptions.indexOf(action.data)
      idArr !== -1
        ?searchOptions.splice(idArr,1)
        :searchOptions.push(action.data)
      return{...state,[field]:searchOptions}
    case SEARCH_DROPDOWN:
      field = action.data.name
      return {...state,[field]:{
        fieldStorage:action.data.data,
        btnContentStorage:action.data.btnContent
      }} 
    case SEARCH_DATE:
      field = 'date'
      Object.keys(action.data).forEach(key => {
        if(!action.data[key]){
          delete action.data[key] 
        }
      })
      return{...state,[field]:{
        arrivalDate:action.data.arrivalDate,
        departureDate:action.data.departureDate,
        btnContentStorage:action.data.btnContent
      }}
    default: return state
  }
}


function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}