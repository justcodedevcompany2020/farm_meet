import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10.704 10.675V.115H15.6v10.56h10.56v4.896H15.6v10.56h-4.896V15.57H.144v-4.896h10.56z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
