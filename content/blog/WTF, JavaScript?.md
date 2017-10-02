---
title: "WTF, JavaScript?"
date: 2017-10-02T23:15:34+08:00
tags:
  - CS3216
  - NUS
---

JavaScript is a pain. It's a pain every web developer has to endure (even if you use something like Kotlin or Dart, you'll still need to understand what happens under the hood).

It's quick to develop in, but there are some quirks that can catch you off guard. You can partially mitigate this by using a proper linter and [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), but it'll still bite you when you least expect it.

Consider this snippet of code, meant to extract a field from an API's response.
```js
// This is the response from the API.
const data = `{
  "first_name": "John",
  "last_name": "Smith",
  "fb_id": 11111111111111111
}`

// We parse it as JSON and extract the `fb_id` field.
const { fb_id: fbId } = JSON.parse(data)
```
It looks like reasonable, right? But is it *correct*? Let's check.
```js
console.log(fbId === 11111111111111111)
// Prints `true`

console.log(fbId)
// Prints `11111111111111112` Huh?
```
Wait, what?

To understand this, you need to know that JavaScript stores all numbers as a double precision float. Here's an image from Wikipedia to help me explain better.

![IEEE 754 Double Floating Point Format](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/IEEE_754_Double_Floating_Point_Format.svg/927px-IEEE_754_Double_Floating_Point_Format.svg.png)

When your number is larger than `Number.MAX_SAFE_INTEGER` (2<sup>53</sup>-1) or smaller than `Number.MIN_SAFE_INTEGER` (-(2<sup>53</sup>-1)), it can't be properly represented in a 64-bit float, because all the bits can't fit in the fraction component.

This means that if you have a number outside that range, you can't safely represent it as an integer in JavaScript. It might be stored correctly, but it might also not be. In general, just don't use `Number` to store huge numbers.

Because this rounding problem only occurs for some numbers, the bug it caused only affected some users, and was difficult to reproduce. In hindsight, a Facebook ID shouldn't be stored as a BigInt anyway, because it's returned to us by the Graph API as a string.

If you want to know more about JavaScript and its beauty, here's a talk by Gary Bernhardt, [Wat](https://www.destroyallsoftware.com/talks/wat), and a collection of examples, [wtfjs](https://github.com/denysdovhan/wtfjs).
