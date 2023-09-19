import React, { memo, useEffect, useRef, useState } from 'react'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import { CategoryApi } from '../../../hooks/react-query/config/categoryApi'
import FeaturedCategoryCard from '../../featured-category-item/FeaturedCategoryCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-multi-carousel/lib/styles.css'
import CustomShimmerCategories from '../../CustomShimmer/CustomShimmerCategories'
import { useRouter } from 'next/router'
import {
    CustomStackFullWidth,
    CustomViewAll,
} from '../../../styled-components/CustomStyles.style'
import { CustomTypography } from '../../custom-tables/Tables.style'
import { settings } from './SliderSettings'
import { useTheme } from '@mui/material/styles'
import { onErrorResponse } from '../../ErrorResponse'
import { object } from 'prop-types'


const FeatureCatagories = () => { 

    const settings2 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 2,
                    infinite: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 2,
                    infinite: false,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: false,
                    // dots: true
                },
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
    
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll:1 ,
                    infinite: false,
                },
            },
        ],
    }

    const theme = useTheme()
    const { t } = useTranslation()
    const router = useRouter()
    const { global } = useSelector((state) => state.globalSettings)
    const { featuredCategories } = useSelector((state) => state.storedData)

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const earthRadius = 6371; // Radius of the Earth in kilometers
      
        const toRadians = (degrees) => {
          return degrees * (Math.PI / 180);
        };
      
        const deltaLat = toRadians(lat2 - lat1);
        const deltaLon = toRadians(lon2 - lon1);
      
        const a =
          Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(deltaLon / 2) *
          Math.sin(deltaLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadius * c;
        return distance;
      };

 const lat1 = 13.0827;
const lon1 = 80.2707;
const lat2 = 28.7041;
const lon2 = 77.1025;

const distance = calculateDistance(lat1, lon1, lat2, lon2);
console.log('Distance:', distance);



    const [featuredCategory, setFeaturedCategory] = useState([])

    // console.log('featuredCategories1', featuredCategories)

    const getFetchCategory = async () => {
        CategoryApi.categories()
            .then((res) => {
                setFeaturedCategory(res.data)
            })
            .catch((err) => {
                console.error('err', err.message)
            })
    }


    useEffect(() => {
        getFetchCategory()
    }, [])


    const sliderRef = useRef(null)
    const searchKey = ''
    
    // const { data, refetch: refetchCategories } = useQuery(
    //     ['category'],
    //     () => CategoryApi.categories(searchKey),
    //     {
    //         enabled: false,
    //         staleTime: 1000 * 60 * 8,
    //         onError: onErrorResponse,
    //         cacheTime: 8 * 60 * 1000,
    //     }
    // )
    // useEffect(() => {}, [])

    return (
        <>
          <Grid container>
                <Grid item xs={12} md={12}>
                    {featuredCategories?.length > 0 ? (
                        <Slider
                            className="slick__slider"
                            {...settings2}
                            ref={sliderRef}
                        >
                            {featuredCategories.map((categoryItem, index) => (
                                <FeaturedCategoryCard
                                    key={categoryItem?.id}
                                    id={categoryItem?.id}
                                    categoryImage={categoryItem?.image}
                                    name={categoryItem?.name}
                                    categoryImageUrl={
                                        global?.base_urls?.category_image_url
                                    }
                                    height="40px"
                                />
                            ))}
                        </Slider>
                    ) : (
                        <CustomShimmerCategories
                            noSearchShimmer="true"
                            itemCount="7"
                            smItemCount="5"
                        />
                    )}
                </Grid>
          </Grid>
        </>
    )
}

export default memo(FeatureCatagories)
