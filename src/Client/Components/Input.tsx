import {useEffect, useState} from "react";

interface IProps {
    initialValue: string;
    type: string;
    onChange: (value: string) => void;
    onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (props: IProps) => {
    const [currentValue, setCurrentValue] = useState(props.initialValue)

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.preventDefault();
        setCurrentValue(e.currentTarget.value);
    }

    useEffect(() => {
        props.onChange(currentValue);
    }, [currentValue]);

    return <input type={props.type}
                  value={currentValue}
                  onChange={onChangeEvent}
                  onKeyDown={e => props.onKeydown?.(e)}/>
}

export default Input;