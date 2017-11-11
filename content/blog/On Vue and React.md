---
title: "On Vue And React"
date: 2017-11-12T03:27:27+08:00
draft: true
---

Before coming into CS3216, the only JavaScript frameworks I had experience in was React. I did not foresee myself using Vue for all of my assignments. After attending a talk on Vue at a local meetup, I decided to try it out.

There are several benefits to using Vue compared to React --- but the most important one is developer happiness. Choosing the right tool is especially important in CS3216, where you do not have enough time to learn a new framework for every assignment.

This article aims to compare the differences between Vue and React, based off my personal experience.

Note: Vue's documentation has a [good comparison between it and React](https://vuejs.org/v2/guide/comparison.html). If you haven't read that, I suggest reading that first, then coming back here.

# Introduction

First off, Vue has excellent documentation. Anyone familiar with the MVC architectural pattern can pick it up in an hour, and use it effectively within a few days.

If you haven't used React or Vue before, here is a quick comparison on how a simple counter component looks like in each of them.

### React
```js
import React from 'react'

class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.increment = this.increment.bind(this)
  }

  increment () {
    this.setState({ counter: this.state.counter + 1 })
  }

  render () {
    return (
      <div>
        <p>{this.state.counter}</p>
        <button style={styles.button} onClick={this.increment}>
          +1
        </button>
      </div>
    )
  }
}

const styles = {
  button: {
    borderRadius: 5,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  }
}

export default Counter
```

### Vue
```html
<template>
  <div>
    <p>{{ counter }}</p>
    <button class="button" @click="increment">
      +1
    </button>
  </div>
</template>

<script>
export default {
  name: 'counter',

  data () {
    return {
      counter: 0
    }
  },

  methods: {
    increment () {
      this.counter++
    }
  }
}
</script>

<style scoped>
.button {
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
```

The Vue component looks much cleaner, and is easier to understand as someone with only experience in vanilla JavaScript, HTML and CSS. While you can get used to reading React components pretty quickly, just comparing it to Vue's components makes you realise how much better it can be.

# Vue and React

## State Management

While React doesn't bundle with itself a state management system, most people use either [Redux](https://github.com/reactjs/redux) or [MobX](https://mobx.js.org/).

Redux is a beautiful implementation of the Flux architecture. However, there are some micro-optimisations the developer has to make to prevent unnecessary re-renders.

MobX requires less boilerplate to use, but uses [property decorators](https://github.com/tc39/proposal-decorators), which is currently still a Stage 2 proposal, and might be unfamiliar syntax to JavaScript developers.

While both of these libraries are not associated with React, they have bindings to make them easier to use with React.

Vue, on the other hand, has [Vuex](http://vuex.vuejs.org). Vuex is a state management library for Vue. It works with Vue's devtools extension and provides time-travel debugging and state export/import. Because it tightly integrates with Vue, and feels completely natural to use with Vue.


## JSX is not HTML
React uses JSX for declaring components. For those unfamiliar, JSX is an extension to JavaScript that allows you to write HTML-ish syntax that transpiles to `React.createElement()` calls. It makes it very simple to write declarative code. You don't even need to leave the JavaScript universe!

However, JSX only *looks* like HTML. It's not HTML. There is a mental overhead from context switching that you incur while developing. If you forget that JSX isn't HTML while developing, you'll face some issues:

- JSX uses camelCase, but HTML is case-insensitive. The `onClick` attribute, for example, differs from HTML's `onclick` attribute. React warns you if you do it incorrectly, but you might only notice it after spending some time debugging.

- Because of some legacy decisions related to `class` being a keyword in JavaScript, you have to use `className` to define the class attribute in your JSX component. (you *kind of* can use `class` in [React 16](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html), but it's not advised. [Preact](https://github.com/developit/preact), an alternative to React, allows and prefers you to use `class` instead.)

Vue's solution to single-file components is cleaner: separate HTML, JavaScript, and CSS blocks, but in a single file. If you've used Angular before, it's similar, but Vue bundles the templates and component code in a single `.vue` file.

By not relying on JSX, Vue supports any preprocessors that compile down to HTML, JavaScript, or CSS, such as Pug, CoffeeScript, SASS, Stylus, etc. In fact, this is a valid Vue component:

```html
<template lang="pug">
  div
    p {{ counter }}
    button.button(@click="increment") +1
</template>

<script lang="coffee">
export default
  name: 'counter'
  data: -> counter: 0
  methods:
    increment: -> this.counter++
</script>

<style lang="stylus">
.button
  border-radius 5px
  box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
</style>
```


## Styling

There are many different ways to style a component in React. The pure React way to do this is by using inline styles. That's funny; wasn't CSS meant to separate semantics (HTML) from rendering logic (CSS) in the first place?

Inline styles in React are extracted by [webpack](https://webpack.github.io) into a separate CSS file, so there is no noticeable performance difference from using pure CSS. However, inline styles sacrifice some flexibility, such as media queries and CSS animations.

There are, however, several alternatives to using inline styles which overcome these compromises:

- Radium
- CSS modules
- Styled Components

As with state management, React doesn't have one specific way to do styling. How you style your applications depend on which method your project chooses.

Vue styles components using global or scoped CSS. Vue is more opinionated --- styles are done with CSS, state management with Vuex, routing with vue-router. This reduces the number of decisions developers need to make when starting a new project, and number of things a team needs to learn.


# Why React, then?

React Native. For native applications, there is no good alternative to React Native. With Vue, you can use either Weex or NativeScript, but they have such a small user base that you'll have to solve any problems you encounter yourself. You only need to learn React once, and you can use it everywhere (there's even [React VR](https://facebook.github.io/react-vr/), for creating VR apps).

Since Vue is less mature than React, it naturally has a smaller ecosystem of plugins and tools. To me, this is Vue's only downside. However, Vue's documentation makes it very easy for developers to write custom components and plugins (I wrote a wrapper of a vanilla JS plugin for our final assignment). As time goes on, Vue's ecosystem should be large enough for most use cases.

# Conclusion

In conclusion, while there are some reasons for using React, Vue is a better choice for most other cases. Chasing frameworks isn't a good thing to do, but I feel Vue has enough advantages that learning it is worth the time. Vue is a beautiful framework and I enjoy working with it. If you're currently working with React, I strongly suggest trying Vue out in a weekend project.

<small>Note: This is mostly from my experience --- do let me know if anything is incorrect.</small>