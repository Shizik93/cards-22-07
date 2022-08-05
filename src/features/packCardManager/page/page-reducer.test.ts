import {PageReducer, setPageDataAC} from "./page-reducer";
import {ResponsePageType} from "../../auth/profile-page/profile-api";

test('cards shold be added', ()=> {
    // const startState =
    //     {
    //         cardPacks:[{
    //             _id: '',
    //             user_id: '',
    //             name: '',
    //             cardsCount: 0,
    //             created: '',
    //             updated: ''
    //         }],
    //         page: 1,
    //         pageCount:4,
    //         cardPacksTotalCount: 0,
    //         minCardsCount:3,
    //         maxCardsCount:9,
    //
    //     }
    // let data:ResponsePageType = {
    //     cardPacks:[{_id:'56789',cardsCount:5, name: 'yua', created: '', updated: '', user_id: "2"}],
    //     page: 3,
    //     pageCount:10,
    //     cardPacksTotalCount: 100,
    //     minCardsCount:3,
    //     maxCardsCount:9,
    //
    //         }
    //
    // let action = setPageDataAC(data)
    // let endState = PageReducer(startState,action)
    //
    // expect(endState.cardPacksTotalCount).toBe(100)
    // expect(endState.cardPacks[0]._id).toBe('56789')
})