import React from "React"
/*
import {CardPackItemsType, ResponseCardsPackListType} from "../api-packslist/api-packsList";
import {
    fetchPacksListActionsAC,
    InitPacksListStateType,
    packsListReducer, setCurrentPageAC,
    setMinMaxDataAC,
    setPackNameDataAC,
    setPageCountAC, setUserIdAC
} from "./packsListReducer";

let initPacksListState:InitPacksListStateType
let payload:ResponseCardsPackListType

beforeEach(()=>{
    initPacksListState = {
        cardPacks: [
        ] as CardPackItemsType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 0,
        pageCount: 5,
        packName: '',
        min: 3,
        max: 7,
        sortPacks: 0,
        user_id: ''
    }
    payload = {
        cardPacks: [
            {
                _id: 'id6ka',
                // user_id?: string
                user_name: "userName",
                name: "name",
                cardsCount: null,
                // created?: string
                updated: "data update"
            }
        ],
        cardPacksTotalCount: 300,
        maxCardsCount: 0,
        minCardsCount: 110,
        page: 1,
        pageCount: 4
    }
})
test('min & max should be changed', ()=>{
    let action = setMinMaxDataAC({min: 3, max:7})
    let endState = packsListReducer(initPacksListState, action)

    expect(endState).not.toBe(initPacksListState)
    expect(endState.min).toBe(3)
    expect(endState.max).toBe(7)
})
test('packName should be changed', ()=>{
    let action = setPackNameDataAC({packName: 'new'})
    let endState = packsListReducer(initPacksListState, action)

    expect(endState).not.toBe(initPacksListState)
    expect(endState.packName).toBe('new')
})
test('pageCount should be set', ()=>{
    let action = setPageCountAC({pageCount: 7})
    let endState = packsListReducer(initPacksListState, action)

    expect(endState).not.toBe(initPacksListState)
    expect(endState.pageCount).toBe(7)
})
test('current page should be set', ()=>{
    let action = setCurrentPageAC({page: 5})
    let endState = packsListReducer(initPacksListState, action)

    expect(endState).not.toBe(initPacksListState)
    expect(endState.page).toBe(5)
})
test('packlist should be updated', ()=>{
    let action = fetchPacksListActionsAC(payload)
    let endState = packsListReducer(initPacksListState, action)

    expect(endState).not.toBe(initPacksListState)
    expect(endState.cardPacksTotalCount).toBe(300)
    expect(endState.min).toBe(3)
})
test('user_id should be updated', ()=>{
    let action = setUserIdAC({user_id: 'userID'})
    let endState = packsListReducer(initPacksListState, action)

    expect(endState).not.toBe(initPacksListState)
    expect(endState.user_id).toBe('userID')
})
*/
