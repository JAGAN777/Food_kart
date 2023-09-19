import LandingPage from '../components/landingpage'
import React, { useEffect, useState } from 'react'
import PushNotificationLayout from '../components/PushNotificationLayout'
import Home1 from './home/index'
import Meta from '../components/Meta'
import { setGlobalSettings } from '../redux/slices/global'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import { CustomHeader } from '../api/Headers'
import HomePage from '../components/home/Homes'
import { landingPageApi } from '../components/landingpage/Api'
import HomeGuard from '../components/home-guard/HomeGuard'
import axios from 'axios'


const Home = ({ configData, landingPageData }) => {
    const dispatch = useDispatch();

    const [config, setConfig] = useState([]);
    const [landingPage, setLandingPage] = useState([])


    useEffect(() => {
        if (configData && landingPageData) {
            // if (configData.length === 0 && landingPageData.length === 0) {
            //     Router.push('/404')
            // } else {
            //     dispatch(setGlobalSettings(configData))
            // }
            dispatch(setGlobalSettings(configData))
        } else {
        }
    }, [configData, landingPageData])


    return (
        <>
            <Meta
                title={configData?.business_name}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
            />
            <PushNotificationLayout>
                <div className='matop'>
                {configData && landingPageData && (
                    <LandingPage
                        global={configData}
                        landingPageData={landingPageData}
                    />
                )}
                </div>
            </PushNotificationLayout>
                {/* <HomePage configData={configData} /> */}
        </> 
    )
}

// Home.getLayout = (page) => <HomeGuard>{page}</HomeGuard>

export default Home


export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    const landingPageRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/landing-page`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const landingPageData = await landingPageRes.json()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData,
        },
    }
}


// export const getServerSideProps = async ({ params, req, resolvedUrl }) => {
//     const domain = req.headers.host
//     const pathName = 'https://' + domain + resolvedUrl
//     const configRes = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
//         {
//             method: 'GET',
//             headers: CustomHeader,
//         }
//     )
//     const config = await configRes.json()
//     const landingPageData = await landingPageApi.getLandingPageImages()
//     return {
//         props: {
//             configData: config,
//             landingPageData: landingPageData.data,
//             pathName: pathName,
//         },
//     }
// }
