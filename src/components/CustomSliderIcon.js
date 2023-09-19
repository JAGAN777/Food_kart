import {LeftArrowStyle, RightArrowStyle} from "./home/HomeStyle";
import {CustomIconButton} from "./home/food-campaign/FoodCampaign.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const HandleNext = ({ onClick, className }) => (
    <>
        <RightArrowStyle
            right="1%"
            // languageDirection={languageDirection}
            isdisabled={className?.includes('slick-disabled')}
        >
            <CustomIconButton  onClick={onClick}>
                <ArrowForwardIcon sx={{color:'#fff'}} />
                {/* <img src="/static/images/Icons/_-12.png" className="slide_arr" /> */}
            </CustomIconButton>
        </RightArrowStyle>
    </>
)
 export const HandlePrev = ({ onClick, className }) => (
    <>
      <LeftArrowStyle 
            // languageDirection={languageDirection}
            left="1%"
            isdisabled={className?.includes('slick-disabled')}
        >
        <CustomIconButton onClick={onClick}>
                {/* <ArrowBackIosNewIcon style={{width:"14px",height:"14px"}} fontWeight="700" /> */}
                <ArrowBackIcon sx={{color:'#fff'}} />
              {/* <img src="/static/images/Icons/_-10.png" className="slide_arr" /> */}
        </CustomIconButton>
      </LeftArrowStyle>
    </>
)