import { Box, Container, Heading, Spinner } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IPost, usePosts } from "./api/posts-api";
import { SearchBar, UserFilter, PostsList, NewPost } from "./components";
import { RootState } from "./features/store";

const App = () => {
  const { posts, users, isLoading, isError } = usePosts();
  const shouldBeLoading = isLoading || isError;
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | undefined>(
    undefined
  );
  const [filterUsers, setFilterUsers] = useState<number[]>([]);
  const [searchQuery, setQuery] = useState<string>("");

  const commentsCount = useSelector(
    (state: RootState) => state.comments.comments.length
  );

  const renderLoadingState = useCallback(() => {
    if (isLoading) {
      return <Spinner size={"lg"} />;
    }

    if (isError) {
      return <div>something went wrong</div>;
    }
  }, [isLoading, isError]);

  /** Handle filtering behaviour */
  useEffect(() => {
    if (shouldBeLoading || !posts) {
      setFilteredPosts(posts);
      return;
    }

    let filteredPosts = posts;
    // Apply search query search
    if (!!searchQuery.length) {
      filteredPosts = filteredPosts.filter((post) => {
        const matchesTitle = post.title
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
        const matchesBody = post.title
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
        return matchesTitle || matchesBody;
      });
    }

    // Apply user filter
    if (!!filterUsers.length) {
      filteredPosts = filteredPosts.filter((post) =>
        filterUsers.includes(post.userId)
      );
    }

    setFilteredPosts(filteredPosts);
  }, [posts, filterUsers, searchQuery]);

  return (
    <Container maxW={"container.lg"} py={[4, 8]}>
      <Box p={4} rounded='md'>
        <Heading fontSize={["2xl", "4xl", "6xl"]} mb={2}>
          Newsfeed
        </Heading>
        <Heading fontSize={["lg", "xl", "2xl"]} my={2}>
          Newsfeed is quite active today! There are already {posts?.length || 0}{" "}
          posts and {commentsCount} comments published.
        </Heading>
        <SearchBar handleQuery={(query) => setQuery(query)} />
        <UserFilter
          users={users}
          filter={filterUsers}
          handleFilter={(activeFilters) => setFilterUsers(activeFilters)}
        />
        <NewPost users={users} />
      </Box>

      {shouldBeLoading ? (
        renderLoadingState()
      ) : (
        <PostsList posts={filteredPosts} />
      )}
    </Container>
  );
};

export default App;
