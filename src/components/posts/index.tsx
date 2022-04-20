import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { IPost } from "../../api/posts-api";

import { Post } from "./post";

interface IPostsListProps {
  posts?: IPost[];
}

const POSTS_PER_PAGE = 10;

const checkIfMorePosts = (current: number, all: number) => current < all;

export const PostsList = ({ posts }: IPostsListProps) => {
  const [page, setPage] = useState<number>(1);

  /**
   * If posts update means that some filters
   * were applied so start from page 1
   */
  useEffect(() => {
    if (!posts) {
      return;
    }
    setPage(1);
  }, [posts]);

  const loadMorePosts = () => {
    if (!posts) {
      return;
    }

    const thereIsMorePosts = checkIfMorePosts(
      page * POSTS_PER_PAGE,
      posts.length
    );

    if (thereIsMorePosts) {
      setPage(page + 1);
    }
  };

  if (!posts || !posts.length) {
    return <div>No posts found</div>;
  }

  const renderPosts = () => {
    const numberOfPosts = page * POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(0, numberOfPosts);
    return paginatedPosts.map((post) => (
      <Post post={post} key={`post-${post.id}`} />
    ));
  };

  return (
    <Flex flexDirection={"column"} gap={4}>
      {renderPosts()}
      {checkIfMorePosts(page * POSTS_PER_PAGE, posts.length) && (
        <Button onClick={loadMorePosts}>Load more posts</Button>
      )}
    </Flex>
  );
};
