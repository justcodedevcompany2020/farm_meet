import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M6.376 1.718L19.5 14.842 32.556 1.786A3.128 3.128 0 0134.8.8a3.4 3.4 0 013.4 3.4 3.06 3.06 0 01-.918 2.244L24.056 19.5l13.226 13.226c.56.548.889 1.29.918 2.074a3.4 3.4 0 01-3.4 3.4 3.128 3.128 0 01-2.346-.918L19.5 24.158 6.41 37.248a3.128 3.128 0 01-2.21.952 3.4 3.4 0 01-3.4-3.4 3.06 3.06 0 01.918-2.244L14.944 19.5 1.718 6.274A3.06 3.06 0 01.8 4.2 3.4 3.4 0 014.2.8c.816.01 1.598.34 2.176.918z"
                fill="#B8CF49"
            />
        </Svg>
    )
}

export default SvgComponent
