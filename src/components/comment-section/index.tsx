import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useState } from "react";
import {
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Send } from "react-feather";
import { addComment, IComment } from "../../features/comments-slice";
import { Comment } from "./comment";

interface ICommentSectionProps {
  postId: number;
}

export const CommentSection = ({ postId }: ICommentSectionProps) => {
  const [commentBody, setCommentBody] = useState<string>("");

  const comments = useSelector((state: RootState) => {
    return state.comments.comments.filter(
      (comment) => comment.postId === postId
    );
  });

  const dispatch = useDispatch();

  const submitComment = () => {
    const newComment: IComment = {
      body: commentBody,
      postId,
      author: 1,
    };
    setCommentBody("");
    dispatch(addComment(newComment));
  };

  return (
    <>
      {!!comments.length && (
        <>
          <Divider />
          <Heading size={"md"}>Comment section</Heading>
          <Flex flexDir={"column"} gap={2} pl={4}>
            {comments.map((comment, idx) => (
              <Comment comment={comment} key={`${postId}-${idx}`} />
            ))}
          </Flex>
        </>
      )}
      <Flex>
        <Input
          value={commentBody}
          flex={1}
          placeholder='Add new comment'
          variant={"flushed"}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <IconButton
          isDisabled={!commentBody.length}
          onClick={submitComment}
          variant='ghost'
          aria-label='Send email'
          icon={<Icon as={Send} />}
        />
      </Flex>
    </>
  );
};
