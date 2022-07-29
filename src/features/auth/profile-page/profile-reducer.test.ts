import {initialStateType, ProfileReducer, ProfileStateType, setProfileDataUserAC} from "./profile-reducer";

test('login data should be added',()=>{
    const startState: initialStateType={
        _id: '123',
        email: "Yauhen.koltashau.1985@gmail.com",
        name: "sanya",
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: null,
    }
    const data:initialStateType = {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: null,

    }
    let action = setProfileDataUserAC(startState)
    let endState = ProfileReducer(data,action )

    expect(endState).not.toBe(startState)
    expect(endState.email).toBe("Yauhen.koltashau.1985@gmail.com")
    expect(endState.name).toBe('sanya')
})