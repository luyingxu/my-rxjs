// import { Observable, map } from 'rxjs';

import { Observable, map } from './Observable.js';

const source = new Observable((observer)=> {
    let i = 0;
    const timer = setInterval(()=> {
        const num = ++i;
        // console.log('num=', num);
        observer.next(num);
    }, 1000)
    setTimeout(()=> {
        observer.complete('done');
    }, 2500);
    return function unsubscribe() {
        clearInterval(timer);
    };
})
const source1 = map(item => item + 1)(source);
const source2 = map(item => item * 10)(source1);
const subscription = source2.subscribe({
    next: (v)=> { console.log(v)},
    error: (v) => { console.error('Error', v)},
    complete: (v) => { console.log('Complete')},
})

setTimeout(() => {
    subscription.unsubscribe();
}, 5500);
