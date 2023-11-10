# Pup-E-Picker

## This project is a part of the curriculum of the coaching program I am working through at the moment. Please read the instructions I was given below.<br />

In this assignment we will be building a dog-favoriting app called Pup- E-Picker. This app will allow users to... <br />

- add dogs to a list of favorites <br />
- remove dogs from the list of favorites <br />
- create new dogs for the system <br />
- delete dogs from the system <br />

## Learning Objectives <br />

In order to complete this assignment, a student should be able to... <br />

- use array states to store data from a server <br />
- make `GET` requests to a server to retrieve data <br />
- make `POST` requests to a server to create data <br />
- make `DELETE` requests to a server to delete data <br />
- make `PATCH` requests to a server to update data <br />
- use `onSubmit` handlers to make form submissions <br />
- using helper functions to clean up your fetch calls <br />
- pass down state setters in order to change the state of a parent component <br />
- set up application state correctly <br />
- use loading states to prevent errors and make user experience better <br />
- use `useEffect` to trigger code when a component mounts in a functional component <br />
- use `componentDidMount` to trigger code when a component mounts in a class component <br />
- use a controlled form to submit data to the server <br />
- use `children` to create a Layout Component <br />
- use `react-hot-toast` to create toast notifications <br />

## Setup <br />

To get this project setup, you should: <br />

- Run `npm i` to install all dependencies <br />
- Run `npm run dev` to run the project <br />
- Run `npm run serve` to run the server <br />
- Run `npm run seed` to seed the server <br />
- Run `npm run serve:slow` to run the server with a delay on all requests <br />
  - This is useful for testing loading states <br />

## Standard Requirements <br />

- Setup eslint <br />
- Pass all linting checks <br />

- To check if linting passes, run `npm run lint` <br />

- Format code with prettier <br />
- State should not be duplicated <br />
- Variables should be named logically <br />
- No unnecessary console logs <br />
- No commented out blocks of code (Code comments are fine) <br />
- Setup a github repository with your submission as the `main` branch, you will submit a link to this for grading (NOT A ZIP FILE) <br />

## Typescript-Specific Requirements <br />

- pass **ALL** type checks <br />
  - Check by running `npm run typecheck` <br />
- DON'T USE `any`.... OR ELSE <br />
- Keep your types clean and in a logical location <br />
- Prop Types for components should be collocated with their components <br />
- Shared types should live in a file that says `types` somewhere in it's name <br />
  - example: `types.ts` should work fine <br />
- Unshared types should live in the component they are used in <br />

## Example Of Correct Code <br />

You can play around with the correct deployed version of this code using [This Deployed Version of The App](https://pup-e-picker-live-frontend.vercel.app/) <br />

Note: It's not a perfect mapping to what you're going to build, below highlights the difference between the deployed version and what you are going to build. <br />

- The deployed version has three buttons in the Section components that you won't have to worry about, we will leave in the something similar that should allow you to easily switch between working on your class app and your functional app. <br />

![Links you won't have](./public/links-you-wont-have.png) <br />

- The deployed version has a reseed command that you will not have to worry about <br />
  - It was necessary so that way everyone viewing it could own their own data, but you will not need to worry about this <br />

## Showing the Correct Component <br />

- place `FunctionalDogs` inside of the `.content-container` div of the `FunctionalSection` component **using React Children** <br />
- place `FunctionalCreateDogForm` inside of the `.content-container` div of the `FunctionalSection` component **using React Children** <br />
- place `ClassDogs` inside of the `.content-container` div of the `ClassSection` component **using React Children** <br />
- place `ClassCreateDogForm` inside of the `.content-container` div of the `ClassSection` component **using React Children** <br />

## Navigation <br />

You should use conditional rendering to show different components inside of the `(Class | Functional)Section` components using react children. The specifications are as follows... <br />

### when no tab is active <br />

- show the `(Functional | Class)Dogs` component <br />
- the dogs we can see should be ALL OF THE DOGS FETCHED <br />

### when the `favorited` tab is active <br />

- shows the `(Functional | Class)Dogs` component <br />
- the dogs we can see should be ONLY THE DOGS WHERE `isFavorite` IS TRUE <br /<br />>

### when the `unfavorited` tab is active <br />

- should show the `Dogs` component <br />
- the selected dogs should be ONLY THE DOGS WHERE `isFavorite` IS FALSE <br /<br />>

### when the create dog tab is active <br /<br />>

- should show the `(Functional | Class)CreateDogForm` component <br /<br />>
- should not show the `Dogs` component <br /<br />>

### Tabs <br />

- Should be black when active (You can add the `active` class to it to style an active tab correctly) <br />
- Should be white when inactive <br />
- Only zero - one tab should be active at a time <br />
- Clicking on a tab should make it active and make all other tabs inactive <br />
- Clicking an Active Tab should make it inactive <br />

## Interacting With the API<br />

- When the component loads, you should fetch all of the dogs from the server and store them in state <br />
- When you click on a gray heart, it should turn red and the dog's `isFavorite` property should be set to `true` in the database <br />
- When you click on a red heart, it should turn gray and the dog's `isFavorite` property should be set to `false` in the database <br />
- When you click on the trash icon, it should delete the dog from the database and show the updated list of dogs <br />
- When you create a dog, it should be added to the database <br />

## Organizing your fetch calls <br />

- You should have a file called `api.ts` with a request object that contains all of your fetching functions <br />
- These can and should be shared to both your class components and your functional components as needed <br />
- `getAllDogs` should return a promise that resolves to an array of all the dogs in the database <br />
- `postDog` should take in a partial dog object, and return a promise that resolves to the dog object that was created <br />
  - Note: Don't provide an id with the body of your request, the server will create an id for you <br />
- `updateDog` should take in a partial dog object, and return a promise that resolves to the dog object that was modified <br />
- `delete` should take in a number, delete the dog with that id, and return a promise <br />

- We STRONGLY recommend you TEST these functions before you stress out about actually using them <br />
- For example, MAKE SURE `getAllDogs` works before trying to use it in your components to render things on the page <br />
- To do this, you can visit `/playground` in your browser and write some code in the `messAround` function located in the `Playground.tsx` file. To trigger your code, just press the button. <br />

## Interacting With Fetch Calls <br />

- When the component loads, you should fetch all of the dogs from the server and store them in state <br />
- That state should be used to render all the appropriate `DogCards` on the page <br />
- Dogs where isFavorite is true should have a red heart <br />
- Dogs where isFavorite is false should have a gray heart <br />
- Clicking a gray heart on a dog should turn it red and update the database to set `isFavorite` to `true` <br />
- Clicking a red heart on a dog should turn it gray and update the database to set `isFavorite` to `false` <br />
- Clicking the trash icon on a dog should delete it from the database and update the list of dogs on the page <br />
- Creating a dog should add it to the database and update the list of dogs on the page <br />

## Loading States <br />

If the data is still loading then... <br />

- [ ] All inputs should be disabled <br />
- [ ] Buttons should be disabled <br />

## What happens when you submit the form <br />

- [ ] When you submit the form, it should create a new dog in the database <br />
- [ ] If you navigate to the `all` tab, you should see the new dog in the list of dogs <br />
- [ ] If you navigate to the `favorited` tab, you should NOT see the new dog in the list of dogs <br />
- [ ] If you navigate to the `unfavorited` tab, you should see the new dog in the list of dogs <br />
- [ ] After the submission the form should be cleared, and the select should return to the default <br />
- [ ] After submitting a toast notification from `react-hot-toast` should appear saying "Dog Created" <br /> #
