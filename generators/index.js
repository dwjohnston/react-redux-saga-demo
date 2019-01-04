/*
    Example 1 - the basics
*/
console.log("\n\nexample 1 - basics\n");
const eg1 = function* (n) {

    yield "start";
    for (let i = 0; i < n; i++) {
        yield i;
    }
    yield "fin";
}

const gen1 = eg1(3);
console.log(gen1);// A generator object, not a function!

console.log(gen1.next()); //start
console.log(gen1.next()); //0
console.log(gen1.next()); //1
console.log(gen1.next()); //2
console.log(gen1.next()); //fin
console.log(gen1.next()); //undefined
console.log(gen1.next()); //undefined
console.log(gen1.next()); //undefined

/*
    Example 2 - Passing an value into the next() function
*/
console.log("\n\nexample 2 - passing a value into the next function\n");


const eg2 = function* (n) {
    let a;
    a = yield `start: ${a}`;
    for (let i = 0; i < n; i++) {
        a = yield `${i}: ${a} `;
    }
    a = yield `fin: ${a} `;
}

const gen2 = eg2(3);
console.log(gen2.next("a")); //start: undefined
console.log(gen2.next("b")); //0: b
console.log(gen2.next("c")); //1: c
console.log(gen2.next("d")); //2: d
console.log(gen2.next("e")); //fin: e
console.log(gen2.next("f")); //undefined





/*
    Example 3 - Throwing an error from the generator 
*/
console.log("\n\nexample 3 - throwing an error from the generator \n");

const eg3 = function* (n) {
    yield `start`;
    for (let i = 0; i < n; i++) {
        yield i;
    }
    throw new Error("An error!");
    yield `fin`;
}

const gen3 = eg3(3);

try {
    console.log(gen3.next()); //start
    console.log(gen3.next()); //0
    console.log(gen3.next()); //1
    console.log(gen3.next()); //2
    console.log(gen3.next()); //Error thrown here
    console.log(gen3.next()); //This line doesn't execute
} catch (err) {
    console.log(`catch block: ${err.message}`);
}

/*
    Example 4 - Passing an error into the generator function with .throw()
*/
console.log("\n\n Example 4 - Passing an error into the generator with .throw() \n");

const eg4 = function* (n) {
    let a;

    try {
        a = yield `start: ${a}`;
        for (let i = 0; i < n; i++) {
            a = yield `${i}: ${a} `;
        }
        a = yield `fin: ${a} `;
    } catch (err) {
        yield `oh dear, the generator encountered an error: ${err.message}`
    }

}

const gen4 = eg4(3);

try {
    console.log(gen4.next("a")); //start: undefined
    console.log(gen4.next("b")); //0: b
    console.log(gen4.next("c")); //1: c
    console.log(gen4.throw(new Error("I passed this error in"))); //'oh dear...' 
    console.log(gen4.next("d")); //undefined
} catch (err) {
    console.log(`catch block: ${err.message}`);
}


/**
 * Example 5 - .return(); 
 */

console.log("\n\n Example 5 - .return() \n");
const gen5 = eg4(4);
console.log(gen5.next("a")); //start: undefined
console.log(gen5.next("b")); //0: b
console.log(gen5.return("c")); //c 