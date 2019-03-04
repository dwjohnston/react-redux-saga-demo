# react-redux-saga-demo

This repo was used in giving presentations at MelbJs and the Melbourne React Meetup in January and February 2019. 

See the [presentation notes]("./presentation notes.md") for more details - though they're pretty scrappy, really for my eyes. 

Three source folders: 

## generators

Some code that demonstrates the basic functionality of javascript generators. 

## thunk-solution

This demonstrates a basic react/redux application - that uses redux-thunk for making the API calls. 

It demonstrates how we  might test the thunks. 

Three tests fail: 

- One because it anonymous functions can't be compared for equality
- Another test that shows that boiled down.
- Another that demonstrates that you can't mock functions in the same module. 

## saga-solution

This reproduces the same application - but using redux-saga as the middleware. 

It demonstrates much simpler working tests. 

