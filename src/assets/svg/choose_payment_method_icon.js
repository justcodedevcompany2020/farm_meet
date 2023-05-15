import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={28}
            height={24}
            viewBox="0 0 64 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M60.59 1.873a6.58 6.58 0 00-9.165 1.621l-25.02 35.732L10 28.02a6.01 6.01 0 10-6.787 9.922l21.99 15.02a5.961 5.961 0 004.682.889 6.577 6.577 0 004.257-2.708l28.07-40.1a6.59 6.59 0 00-1.623-9.173"
                fill="#B8CF49"
            />
        </Svg>
    )
}

export default SvgComponent
