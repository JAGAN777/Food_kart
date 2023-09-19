import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Container from '@mui/material/Container'

import { useWishListGet } from '../../hooks/react-query/config/wish-list/useWishListGet'
import { setWishList } from '../../redux/slices/wishList'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryPlace from '../navbar/DeliveryPlace'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import ManageSearch from '../navbar/second-navbar/ManageSearch'
import { useRouter } from 'next/router'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import PushNotificationLayout from '../PushNotificationLayout'
import { onErrorResponse, onSingleErrorResponse } from '../ErrorResponse'
import { useQuery } from 'react-query'
import { BannerApi } from '../../hooks/react-query/config/bannerApi'
import { CategoryApi } from '../../hooks/react-query/config/categoryApi'
import { CampaignApi } from '../../hooks/react-query/config/campaignApi'
import {
    MostReviewedApi,
    PopularFoodNearbyApi,
} from '../../hooks/react-query/config/productsApi'
import { RestaurantsApi } from '../../hooks/react-query/config/restaurantApi'
import FeatureCatagories from './featured-categories/FeatureCatagories'
import FoodCampaign from './food-campaign/FoodCampaign'
import BestReviewedFood from './food-campaign/best-reviewed-foods/BestReviewedFood'
import PopularResturant from './PopularResturant'
import NearbyPopularFood from './new-popular-food/NearbyPopularFood'
import Restaurant from './Restaurant'
import Cuisines from './cuisines'
import HeroSectionWithSearch from './hero-section-with-search'
import CustomContainer from '../container'
import ProductSearchPage from '../products-page/ProductSearchPage'
import Banner from './Banner'
import Products from '../products-page/Products'
import {
    setBanners,
    setBestReviewedFood,
    setCampaignFoods,
    setPopularFood,
} from '../../redux/slices/storedData'


function checkElementLocation() {
    const $window = window;
    const bottom_of_window = $window.pageYOffset + $window.innerHeight;
  
    const elements = document.querySelectorAll('.elem');
    elements.forEach((element) => {
      const $that = element;
      const bottom_of_object = $that.offsetTop + $that.offsetHeight;
  
      // If the element is in the viewport, add the animate class
      if (bottom_of_window > bottom_of_object) {
        element.classList.add('fade-in');
      }
    });
  }  

const Homes = ({ configData }) => {
    const [fetchedData, setFetcheedData] = useState({})
    const router = useRouter()
    const { query, page, restaurantType } = router.query
    const { campaignFoods, banners, bestReviewedFoods, popularFood } =
        useSelector((state) => state.storedData)

    const dispatch = useDispatch()
    const onSuccessHandler = (response) => {
        setFetcheedData(response)
        dispatch(setWishList(fetchedData))
    }
    const { refetch } = useWishListGet(onSuccessHandler)
    let getToken = undefined
    if (typeof window !== 'undefined') {
        getToken = localStorage.getItem('token')
    }
    useEffect(() => {
        if (getToken) {
            refetch().then()
        }
    }, [getToken, fetchedData])

    // useEffect(() => {
    //     checkElementLocation();
    //     window.addEventListener('scroll', checkElementLocation);
    //     return () => {
    //       window.removeEventListener('scroll', checkElementLocation);
    //     };
    //   }, []);
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    let zoneid = undefined
    if (typeof window !== 'undefined') {
        zoneid = localStorage.getItem('zoneid')
    }
    const { data, refetch: refetchBannerData } = useQuery(
        ['banner-image'],
        BannerApi.bannerList,
        {
            enabled: false,
            staleTime: 1000 * 60 * 8,
            onError: onSingleErrorResponse,
        }
    )

    useEffect(() => {
        const handleScroll = () => {
          const pageTop = window.pageYOffset || document.documentElement.scrollTop;
          const pageBottom = pageTop + window.innerHeight;
          const tags = document.querySelectorAll(".fadein");
          
          tags.forEach((tag) => {
            if (tag.offsetTop < pageBottom) {
              tag.classList.add("visible");
            } else {
              tag.classList.remove("visible");
            }
          });
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
      

    const {
        data: campaignData,
        refetch: refetchCampaignData,
        isLoading: campaignIsloading,
    } = useQuery(['campaign'], CampaignApi.campaign, {
        enabled: false,
        onError: onSingleErrorResponse,
        staleTime: 1000 * 60 * 8,
        cacheTime: 8 * 60 * 1000,
    })
    const {
        data: mostReviewedData,
        refetch: refetchMostReviewed,
        isLoading,
    } = useQuery(['most-review-product'], MostReviewedApi.reviewed, {
        enabled: false,
        onError: onSingleErrorResponse,
    })

    const {
        isLoading: isLoadingNearByPopularRestaurantData,
        data: nearByPopularRestaurantData,
        refetch: refetchNearByPopularRestaurantData,
    } = useQuery(['popular-food'], PopularFoodNearbyApi.popularFood, {
        enabled: false,
        onError: onSingleErrorResponse,
    })
    useEffect(async () => {
        if (
            banners?.banners?.length === 0 &&
            banners?.campaigns?.length === 0
        ) {
            await refetchBannerData()
        }

        if (campaignFoods?.length === 0) {
            await refetchCampaignData()
        }
        if (bestReviewedFoods?.length === 0) {
            await refetchMostReviewed()
        }
        if (popularFood?.length === 0) {
            await refetchNearByPopularRestaurantData()
        }
    }, [])
    const iSSearchValue = false
    useEffect(() => {
        if (campaignData?.data) {
            dispatch(setCampaignFoods(campaignData?.data))
        }
        if (data) {
            dispatch(setBanners(data?.data))
        }
        if (mostReviewedData) {
            dispatch(setBestReviewedFood(mostReviewedData?.data?.products))
        }
        if (nearByPopularRestaurantData) {
            dispatch(
                setPopularFood(nearByPopularRestaurantData?.data?.products)
            )
        }
    }, [campaignData, data, mostReviewedData, nearByPopularRestaurantData])
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])
    return (
        <>
            {/* <PushNotificationLayout> */}
                {/* <DeliveryPlace /> */}
                <CustomStackFullWidth spacing={2}>
                    <HeroSectionWithSearch query={query} page={page} />
                </CustomStackFullWidth>
                {/* <CustomContainer> */}
                    {query || page || restaurantType ? (
                        <ProductSearchPage
                            configData={configData}
                            query={query}
                            page={page}
                            restaurantType={restaurantType}
                        />
                    ) : (
                        <>
                            {/* <FoodCampaign isLoading={campaignIsloading} /> */}
                            {/* <Banner /> */}
                            <BestReviewedFood isLoading={isLoading} />
                            <Cuisines />
                            <NearbyPopularFood
                                isLoading={isLoadingNearByPopularRestaurantData}
                            />
                            <Restaurant />
                        </>
                    )}
                {/* </CustomContainer> */}
            {/* </PushNotificationLayout> */}
        </>
    )
}

export default Homes
