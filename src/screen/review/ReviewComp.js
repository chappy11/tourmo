import React from "react";
import {View} from 'react-native'
import { Rating } from "react-native-ratings";
import { useEffect } from "react/cjs/react.production.min";
import API from "../../endpoints/API";
import { Color } from "../../utils/Themes";

const ReviewComp = ({count}) =>{
    
    console.log("REVIEW",count)
    return(
            
            <Rating
                ratingCount={5}
                defaultRating={count}
                readonly={true}
                minValue={count}
                jumpValue={count}
                fractions={1}
                startingValue={count}
                imageSize={20}
           
            />
      
    );
}
export default ReviewComp;