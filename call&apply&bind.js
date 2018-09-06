//call
const person = {
  name: 'Bruce Lee',
  greeting: function (...args) {
    console.log(`${this.name} says hello to ${args}`);
  }
}

person.greeting('Chuck Norris', 'Jackie Chan');// output: Bruce Lee says hello to Chuck Norris,Jackie Chan

person.greeting.call({ name: 'James Bond' }, 'Chuck Norris', 'Jackie Chan');// James Bond says hello to Chuck Norris,Jackie Chan

//apply
const person = {
  name: 'Bruce Lee',
  greeting: function (...args) {
    console.log(`${this.name} says hello to ${args.join(', ')}`);
  }
}

person.greeting('Chuck Norris', 'Jackie Chan');// output: Bruce Lee says hello to Chuck Norris,Jackie Chan

person.greeting.apply({ name: 'James Bond' }, ['Chuck Norris', 'Jackie Chan']);// James Bond says hello to Chuck Norris,Jackie Chan

//bind
const person = {
  name: 'Bruce Lee',
  greeting: function (...args) {
    console.log(`${this.name} says hello to ${args}`);
  }
}

person.greeting('Chuck Norris', 'Jackie Chan');// output: Bruce Lee says hello to Chuck Norris,Jackie Chan

const newGreeting = person.greeting.bind({ name: 'James Bond' }, 'Chuck Norris', 'Jackie Chan');// James Bond says hello to Chuck Norris,Jackie Chan

newGreeting();