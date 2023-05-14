import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={29}
            height={29}
            viewBox="0 0 67 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16.259 10.14L33.5 27.38 50.652 10.23A4.11 4.11 0 0153.6 8.933a4.467 4.467 0 014.467 4.467 4.02 4.02 0 01-1.206 2.948L39.485 33.5l17.376 17.375a4.02 4.02 0 011.206 2.725 4.466 4.466 0 01-4.467 4.467 4.11 4.11 0 01-3.082-1.206L33.5 39.619 16.303 56.816a4.11 4.11 0 01-2.903 1.25A4.467 4.467 0 018.933 53.6a4.02 4.02 0 011.206-2.948L27.515 33.5 10.139 16.125A4.02 4.02 0 018.933 13.4 4.467 4.467 0 0113.4 8.933a4.12 4.12 0 012.859 1.206z"
                fill="#B8CF49"
            />
        </Svg>
    )
}

export default SvgComponent
