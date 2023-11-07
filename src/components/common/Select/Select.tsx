import React, {ChangeEvent} from 'react';
import styled from "styled-components";



type SelectPropsType = {
    onChange: (value: string) => void
    options: string[]

}
export const Select = (props: SelectPropsType) => {
    const {options, onChange} = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.currentTarget.value)
    }

    const mapedOptions = options.map(option => {
        return (
            <OptionsStyle value={option}>{option}</OptionsStyle>
        )
    })
    return (

        <SelectStyle onChange={onChangeHandler} style={{marginTop: '4px'}}>
            {mapedOptions}
        </SelectStyle>
    );
};

const SelectStyle = styled.select`
  font-size: 16px;

  margin-left: 10px;
  background: transparent;
  color: white;
  text-transform: uppercase;
  border: none;

  &:focus {
    outline: none;
    background: transparent;
  }
`;

const OptionsStyle = styled.option`
  color: orange;
  margin-top: 5px;
  border: none;
  text-transform: uppercase;
  padding: 10px;


`;