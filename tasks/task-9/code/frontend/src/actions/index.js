export const LOGIN = 'LOGIN';
export const WEBSITES = 'WEBSITES';
export const LOGOUT = 'LOGOUT';

export function loginUser() {
    return {
        type: LOGIN,
        payload: true
    }
}

export function getWebsites(websites) {
    return {
        type: WEBSITES,
        payload: websites
    }
}

export function logout() {
	return {
		type: LOGOUT,
		payload: false
	}
}