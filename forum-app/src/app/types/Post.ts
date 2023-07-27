interface Post {
    _id: string,
    title: string,
    content: string,
    author: string,
    authorName: string,
    comments: Comment[],
}

interface PostForm {
    title: string,
    content: string,
    author: string
}

interface EditForm {
    title: string,
    content: string
}

interface Comment {
    username: string,
    comment: string
}

export {
    Post,
    PostForm,
    EditForm,
    Comment
}