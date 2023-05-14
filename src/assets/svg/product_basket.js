import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={23}
            height={24}
            viewBox="0 0 54 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16.195 44c-2.969 0-5.371 2.43-5.371 5.4s2.402 5.4 5.371 5.4c2.97 0 5.4-2.43 5.4-5.4s-2.43-5.4-5.4-5.4zm26.993 0c-2.97 0-5.371 2.43-5.371 5.4s2.402 5.4 5.371 5.4c2.97 0 5.399-2.43 5.399-5.4s-2.43-5.4-5.399-5.4zm-3.914-13.5a5.373 5.373 0 004.724-2.781l9.663-17.523A2.69 2.69 0 0051.313 6.2h-39.95L8.828.8H0v5.4h5.399l9.717 20.493-3.644 6.588c-1.97 3.618.62 8.019 4.723 8.019h32.392v-5.4H16.195l2.97-5.4h20.11zM13.928 11.6h32.796l-7.45 13.5H20.325l-6.397-13.5z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
