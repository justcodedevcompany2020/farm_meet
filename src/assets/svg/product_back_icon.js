import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={18}
            height={30}
            viewBox="0 0 40 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M32.074 68.615l-31.06-31.03a3.22 3.22 0 01-.782-1.2A4.066 4.066 0 010 35c0-.492.077-.954.232-1.385a3.22 3.22 0 01.782-1.2l31.06-31.122C32.934.43 34.009 0 35.3 0c1.29 0 2.396.462 3.318 1.385C39.538 2.31 40 3.386 40 4.617c0 1.232-.46 2.31-1.383 3.233L11.521 35l27.096 27.15c.86.862 1.29 1.924 1.29 3.185 0 1.263-.46 2.356-1.382 3.28C37.604 69.538 36.528 70 35.3 70c-1.23 0-2.305-.462-3.226-1.385z"
                fill="#EFF4D6"
            />
        </Svg>
    )
}

export default SvgComponent
