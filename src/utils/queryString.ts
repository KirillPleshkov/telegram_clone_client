export const deleteQueryString = (
    name: string,
    searchParams: URLSearchParams,
) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);

    return params.toString();
};

export const addQueryString = (
    name: string,
    searchParams: URLSearchParams,
    value: string = "true",
) => {
    const params = new URLSearchParams(searchParams.toString());
    params.append(name, value);

    return params.toString();
};
