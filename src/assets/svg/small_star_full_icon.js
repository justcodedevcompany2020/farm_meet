import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={13}
            height={11}
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M29.167 9.935l-10.186-.8L15 .582l-3.98 8.564-10.187.788 7.735 6.11-2.323 9.08L15 20.307l8.755 4.818-2.31-9.08 7.722-6.11z"
                fill="#B9D149"
            />
        </Svg>
    )
}

export default SvgComponent
