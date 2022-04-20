import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search } from "react-feather";

interface ISearchBarProps {
  handleQuery: (query: string) => void;
}

export const SearchBar = ({ handleQuery }: ISearchBarProps) => {
  return (
    <InputGroup size={"lg"}>
      <InputLeftElement
        pointerEvents='none'
        children={<Icon as={Search} w={6} h={6} />}
      />
      <Input
        size={"lg"}
        onChange={(e) => handleQuery(e.target.value)}
        placeholder='Search for your posts'
      />
    </InputGroup>
  );
};
