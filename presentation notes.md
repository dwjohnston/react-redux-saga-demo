## Quick poll

- Who here uses React
- Who uses redux? 
- Who uses redux-thunk?
- Who uses redux-saga?
- Who knows what a javascript generator function is? 

## Our application 

We have a simple application, 

**Slide:** we're using the JSONPlaceholder API: https://jsonplaceholder.typicode.com/


**Slide:** We have a list of users, and when we select a user, we fetch their posts, and display them. 
If a user has a post starting with 'voluptate', we also fetch their todos. 

If we encounter an API error, we'll display an error snackbar. 

The point of this example is to demonstrate a action that is more that just a simple fetch of data.

A real life example might be the user logs into their dashboard, and depending certain things specific to their logic, you're then going to fetch other particular bits of data. 

Note that I haven't done anything with loading cursors. Jake Moxey did a talk about this 

**\[demonstrate everything\]**

## Our solution

I'm going to demonstrate how you might have done this with redux-thunk, and then how you'd do it in redux saga. 

The redux structure: 

**Slide:**

- Users - fetched when the application starts
- Posts - fetched when the user is selected
- Todos - fetched when the posts are selected and they're specail
- SelectedUser - id of the current selected user

There are otherways we might structure our redux data, but that's not what we're interested in here. The point of this exercise is that we're going to keep our react appliation the same, and our redux state structure the same, we're just going to change the middle ware. 

**show react dispatching the action**

**show the action**

**show testing the actions**

Ok, but I hate this module mocking stuff. 
- Having to remember which functions are synchronous or asyncronous
- Having issues if you're calling a function within the same module (the isSpecial function was initially that way)

My testing philosophy: 
- Testing should be easy. 
- If it's easy, then developers are going to do it. 
- As a general rule, if your code isn't easy to test, then it means there's something wrong with the code. 

## As it turns out - redux-saga happens to make this easier. 

First - a bit out redux-saga

Redux saga is an implmentation of the saga pattern. 

The saga pattern deals with distributed transactions, and gives them a mechanism for rolling them back. 

eg. useful for microservices archicture, or if you're using a distributed database. 

**Slide** The classsic example is the holiday booking system. 

So that's all pretty interesting and useful - but it's not really why I like redux saga. 

I like redux saga because the redux-saga middleware utilises *generator functions*, which makes them a lot easier to test. 


### What are generator functions 

Generator functions are an ES6 feature, with the syntax function* which returns a Generator object. 

The Generator object has three function, .next(), .throw() and .return(). 

**Do demonstration.**


## Redux-Saga

**show adding it to the store**

**Refactoring** - I've changed some of the actions, but that base action that we're calling hasn't changed it's signature. 

No changes to react required.

We're making changes to the middleware only. 


**Show the new request objects**

- Convention for react dispatches vs saga dispatches. 


**Show the sagas**

Three main effects: 

- take/takeEvery (intercept action)
- put (dispatch function)
- call (call function)

- Root saga - like a root reducer, this is what got injected into the middleware
- watchSagas - responsible intercepting certain actions, and telling them which saga to use to handle it. 

- saga sagas - the actual logic. 

Lets look at our select user saga 




