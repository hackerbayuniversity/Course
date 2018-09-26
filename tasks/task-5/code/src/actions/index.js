export const FETCH_DATA = 'fetch_data';

// default function to display redux action format
export function defaultFunction() {
    let testVar = 'Hello';

    // action object format being return to a reducer
    return {
        type: FETCH_DATA,
        payload: testVar
    }
}