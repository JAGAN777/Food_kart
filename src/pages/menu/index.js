import React, { useEffect, useState } from 'react'
import Menu from '../../components/menu/Menu'
import SubcriptionMenu from "../../components/menu/GetSubcription"
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'
import { ConfigApi } from '../../hooks/react-query/config/useConfig'
import { landingPageApi } from '../../components/landingpage/Api'
import { CustomHeader } from '../../api/Headers'
import { useRouter } from 'next/router'

const index = ({ configData, landingPageData, pathName }) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const {subscribe} =  router.query 

    useEffect(()=> {
        setOpen(subscribe)
    },[subscribe])

    return (
        <div className="div">
            <Meta
                title={`${t('Menu')}`}
                ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
                pathName={pathName}
            />
         {open ? <SubcriptionMenu /> : <Menu setOpen={setOpen} />} 
        </div>
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
