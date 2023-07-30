import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={16}
            height={14}
            viewBox="0 0 39 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M28.431 12.63h9.937a.633.633 0 01.486 1.037l-4.969 5.964a.63.63 0 01-.97 0l-4.969-5.964a.632.632 0 01.485-1.036zm-27.8 5.055h9.938a.632.632 0 00.485-1.036l-4.969-5.964a.63.63 0 00-.97 0L.146 16.649a.632.632 0 00.486 1.036z"
                fill="#fff"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.5 2.522c-3.922 0-7.43 1.786-9.748 4.594A1.264 1.264 0 117.804 5.51a15.169 15.169 0 0126.65 7.122h-2.57A12.641 12.641 0 0019.5 2.52zM7.116 17.685A12.642 12.642 0 0029.248 23.2a1.264 1.264 0 111.948 1.607 15.168 15.168 0 01-26.65-7.122h2.57z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
