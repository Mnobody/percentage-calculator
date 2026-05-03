"use strict";

function calculate(a, b) {
    return {
        a: a,
        b: b,
        percentage: a / 100 * b,
        percent: a / b * 100,
        delta: (b - a) / a * 100,
    };
}
