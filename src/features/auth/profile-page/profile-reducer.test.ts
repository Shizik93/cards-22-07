import {ProfileReducer, ProfileStateType, setProfileDataUserAC} from "./profile-reducer";

test('login data should be added',()=>{
    const startState: ProfileStateType={
        email: null,
        avatar: null,
        nikName: null
    }
    const data = {
        "_id": "62dfae65b0f92f31de7137a5",
        "email": "Yauhen.koltashau.1985@gmail.com",
        "rememberMe": true,
        "isAdmin": false,
        "name": "Yauhen.koltashau.1985@gmail.com",
        "verified": false,
        "publicCardPacksCount": 0,
        "created": "2022-07-26T09:05:41.660Z",
        "updated": "2022-07-26T11:47:25.032Z",
        "__v": 0,
        "token": "b78ca330-0cd8-11ed-9b95-abe5f01a02ec",
        "tokenDeathTime": 1659440845027
    }
    let action = setProfileDataUserAC(data)
    let endState = ProfileReducer(startState,action )

    expect(endState).not.toBe(startState)
    expect(endState.email).toBe("Yauhen.koltashau.1985@gmail.com")
    expect(endState.nikName).toBe("Yauhen.koltashau.1985@gmail.com")
})