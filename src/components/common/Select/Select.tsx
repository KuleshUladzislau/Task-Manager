import React, {ChangeEvent} from 'react';
import {PriorityType} from "../../Task/hook/useTasks";
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
  padding: 10px;
  background: transparent;
  border-top:none;
  border-left: none;
  border-right: none;
  border-bottom:none;
  color: white;
  appearance: none;

  &:focus {
    outline: none;
    border-top:none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid orange;
`
const OptionsStyle = styled.option`
  background: red;
`