import { alpha, Box, Grid, IconButton, styled } from '@mui/material'
import { Stack } from '@mui/system'

export const CustomIconButton = styled(IconButton)(
    ({ theme, nextbutton, color }) => ({
        borderRadius: '50%',
        border:'1px solid #e01d57',
        color:
            nextbutton === 'true'
                ? '#fff'
                : '#fff',
        background:
            nextbutton === 'true'
                ? '#e01d57'
                : '#e01d57',
        width: '50px',
        height: '50px',
        '&:hover': {
            background:
                nextbutton === 'true'
                    ? '#e01d57'
                    : '#e01d57',
            color:
                nextbutton === 'true'
                    ? '#fff'
                    : '#fff',        },
    })
)

export const CustomSideOverLay = styled(Stack)(({ theme, left, right }) => ({
    position: 'absolute',
    width: '69px',
    height: '100%',
    background: `linear-gradient(270deg, ${theme.palette.neutral[900]} 0%, rgba(0, 0, 0, 0) 100%)`,
    opacity: '.23',
    left: left,
    right: right,
    top: '.2%',
    borderRadius: '0px 4px 4px 0px',
    zIndex: 1,
}))
export const CustomGridWithBgColor = styled(Grid)(({ theme, foodsize }) => ({
    background: foodsize > 0 && `${theme.palette.sectionBg}`,
    padding: foodsize > 0 && '23px 0px 23px 23px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        padding: foodsize > 0 && '10px 0px 13px 10px',
    },
}))
