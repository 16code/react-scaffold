function request(
    url,
    options = {
        method: 'GET'
    }
) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method, url);
        if (options.headers) {
            Object.keys(options.headers).forEach(key => {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let output = {};
                try {
                    output = JSON.parse(xhr.response);
                } catch (error) {
                    console.log(error);
                }
                resolve(output);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(options.body);
    });
}

window.oldFetch = window.fetch;
window.fetch = request;
