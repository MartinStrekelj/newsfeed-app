import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { createNewPostRequest, INewPostDTO } from "../../api/posts-api";
import { Select, useToast, Textarea } from "@chakra-ui/react";

interface INewPostProps {
  users?: number[];
}

export const NewPost = ({ users }: INewPostProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [newPostData, setPostData] = useState<INewPostDTO | null>(null);

  const toast = useToast();

  const submitNewPost = async () => {
    if (newPostData === null) {
      return;
    }
    setSubmitting(true);
    await createNewPostRequest(newPostData);
    setSubmitting(false);
    toast({
      title: "Post created",
      description: "",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setPostData(null);
    onClose();
  };

  const onUserSelect = (id: string) =>
    setPostData({ userId: parseInt(id), body: "", title: "" });

  if (!users) {
    return null;
  }

  return (
    <>
      <Button w='100%' onClick={onOpen}>
        Create new post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"}>Create new post</ModalHeader>
          <ModalCloseButton isDisabled={isSubmitting} />
          <ModalBody>
            <Select onChange={(e) => onUserSelect(e.target.value)}>
              {users.map((userId) => (
                <option key={`${userId}`} value={userId}>
                  User {userId}
                </option>
              ))}
            </Select>
            {newPostData !== null && (
              <Flex direction={"column"} gap={4} my={4}>
                <Input
                  placeholder='Enter post title'
                  onChange={(e) =>
                    setPostData({ ...newPostData, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder='Enter post content'
                  onChange={(e) =>
                    setPostData({ ...newPostData, body: e.target.value })
                  }
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={submitNewPost}
              isDisabled={newPostData === null}
              isLoading={isSubmitting}
              w={"100%"}>
              Create new post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
