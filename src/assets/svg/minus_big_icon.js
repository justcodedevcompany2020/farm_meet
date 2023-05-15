import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 25 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M24.04 4.333h-24v-3.6h24v3.6z" fill="#fff" />
        </Svg>
    )
}

export default SvgComponent
