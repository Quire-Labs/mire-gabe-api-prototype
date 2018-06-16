const { buddyList, messages, posts, news } = require('./data.js')

const CURRENT_USER_ID = 1;

function getBuddyList(req, res) {
  res.send(buddyList)
}

function getBuddy(req, res) {
  const buddyId = req.params.id
  const buddy = getBuddyForId(buddyId)
  res.send(buddy)
}

function getBuddyForId(id) {
  return findInListWithKeyValue(buddyList, 'id', id) || errorBuddyNotFound()
}

function getMessagesForBuddy(req, res) {
  const buddyId = req.params.buddyId
  const messageList = messages[buddyId] || []
  res.send(messageList)
}

function findInListWithKeyValue(list, key, value) {
  for (let item of list) {
    if (item[key] == value) {
      return item
    }
  }
  return null
}

function errorBuddyNotFound() {
  return errorWithMessage("Buddy not found.")
}

function getPosts(req, res) {
  var enhancedPosts = [ ... posts ]
  enhancedPosts = enhancePosts(enhancedPosts)
  res.send(enhancedPosts)
}

function enhancePosts(posts) {
  for (let post of posts) {
    post = enhancePost(post)
  }
  return posts
}

function enhancePost(post) {
  post.author = enhanceAuthor(post.author)
  post.comments = enhanceComments(post.comments)
  return post
}

function enhanceAuthor(author) {
  var author = getBuddyForId(author)
  if (author.error) {
    author = { id: 0, name: 'Unknown' }
  }
  return author
}

function enhanceComments(comments) {
  for (let comment of comments) {
    comment.author = enhanceAuthor(comment.author)
  }
  return comments
}

function getPost(req, res) {
  const id = req.params.id
  var post = { ... findInListWithKeyValue(posts, 'id', id) || errorPostNotFound() }
  if (post.error) {
    res.send(post)
    return
  }
  res.send(enhancePost(post))
}

function errorPostNotFound() {
  return errorWithMessage("Post not found")
}

function getPostsForTopic(req, res) {
  const topic = req.params.topic
  var enhancedPosts = [ ... posts ]
  enhancedPosts = enhancePosts(enhancedPosts)
  var filteredPosts = []
  for (let i in enhancedPosts) {
    const tags = enhancedPosts[i].tags
    if (tags.indexOf(topic) > -1) {
      filteredPosts.push(enhancedPosts[i])
    }
  }
  res.send(filteredPosts)
}

function deleteFromList(list, index) {
  list.splice(index, 1)
  return list
}

function getCommentsForPost(req, res) {
  const postId = req.params.postId
  const post = findInListWithKeyValue(posts, 'id', postId) || errorPostNotFound()
  if (post.error) {
    res.send(post)
    return
  }
  const comments = post.comments
  res.send(comments)
}

function getLatestNews(req, res) {
  res.send(news)
}

function getNewsForTopic(req, res) {
  const topic = req.params.topic
  var sendNews = []
  for (let article of news) {
    if (article.topic === topic) {
      sendNews.push(article)
    }
  }
  res.send(sendNews)
}

function postMessageToPerson(req, res) {
  const personId = req.params.buddyId
  const body = req.body
  if (personId == CURRENT_USER_ID) {
    res.send(errorCantSendSelfMessage())
    return
  }
  var messagesToPerson = messages[personId]
  if (messagesToPerson === undefined) {
    res.send(errorBuddyNotFound())
    return
  }
  const text = req.body.message
  if (!text) {
    res.send(errorNoMessageText())
    return
  }
  messagesToPerson.push(newMessageWithText(text))
  res.send(responseSuccess())
}

function errorCantSendSelfMessage() {
  return errorWithMessage("You can't send yourself a message you idiot.")
}

function errorWithMessage(message) {
  return { error: message }
}

function newMessageWithText(text) {
  return {
    sender: CURRENT_USER_ID,
    message: text
  }
}

function responseSuccess() {
  return { result: 'success' }
}

function errorNoMessageText() {
  return errorWithMessage("No 'message' key")
}

function newUser(req, res) {
  const body = req.body
  const name = body.name
  if (!name) {
    res.send(errorNoName())
    return
  }
  const nextId = getMaxBuddyId() + 1
  buddyList.push(newBuddy(nextId, name))
  res.send(responseSuccess())
}

function errorNoName() {
  return errorWithMessage("No 'name' key")
}

function getMaxBuddyId() {
  var max = 0
  for (let buddy of buddyList) {
    max = Math.max(max, buddy.id)
  }
  return max
}

function newBuddy(id, name) {
  return {
    id: id,
    name: name
  }
}

function postCommentForPost(req, res) {
  const body = req.body
  const postId = req.params.postId
  const post = findInListWithKeyValue(posts, 'id', postId) || errorPostNotFound()
  if (post.error) {
    res.send(post)
    return
  }
  const buddyId = CURRENT_USER_ID
  const text = body.text
  if (!text) {
    res.send(errorNoText())
    return
  }
  post.comments.push(newComment(buddyId, text))
  res.send(responseSuccess())
}

function errorNoText() {
  return errorWithMessage("No 'text' key")
}

function newComment(userId, text) {
  return {
    author: userId,
    message: text
  }
}

function postBuddyRequest(req, res) {
  const id = req.params.id
  const buddy = findInListWithKeyValue(buddyList, 'id', id) || null
  if (buddy !== null) {
    res.send(errorAlreadyBuddies())
    return
  }
  buddyList.push(newBuddy(id, randomName()))
  res.send(responseSuccess())
}

function errorAlreadyBuddies() {
  return errorWithMessage("You're already friends with that person you idiot!")
}

function randomName() {
  return randomFirstName() + ' ' + randomLastName()
}

function randomFirstName() {
  return randomNameFromList(['Patricia', 'Jennifer', 'Linda', 'Elizabeth',
    'Barbara', 'Susan', 'Jessica', 'Sarah', 'Margaret', 'Karen', 'Nancy',
    'Lisa', 'Betty', 'Dorothy', 'Sandra', 'Ashley', 'Kimberly', 'Donna',
    'Emily', 'James', 'John', 'Robert', 'Michael', 'William',
    'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel',
    'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew'])
}

function randomLastName() {
  return randomNameFromList(['Smith', 'Johnson', 'Williams', 'Jones', 'Brown',
    'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas',
    'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez',
    'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall',
    'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott',
    'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter'])
}

function randomNameFromList(names) {
  return names[Math.floor(Math.random() * names.length)]
}

function postPost(req, res) {
  const postId = getMaxPostId() + 1
  const author = CURRENT_USER_ID
  const body = req.body
  if (!body) {
    res.send(errorNoBody())
    return
  }
  if (!body.tags || body.tags.length == 0) {
    res.send(errorNoTags())
    return
  }
  const tags = body.tags
  if (!body.message) {
    res.send(errorNoMessageText())
    return
  }
  const message = body.message
  const link = body.link
  const parentPost = body.parentPost
  posts.push(newPost(postId, author, tags, message, link, parentPost))
  res.send(responseSuccess())
}

function getMaxPostId() {
  var max = 0
  for (let post of posts) {
    max = Math.max(max, post.id)
  }
  return max
}

function errorNoBody() {
  return errorWithMessage("No body sent")
}

function errorNoTags() {
  return errorWithMessage("You gotta give a list of tags, man.")
}

function newPost(id, author, tags, message, link, parentPost) {
  return {
    id: id,
    author: author,
    tags: tags,
    message: message,
    link: link,
    parentPost: parentPost,
    comments: []
  }
}

module.exports = function(app) {
  app.route('/buddy/list')
    .get(getBuddyList)
  app.route('/buddy/:id')
    .get(getBuddy)
  app.route('/buddy/request/:id')
    .post(postBuddyRequest)
  app.route('/user')
    .post(newUser)
  app.route('/messages/:buddyId')
    .get(getMessagesForBuddy)
    .post(postMessageToPerson)
  app.route('/post/list')
    .get(getPosts)
  app.route('/post/:id')
    .get(getPost)
  app.route('/post')
    .post(postPost)
  app.route('/post/topic/:topic')
    .get(getPostsForTopic)
  app.route('/comments/:postId')
    .get(getCommentsForPost)
    .post(postCommentForPost)
  app.route('/news/latest')
    .get(getLatestNews)
  app.route('/news/:topic')
    .get(getNewsForTopic)
}
