/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function(fn, t) {
    
    return async function(...args) {
        return new Promise((resolve, reject) => {
            // Start fn async function as inner promise
            const innerPromise = fn(...args);
            // Timeout reject if fn execution ms exceeds t
            const timeoutID = setTimeout(() => {
                reject("Time Limit Exceeded")
            }, t);
            // Based on result of fn, resolve or reject
            innerPromise.then((result) => {
                // If fn executes under t clear timeout and resolve
                clearTimeout(timeoutID);
                resolve(result);
            }).catch((error) => {
                // Else clear timeout and resolvbe
                clearTimeout(timeoutID);
                reject(error);
            })          
        });
    };
}

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */