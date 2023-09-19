import React from 'react'
import { IconButton } from '@mui/material'
import { CustomTypography } from '../custom-tables/Tables.style'
import { useTranslation } from 'react-i18next'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import facebookIcon from '../../../public/static/footer/socialicons/fbColor.png'
import instraIcon from '../../../public/static/footer/socialicons/instraColor.png'
import pinterestIcon from '../../../public/static/footer/socialicons/pinterest.png'
import linkedin from '../../../public/static/footer/socialicons/linkedIn.png'
import twitterIcon from '../../../public/static/footer/socialicons/tColor.png'
import youtube from '../../../public/static/footer/socialicons/youtubeColor.png'
import errorImage from '../../../public/static/no-image-found.png'
import CustomImageContainer from '../CustomImageContainer'
import { RTL } from '../RTL/RTL'

const SocialLinks = (props) => {
    const { global } = props
    const { t } = useTranslation()
    const clickHandler = (link) => {
        // var url = 'https://foodkart-rwp4m.ondigitalocean.app/'
        var url = 'https://foodkart.vrikshatech.in/'
        var sharelink = `https://${link}/sharer.php?u=`+encodeURIComponent(url)
        
        window.open(`https://${link}`,'_blank')
    }
    
    const iconHandler = (name) => {
        switch (name) {
            case 'facebook':
                return '/static/images/Icons/1.png'
            case 'instagram':
                return '/static/images/Icons/2.png'
            case 'twitter':
                return '/static/images/Icons/5.png'
            case 'linkedin':
                return '/static/images/Icons/3.png'
            case 'pinterest':
                return pinterestIcon.src
            case 'youtube':
                return '/static/images/Icons/4.png'
            default:
                return errorImage.src
        }
    }
    let languageDirection = undefined

    if (typeof window !== 'undefined') {
        languageDirection = localStorage.getItem('direction')
    }

    return (
        <RTL direction={languageDirection}>
            <CustomStackFullWidth
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent={{ xs: 'start' }}
            >
                {global &&
                    global?.social_media?.length > 0 &&
                    global?.social_media?.slice(0,4).map((item, index) => {
                        const { name, link } = item
                        return (
                            <IconButton
                                sx={{ padding: '0px' }}
                                key={index}
                                color="primary"
                                onClick={() => clickHandler(link)}
                            >
                               <div className="social_media cursor-pointer">                                 
                                <CustomImageContainer
                                    src={iconHandler(name)}
                                    alt={name}
                                    height="25px"
                                    width="25px"
                                    objectFit="contain"
                                />
                                </div>
                            </IconButton>
                        )
                    })}
            </CustomStackFullWidth>
        </RTL>
    )
}

SocialLinks.propTypes = {}

export default SocialLinks
