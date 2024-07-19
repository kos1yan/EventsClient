import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface SearchProps {
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function Search({ placeholder, value, onChange }: SearchProps) {
    return (
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
            <Search2Icon />
            </InputLeftElement>
            <Input type='text' defaultValue={value} placeholder={placeholder} borderWidth={2} onChange={onChange}/>
        </InputGroup>
    )
}