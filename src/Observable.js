export class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        const subscriber = new Subscriber(observer);
        const unsubscribeFn = this._subscribe(subscriber);
        subscriber.setUnsubscribeFn(unsubscribeFn);
        return subscriber;
    }
    pipe(...operators) {
        return ((observable)=> {
            return operators.reduce((last, operator) => operator(last), observable)
        })(this)
    }
}

class Subscriber {
    constructor(observer) {
        this.observer = observer;
        this.isDone = false;
    }
    next(value) {
        if(!this.isDone && this.observer.next) {
            this.observer.next(value);
        }
    }
    error(value) {
        this.isDone = true;
        if(this.observer.error) {
            this.observer.error(value);
        }
        this.unsubscribe();
    }
    complete() {
        this.isDone = true;
        if(this.observer.complete) {
            this.observer.complete();
        }
        this.unsubscribe();
    }
    setUnsubscribeFn(fn) {
        this.unsubscribeFn = fn;
    }
    unsubscribe() {
        if(this.unsubscribeFn) {
            this.unsubscribeFn();
        }
    }
}

export function map(fn) {
    return (observable) => {
        return new Observable(subsriber => {
            const cleanup = observable.subscribe({
                next: value => subsriber.next(fn(value)),
                error: value => subsriber.error(value),
                complete: () => subsriber.complete(),
            });
            return () => {
                cleanup.unsubscribe();
            }
        })
    } 
}

export class Subject {
    constructor() {
        this.observerList = []
    }
    subscribe(observer){
        this.observerList.push(observer)
    }
    next(value) {
        this.observerList.forEach(observer => {
            observer.next(value);
        })
    }
    error(value) {
        this.observerList.forEach(observer => {
            observer.error(value);
        })
    }
    complete() {
        this.observerList.forEach(observer => {
            observer.complete();
        })
    }
}