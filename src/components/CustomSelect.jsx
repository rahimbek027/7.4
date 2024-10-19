import React from 'react';
import { Select } from 'antd';

const CustomSelect = ({ options, placeholder, setChooseId, setIsLoading, width, setLabelValue,value }) => {
    const onChange = (value, obj) => {
        if (setIsLoading) {
            setIsLoading(true)
            value ? setTimeout(() => setChooseId(value), 1000) : setTimeout(() => setChooseId(""), 1000)
        }
        if(setLabelValue){
            setLabelValue(obj?.label)
            setChooseId(value) 
        }
    };
    return (
        <Select
            style={{ width: `${width}`, }}
            showSearch
            allowClear
            size='large'
            value={value}
            placeholder={placeholder}
            optionFilterProp="label"
            onChange={onChange}
            options={options}
        />
    )
}
export default CustomSelect;