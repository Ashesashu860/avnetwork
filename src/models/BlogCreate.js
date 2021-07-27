import { v4 as uuidv4 } from "uuid";

class BlogCreateModel {
  constructor(userId, author, content, category) {
    this.id = uuidv4();
    this.userId = userId;
    this.content = content;
    this.author = author;
    this.likes = 0;
    this.liked = false;
    this.ratings = 0;
    this.category = category;
  }
}

export default BlogCreateModel;
