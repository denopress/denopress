import { Database } from "./../util/database.ts";
import { BaseModel } from "./base_model.ts";
import { user } from "./option/user.ts";
import { post } from "./option/post.ts";

export function createModelMap(db: Database): {[key: string]: BaseModel} {
  const userModel = new BaseModel(user, db);
  const postModel = new BaseModel(post, db);
  return {
    user: userModel,
    post: postModel,
  }
}