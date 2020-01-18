export const myInitObject = {
    ROOT_URL: 'https://www.flickr.com/services/rest/?api_key=ddfad6c5fa65ed4f69990448c09c1ee3&format=json&nojsoncallback=1&per_page=20'
}

// https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=6f1eda5857c0c6b7206ae64da2d5304a&format=json&nojsoncallback=1&api_sig=3637d7e0cabce489ce32baabc24bdf61
// https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f1eda5857c0c6b7206ae64da2d5304a&text=dog&format=json&nojsoncallback=1&api_sig=f35e00633322e5b86f3fb5149b68c837
export const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const toLowerCaseString = string => {
    if (!string) return ''
    return string.toLowerCase()
}

export const toUpperCaseFirstLetter = string => {
    if (!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toLowerCaseStringUpperCaseFirstLetter = string => {
    if (!string) return ''
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toDisplayFirstWord = (string, splitPoint) => {
    if (!string) return ''
    string = string.split(splitPoint || ' ')[0]
    return string;
}

export const toUpperCaseAndDisplayFirstLetter = string => {
    if (!string) return ''
    return string.charAt(0).toUpperCase()
}

export const toUpperCaseAndDisplayFirstWord = (string, splitPoint) => {
    if (!string) return ''
    string = string.split(splitPoint || ' ')[0]
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const isEmptyObject = (obj) => {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}