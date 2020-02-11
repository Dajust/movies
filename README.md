# movies

## How to run the code

First install dependencies. From the root, run `yarn install` or `npm install`. After installing, start the app by running `yarn dev` or `npm run dev`. The app will be running on `http://localhost:3000`.

## Explanation of architecture

The code is written in a very basic React Hooks architecture. Using `emotion`, the app is styled with the `css-in-js` architecture.

## If you had more time, what would you like to improve?

A lot, but let me mention the very obvious.

- Because we are rendering 1000 movies in a single view, the `movies table` is not performant and thus needed to be properly optimized. I could have done that by either paginating the table, or/and using `react-window` - React components for efficiently rendering large lists and tabular data.
- Also, the Chat needed to auto-scroll down when texting overflows the chat window.
- For some reason, the Chat input keeps shifting some pixels after the first chat is sent, I didn't have enough time to investigate that.
