import { Avatar, Flex, Text, Tooltip } from "@chakra-ui/react";
import { fetchAvatar } from "../../api/avatars-api";
import { IComment } from "../../features/comments-slice";

interface ICommentProps {
  comment: IComment;
}

export const Comment = ({ comment }: ICommentProps) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Tooltip label={`Comment by user ${comment.author}`} size='sm'>
        <Avatar bg={"blue.500"} size={"sm"} src={fetchAvatar(comment.author)} />
      </Tooltip>
      <Text>{comment.body}</Text>
    </Flex>
  );
};
