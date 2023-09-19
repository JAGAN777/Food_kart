import React from 'react'

import AboutUs from '../../components/about-us/AboutUs'
import { useSelector } from 'react-redux'
import Meta from '../../components/Meta'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { Container, CssBaseline } from '@mui/material'
import AboutUsPage from '../../components/about-us/AboutUsPage'
import { CustomHeader } from '../../api/Headers'
import { landingPageApi } from '../../components/landingpage/Api'
import { useTranslation } from 'react-i18next'



const index = ({configData, landingPageData, pathName}) => {
    const { t } = useTranslation()

    return (
        <>
            <CssBaseline />
            <Meta
                title={`${t('About')}`}
                // title={`${t('Contact')} on ${configData?.business_name}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
            {/* <Container maxWidth="lg" sx={{ mb: { xs: '72px', md: '0' } }}>
                <AboutUsPage configData={configData} />
            </Container> */}
            <AboutUs />
        </>
    )
}
export default index

export const getServerSideProps = async ({ params, req, resolvedUrl }) => {
    const domain = req.headers.host
    const pathName = 'https://' + domain + resolvedUrl
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: 'GET',
            headers: CustomHeader,
        }
    )
    const config = await configRes.json()
    const landingPageData = await landingPageApi.getLandingPageImages()
    return {
        props: {
            configData: config,
            landingPageData: landingPageData.data,
            pathName: pathName,
        },
    }
}