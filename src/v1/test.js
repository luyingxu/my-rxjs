// import { Observable } from 'rxjs';

import { Observable } from './Observable.js';

const source = new Observable((observer)=> {
    let i = 0;
    const timer = setInterval(()=> {
        const num = ++i;
        observer.next(num);
    }, 1000)
    setTimeout(()=> {
        observer.complete('done');
    }, 2500);
    return function unsubscribe() {
        clearInterval(timer);
    };
})
source.subscribe({
    next: (v)=> { console.log(v)},
    error: (v) => { console.error('Error', v)},
    complete: (v) => { console.log('Complete')},
})