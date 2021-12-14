import {
  LOAD_CARDS, RATE_NUMBER, SEARCH_DATE, SEARCH_DROPDOWN, SEARCH_OPTIONS
} from './types'

// Action Creator
export function rateNumber(data){
  return{
    type:RATE_NUMBER,
    data
  }
}
export function searchOptions(data){
  return{
    type:SEARCH_OPTIONS,
    data
  }
}
export function searchDropdown(data){
  return{
    type:SEARCH_DROPDOWN,
    data
  }
}
export function loadCards(data) {
  return {
    type: LOAD_CARDS,
    data
  }
}
export function searchDate(data){
  return{
    type: SEARCH_DATE,
    data
  }
}