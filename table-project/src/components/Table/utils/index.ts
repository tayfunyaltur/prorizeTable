export const convertObjectToQS = (val: Record<string, string>) => {
    return Object.keys(val).map((key) => `${key}=${val[key]}`).join('&');
}

export const convertObjetToSortQS = (val: Record<string, string>) => {
    return Object.keys(val).map((key) => `${key},${val[key]}`).join('+');
}

export const convertFilterObjects = (val: Record<string, string[] | string>) => {
    const result: Record<string, string[]> | Record<string, string> = {};
    Object.keys(val).forEach((key) => {
        result[key] = val[key]
    })
    return result;
}