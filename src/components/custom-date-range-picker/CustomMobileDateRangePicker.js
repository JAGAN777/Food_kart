import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {Box, Grid, TextField} from "@mui/material";
import {MobileDateRangePicker} from "@mui/lab";
import moment from "moment";


const CustomMobileDateRangePicker = props => {
    const { handleValue, minDate, maxDate, diffStartEnd} = props
    const [value, setValue] = useState([null, null]);
    const [value2, setValue2] = useState([null, null]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=>{
        if(value[0]!== null && value[1]!== null){
            handleValue?.(value)
        }

    },[value])

    const handleStartDateChange = (newValue) => {
        const endDate = moment(newValue).add(29, "days").toDate();
        setValue([newValue, endDate]);
      };


    const handleDateComponent = ()=>{
        if(minDate && maxDate){
            return <MobileDateRangePicker
                value={value}
                minDate={moment(minDate).toDate()}
                maxDate={moment(maxDate).toDate()}
                onChange={(newValue) => {
                    if(diffStartEnd){
                        if(value[0]!==value[1]){
                            setValue(newValue);
                        }
                    }
                    else{
                        setValue(newValue);
                    }

                }}
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={3}>
                        <Grid item xs={6}><TextField fullWidth {...startProps} /></Grid>
                        <Grid item xs={6}> <TextField fullWidth {...endProps} /></Grid>
                    </Grid>
                )}
            />
        }
        else{
            return <MobileDateRangePicker
                disablePast
                open={isOpen}
                value={value} 
                onChange={(newValue) => {
                    handleStartDateChange(newValue[0]);
                    // setValue(newValue)
                    if(newValue[0]){
                        setIsOpen(false);
                    }
                }}
                onOpen={()=>{
                    setIsOpen(true);
                }}
                onClose={()=>{
                    setIsOpen(false);
                }}
                startText={'Select Date'}
                renderInput={(startProps, endProps) => (
                    <Grid container spacing={3} >
                        <Grid item xs={12}><TextField fullWidth onClick={()=>setIsOpen(true)}  {...startProps}  /></Grid>
                        {/* <Grid item xs={6}> <TextField fullWidth  {...endProps} /></Grid> */}
                    </Grid>
                )}
            />
        }

    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {handleDateComponent()}
            </LocalizationProvider>

        </div>
    );
};

CustomMobileDateRangePicker.propTypes = {

};

export default CustomMobileDateRangePicker;