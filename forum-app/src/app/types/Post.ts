interface Post {
    _id: String,
    title: String,
    content: String,
    author: String,
    authorName: String,
    comments: Comment[],
}

interface postForm {
    title: String,
    content: String,
    author: String
}

interface Comment {
    username: string,
    comment: string
}

export {
    Post,
    postForm
}