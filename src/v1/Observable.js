export class Observable {
    constructor(dataProducer) {
        this.dataProducer = dataProducer;
    }
    subscribe(observer) {
        return this.dataProducer(observer);
    }
}