import { Observable, map, Subject } from 'rxjs';

// import { Observable, map, Subject } from './Observable.js';

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
// const source1 = map(item => item + 1)(source);
// const source2 = map(item => item * 10)(source1);
const subscription = source
.pipe(
    map(item => item + 1),
    map(item => item * 10),
)
.subscribe({
    next: (v)=> { console.log(v)},
    error: (v) => { console.error('Error', v)},
    complete: (v) => { console.log('Complete')},
})

setTimeout(() => {
    subscription.unsubscribe();
}, 5500);

// const subject = new Subject();
// source.subscribe(subject);
// subject.subscribe({
//     next: (v)=> { console.log('Subject 1', v) },
//     error: (v) => { console.error('Subject 1 Error', v)},
//     complete: (v) => { console.log('Subject 1 Complete')},
// });
// subject.subscribe({
//     next: (v)=> { console.log('Subject 2', v)},
//     error: (v) => { console.error('Subject 2 Error', v)},
//     complete: (v) => { console.log('Subject 2 Complete')},
// });

