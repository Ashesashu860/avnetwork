import { v4 as uuidv4 } from "uuid";

class BlogCreateModel {
  constructor(
    blogId,
    userId,
    author,
    title,
    content,
    category,
    likes,
    comments,
    ratings
  ) {
    this.id = blogId || uuidv4();
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.author = author;
    this.category = category;
    this.likes = likes;
    this.comments = comments;
    this.ratings = ratings;
  }
}

export default BlogCreateModel;
