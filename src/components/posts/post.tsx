import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import { fetchAvatar } from "../../api/avatars-api";
import { IPost } from "../../api/posts-api";
import { CommentSection } from "../comment-section";

interface IPostProps {
  post: IPost;
}

const HARDCODED_DATE = "October 8th, 15.34 PM";

export const Post = ({ post }: IPostProps) => {
  return (
    <Flex
      w={"100%"}
      minH={200}
      shadow='inner'
      direction='column'
      gap={4}
      p={[4, 8]}
      rounded={"lg"}>
      <Flex alignItems={"center"} gap={2} mb={2}>
        <Avatar bg={"blue.500"} size={"md"} src={fetchAvatar(post.userId)} />
        <Flex direction={"column"} gap={1}>
          <Text fontWeight={800}>Post by User {post.userId}</Text>
          <Text color={"gray.500"}>{HARDCODED_DATE}</Text>
        </Flex>
      </Flex>
      <Heading fontSize={["md", "lg", "xl"]}>{post.title}</Heading>
      <Text fontFamily={"sans-serif"}>{post.body}</Text>

      <CommentSection postId={post.id} />
    </Flex>
  );
};
