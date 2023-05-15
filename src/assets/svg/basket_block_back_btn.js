import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={14}
            height={22}
            viewBox="0 0 30 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5.945 50.39L29.24 27.785c.276-.27.472-.56.586-.875.116-.314.174-.65.174-1.009 0-.359-.058-.695-.174-1.01a2.34 2.34 0 00-.586-.874L5.945 1.342C5.3.714 4.493.4 3.525.4a3.44 3.44 0 00-2.488 1.01C.346 2.081 0 2.866 0 3.763S.346 5.446 1.037 6.12L21.359 25.9 1.037 45.681c-.645.628-.968 1.401-.968 2.32 0 .92.346 1.717 1.037 2.39S2.604 51.4 3.526 51.4c.921 0 1.727-.336 2.419-1.01z"
                fill="#fff"
            />
        </Svg>
    )
}

export default SvgComponent
