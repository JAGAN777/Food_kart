import React, { useState } from 'react'
import Link from 'next/link'
import { Badge, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux'
import {useTheme} from "@mui/material/styles";

const Wishlist = ({handleClick}) => {
    const { wishLists } = useSelector((state) => state.wishList)
    const [hover,setHover] = useState(false)
    const theme=useTheme()
    return (
        <>
            {/*<Notifications />*/}

                <IconButton onClick={()=>handleClick("wishlist")} onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
                    <Badge
                        color="primary"
                        variant="dot"
                        overlap="circular"
                        invisible={
                            wishLists === undefined ||
                            (wishLists?.food?.length === 0 &&
                                wishLists.restaurant.length === 0)
                        }
                    >
                      { hover ?  <FavoriteIcon  color="primary"/> : <FavoriteBorderIcon  color="primary"/> } 
                    </Badge>
                </IconButton>

        </>
    )
}

export default Wishlist
