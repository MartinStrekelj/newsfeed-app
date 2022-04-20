import { Avatar, Flex } from "@chakra-ui/react";
import { fetchAvatar } from "../../api/avatars-api";

interface IUserFilterProps {
  users?: number[];
  filter: number[];
  handleFilter: (values: number[]) => void;
}

export const UserFilter = ({
  users,
  filter: userFilters,
  handleFilter,
}: IUserFilterProps) => {
  if (!users) {
    return null;
  }

  /**
   * Toggles the filter selection
   */
  const onFilterClick = (id: number) => {
    const isActive = userFilters.includes(id);
    let newFilters;
    if (isActive) {
      newFilters = userFilters.filter((filterId) => filterId !== id);
    } else {
      newFilters = [...new Set([...userFilters, id])];
    }
    handleFilter(newFilters);
  };

  return (
    <Flex
      my={4}
      gap={4}
      alignItems={"center"}
      justifyContent={"center"}
      flexWrap='wrap'>
      {users.map((userId) => (
        <Avatar
          bg={userFilters.includes(userId) ? "blue.500" : "gray.100"}
          size={"md"}
          onClick={() => onFilterClick(userId)}
          key={`user-${userId}`}
          name={`user-${userId}`}
          src={fetchAvatar(userId)}
        />
      ))}
    </Flex>
  );
};
