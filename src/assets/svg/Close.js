import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12.376 7.718L25.5 20.842 38.556 7.786A3.128 3.128 0 0140.8 6.8a3.4 3.4 0 013.4 3.4 3.06 3.06 0 01-.918 2.244L30.056 25.5l13.226 13.226c.56.548.889 1.29.918 2.074a3.4 3.4 0 01-3.4 3.4 3.128 3.128 0 01-2.346-.918L25.5 30.158l-13.09 13.09a3.129 3.129 0 01-2.21.952 3.4 3.4 0 01-3.4-3.4 3.06 3.06 0 01.918-2.244L20.944 25.5 7.718 12.274A3.06 3.06 0 016.8 10.2a3.4 3.4 0 013.4-3.4c.816.01 1.598.34 2.176.918z"
                fill="#B8CF49"
            />
        </Svg>
    )
}

export default SvgComponent
