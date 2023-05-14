import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={24}
            height={28}
            viewBox="0 0 55 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M21.417 57.875h12.166c0 3.346-2.737 6.083-6.083 6.083s-6.083-2.737-6.083-6.083zm33.458-6.083v3.041H.125v-3.041l6.083-6.084v-18.25c0-9.429 6.084-17.641 15.209-20.379v-.912c0-3.346 2.737-6.084 6.083-6.084s6.083 2.738 6.083 6.084v.912c9.125 2.738 15.209 10.95 15.209 20.38v18.25l6.083 6.083zM42.708 27.458c0-8.516-6.691-15.208-15.208-15.208s-15.208 6.692-15.208 15.208V48.75h30.416V27.458z"
                fill="#4E7234"
            />
        </Svg>
    )
}

export default SvgComponent
