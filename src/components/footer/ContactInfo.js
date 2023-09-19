import React from 'react';
import {CustomStackFullWidth} from "../../styled-components/CustomStyles.style";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {useTheme} from "@mui/material/styles";

const ContactInfo = ({global}) => {
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <CustomStackFullWidth spacing={1.5} alignItems={{xs:"center",sm:"center",md:"flex-start"}} >
            <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.footerText}>
                {/* <LocalPhoneIcon/> */}
                <img src='/static/images/Icons/_-19.png' className='locat_icon'  />
                <Typography><a className='text-reset text-decoration-none address-font'  href={`tel:+91${global?.phone}`}>{global?.phone}</a></Typography>
            </Stack>    
            <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.footerText}>
                {/* <MailIcon/> */}
                <img src='/static/images/Icons/_-20.png' className='locat_icon'  />
                <Typography><a className='text-reset text-decoration-none address-font' href={`mailto:${global?.email}?subject=Subject&body=message%20goes%20here`}>{global?.email}</a></Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" color={theme.palette.text.footerText}>
                {/* <ApartmentIcon/> */}
                <img src='/static/images/Icons/_-21.png' className='locat_icon'  />
                <Typography className='address-font'>{global?.address}</Typography>
            </Stack>
        </CustomStackFullWidth>
    );
};

export default ContactInfo;
