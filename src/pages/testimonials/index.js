import React, { useState } from 'react'
import Testimonial from '../../components/testimonials/Testimonials'
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { landingPageApi } from '../../components/landingpage/Api'
import { CustomHeader } from '../../api/Headers'


export default function index({ configData, landingPageData, pathName }) {
  const { t } = useTranslation()


  return (
    <div>
        <Meta
            // title={`${t('Testimonial')} on ${configData?.business_name}`}
            title={`${t('Testimonial')}`}
            ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
            pathName={pathName}
        />
        <Testimonial />
    </div>
  )
}


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
