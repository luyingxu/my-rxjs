// import { Observable } from 'rxjs';

import { Observable } from './Observable.js';

const source = new Observable((observer)=> {
    let i = 0;
    const timer = setInterval(()=> {
        const num = ++i;
        // console.log('num=', num);
        observer.next(num);
    }, 1000)
    setTimeout(()=> {
        observer.complete('error');
    }, 2500);
    return function unsubscribe() {
        clearInterval(timer);
    };
})
const subscription = source.subscribe({
    next: (v)=> { console.log(v)},
    error: (v) => { console.error('Error', v)},
    complete: (v) => { console.log('Complete')},
})

setTimeout(() => {
    subscription.unsubscribe();
}, 5500);
