export class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        const wrapper = new ObserverWrapper(observer);
        const unsubscribeFn = this._subscribe(wrapper);
        wrapper.setUnsubscribeFn(unsubscribeFn);
        return wrapper;
    }
    pipe(...operators) {
        return ((observable)=> {
            return operators.reduce((acc, currentOperator) => currentOperator(acc), observable)
        })(this)
    }
}

class ObserverWrapper {
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
    return (inObservable) => {
        const outObservable = new Observable(observer => {
            const cleanup = inObservable.subscribe({
                next: value => observer.next(fn(value)),
                error: value => observer.error(value),
                complete: () => observer.complete(),
            });
            return () => {
                cleanup.unsubscribe();
            }
        })
        return outObservable;
    } 
}