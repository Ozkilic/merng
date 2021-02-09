const Post = require('../../models/Post')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const data = await Post.find()
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
