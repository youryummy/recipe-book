import OpossumCircuitBreaker from "opossum";

const defaults = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
};

const breakers = {}

export class CircuitBreaker extends OpossumCircuitBreaker {
    constructor (object) {
        super((fname, ...args) => object[fname](...args), defaults);
    }

    static getBreaker(object, nameOverride) {
        let name = nameOverride ?? (object.constructor.name);
        if (!breakers[name]) breakers[name] = new CircuitBreaker(object);
        return breakers[name];
    }

    fire(fname, ...args) {
        return super.fire(fname, ...args);
    }
}