import '/__/firebase/8.8.1/firebase-app.js'
import '/__/firebase/8.8.1/firebase-database.js'

import { html, render } from 'https://unpkg.com/lit/index.js?module'
import { asyncAppend } from 'https://unpkg.com/lit/directives/async-append.js?module'

const URLs = {
  FIREBASE_DATABASE: 'https://hacker-news.firebaseio.com',
  HACKER_NEWS: 'https://news.ycombinator.com',
}

const app = firebase.initializeApp({
  databaseURL: URLs.FIREBASE_DATABASE,
})
const database = firebase.database(app)

window.database = database

// DOM elements
const form = document.querySelector('form')
const output = document.querySelector('output')

// Lit HTML template
const template = (stories) => html`
  <ul>
    ${asyncAppend(stories, (story) => html`
      <li>
        <a
          class="title"
          href="${story.url}"
          target="_blank"
        >
          ${story.title}
        </a>
      <br>
      ${story.score} points,
      <a
        href="${story.commentsUrl}"
        target="_blank"
      >
        ${story.descendants ?? 0} comment${story.descendants === 1 ? '' : 's'}
      </a>
    </li>
  `)}
  </ul>
`

// Helper function to get a snapshot value from Firebase
async function getSnapshot(path, limit) {
  const ref = database.ref(`v0/${path}`)
  const snapshot = await (limit ? ref.limitToFirst(limit) : ref).get()
  return snapshot.val()
}

// Get a list of story IDs from the Hacker News API
async function* getStories({ type, limit }) {
  const ids = await getSnapshot(type, limit)
  for (const id of ids) {
    yield getStory(id)
  }
}

// Get full data for one story from the Hacker News API
async function getStory(id) {
  const story = await getSnapshot(`item/${id}`)
  story.commentsUrl = new URL(URLs.HACKER_NEWS)
  story.commentsUrl.pathname = 'item'
  story.commentsUrl.searchParams.set('id', id)
  return story
}

// Get user options from the form
function getUserOptions(form) {
  const formData = new FormData(form)
  const limit = parseFloat(formData.get('count')) || 20
  const type = formData.get('type') || 'topstories'
  return { limit, type }
}

// Get and render stories on form submission
function submit(event) {
  event.preventDefault()
  const options = getUserOptions(form)
  const stories = getStories(options)
  render(template(stories), output)
}

try {
  form.addEventListener('submit', submit)
  form.dispatchEvent(new Event('submit'))
} catch ({ message }) {
  console.log(message)
}
