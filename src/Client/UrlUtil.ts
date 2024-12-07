export const updateUrlParam = (name: string, value: string | null) => {
    const url = new URL(location.href);

    if (!value || value.length == 0) {
        url.searchParams.delete(name);
    } else {
        url.searchParams.set(name, value);
    }

    history.pushState(null, "", url);
}

export const getUrlParam = (name: string) => {
    return new URL(location.href).searchParams.get(name);
}