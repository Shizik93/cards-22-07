export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
	status: 'loading' as RequestStatusType
}
type initStateType=typeof initialState

export const appReducer = (state = initialState , action: any): initStateType => {
	switch (action.type) {
		case 'SET-LOADER':
		default:
			return state
	}
}