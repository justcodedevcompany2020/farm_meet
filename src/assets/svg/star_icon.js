import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={10}
            height={9}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M20.917 7.625l-7.49-.646L10.5.083 7.573 6.99l-7.49.635 5.688 4.927-1.708 7.323L10.5 15.99l6.438 3.885-1.698-7.323 5.677-4.927zM10.5 14.042l-3.917 2.364 1.042-4.458-3.458-3 4.562-.396L10.5 4.354l1.781 4.209 4.563.395-3.459 3 1.042 4.459-3.927-2.375z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
