let observers:Array<{event:string, cb:Function}> = [];

export const emmit = (event:string, ...params:any) => {
    let filtered_observers = observers.filter((item) => item.event === event);
    filtered_observers.forEach((observer) => {
        observer.cb(...params);
    });
}

export const on = (event:string, cb:Function) => {
    observers.push({
        event,
        cb
    });
}