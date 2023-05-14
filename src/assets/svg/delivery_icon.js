import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={30}
            height={17}
            viewBox="0 0 70 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M23 41a6 6 0 100-12 6 6 0 000 12zm30 0a6 6 0 100-12 6 6 0 000 12z"
                stroke="#fff"
                strokeWidth={4}
                strokeMiterlimit={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M29.15 35H44V3.8A1.8 1.8 0 0042.2 2H2m13.95 33H9.8A1.801 1.801 0 018 33.2V18.5"
                stroke="#fff"
                strokeWidth={4}
                strokeLinecap="round"
            />
            <Path
                d="M5 11h12"
                stroke="#fff"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M44 11h16.83a1.8 1.8 0 011.644 1.068l5.37 12.084c.102.23.155.478.156.729V33.2a1.8 1.8 0 01-1.8 1.8h-5.7M44 35h3"
                stroke="#fff"
                strokeWidth={4}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default SvgComponent
