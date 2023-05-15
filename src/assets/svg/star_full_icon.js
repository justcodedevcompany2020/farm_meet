import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={17}
            height={17}
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M38.25 15.095l-13.481-1.214L19.5.917 14.231 13.9.75 15.095l10.238 9.263-3.075 13.767L19.5 30.82l11.587 7.305-3.056-13.767 10.219-9.263z"
                fill="#B9D149"
            />
        </Svg>
    )
}

export default SvgComponent
