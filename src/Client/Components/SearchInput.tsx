import React from "react";
import Input from "./Input";

interface IProps {
    initialValue: string;
    onChange: (value: string) => void;
    timeoutMs?: number;
}

let hook: NodeJS.Timeout | null = null;

const SearchInput = (props: IProps) => {
    const onChange = (value: string) => {
        if (hook) {
            clearTimeout(hook);
        }
        hook = setTimeout(() => onTimeout(value), props.timeoutMs ?? 500);
    }

    const onTimeout = (value: string) => {
        props.onChange(value);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value);
    }

    return <Input type="text"
                  initialValue={props.initialValue}
                  onKeydown={onKeyDown}
                  onChange={onChange}/>
}

export default SearchInput;