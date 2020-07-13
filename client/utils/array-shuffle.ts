/**
 * Shuffles the provided Array and returns a new one
 *
 * @method shuffle
 * @param {Array} array – input array
 * @return {Array} – shuffled array
 * @public
 * */
export function shuffle<T>(array: Array<T>): Array<T> {
    let rand: number, index = -1;
    const length = array.length;
    const result = Array<T>(length);

    while (++index < length) {
        rand = Math.floor(Math.random() * (index + 1));
        result[index] = result[rand];
        result[rand] = array[index];
    }
    return result;
}
