import { create } from "apisauce";
import useSWR from "swr";

const POSTS_API = create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

const postsFetcher = (url: string) =>
  POSTS_API.get(url).then((res) => res.data as IPost[]);

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface INewPostDTO {
  title: string;
  body: string;
  userId: number;
}

export const usePosts = () => {
  const { data, error, isValidating } = useSWR<IPost[]>("/", postsFetcher);

  return {
    posts: data,
    users: data ? getUniqueUserList(data) : undefined,
    isLoading: (!error && !data) || isValidating,
    isError: error,
  };
};

export const createNewPostRequest = async (post: INewPostDTO) => {
  try {
    const response = await POSTS_API.post("/", post);
    const { data } = response.data as { data: IPost };
    return { ok: true, message: `New post created with title ${data.title}` };
  } catch (e) {
    return { ok: false, message: "Something went wrong!" };
  }
};

const getUniqueUserList = (posts: IPost[]) => {
  const uniqueSet = new Set(posts.map((post: IPost) => post.userId));
  return [...uniqueSet];
};
