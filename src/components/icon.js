import React from "react"

const IconMap = {
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  shareLink: ShareLink,
  facebook: Facebook,
  twitter: Twitter,
}

const Icon = function(props) {
  const { name, color = "black", size = 16, ...rest } = props
  const Drawing = IconMap[name] ? IconMap[name] : null
  
  return (
    <svg width={size} height={size} {...rest} viewBox="0 0 16 16">
      <Drawing color={color} />
    </svg>
  )
}

function ArrowRight(props) {
  return (
    <g
      id="link-arrow"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="small-right">
        <rect id="Rectangle" x="0" y="0" width="16" height="16"></rect>
        <g
          id="Group"
          transform="translate(5.000000, 2.000000)"
          stroke={props.color}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline id="Path" points="0.5 0.5 6 6 0.5 11.5"></polyline>
        </g>
      </g>
    </g>
  )
}

function ArrowLeft(props) {
  return (
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="small-right"
        transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
      >
        <g
          id="Group"
          transform="translate(5.000000, 2.000000)"
          stroke={props.color}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline id="Path" points="0.5 0.5 6 6 0.5 11.5"></polyline>
        </g>
      </g>
    </g>
  )
}

function ShareLink(props) {
  return (
    <g id="share-link" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="1440" transform="translate(-135.000000, -931.000000)">
            <g id="Group-9" transform="translate(135.000000, 895.000000)">
                <g id="share-link" transform="translate(0.000000, 36.000000)">
                    <rect id="Rectangle" x="0" y="0" width="16" height="16"></rect>
                    <path d="M4.55,16 C3.35,16 2.25,15.5 1.35,14.7 C-0.45,12.9 -0.45,10.1 1.35,8.3 L2.05,7.6 L3.45,9 L2.75,9.7 C1.75,10.7 1.75,12.3 2.75,13.3 C3.75,14.3 5.35,14.3 6.35,13.3 L9.35,10.3 C10.35,9.3 10.35,7.7 9.35,6.7 L8.65,6 L10.05,4.6 L10.75,5.3 C12.55,7.1 12.55,9.9 10.75,11.7 L7.75,14.7 C6.95,15.5 5.75,16 4.55,16 Z" id="Path" fill={props.color} fillRule="nonzero"></path>
                    <path d="M6,11.4 L5.3,10.7 C3.5,8.9 3.5,6.1 5.3,4.3 L8.3,1.3 C9.2,0.4 10.3,2.66453526e-15 11.5,2.66453526e-15 C12.7,2.66453526e-15 13.8,0.5 14.7,1.3 C16.5,3.1 16.5,5.9 14.7,7.7 L14,8.4 L12.6,7 L13.3,6.3 C14.3,5.3 14.3,3.7 13.3,2.7 C12.3,1.7 10.7,1.7 9.7,2.7 L6.7,5.7 C5.7,6.7 5.7,8.3 6.7,9.3 L7.4,10 L6,11.4 Z" id="Path" fill={props.color} fillRule="nonzero"></path>
                </g>
            </g>
        </g>
    </g>
  )
}

function Twitter(props) {
  return (
    <g
      id="share-twitter"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <rect id="Rectangle" x="0" y="0" width="16" height="16"></rect>
      <path
        fill={props.color}
        d="M16,3 C15.4,3.3 14.8,3.4 14.1,3.5 C14.8,3.1 15.3,2.5 15.5,1.7 C14.9,2.1 14.2,2.3 13.4,2.5 C12.8,1.9 11.9,1.5 11,1.5 C9.3,1.5 7.8,3 7.8,4.8 C7.8,5.1 7.8,5.3 7.9,5.5 C5.2,5.4 2.7,4.1 1.1,2.1 C0.8,2.6 0.7,3.1 0.7,3.8 C0.7,4.9 1.3,5.9 2.2,6.5 C1.7,6.5 1.2,6.3 0.7,6.1 C0.7,6.1 0.7,6.1 0.7,6.1 C0.7,7.7 1.8,9 3.3,9.3 C3,9.4 2.7,9.4 2.4,9.4 C2.2,9.4 2,9.4 1.8,9.3 C2.2,10.6 3.4,11.6 4.9,11.6 C3.8,12.5 2.4,13 0.8,13 C0.5,13 0.3,13 0,13 C1.5,13.9 3.2,14.5 5,14.5 C11,14.5 14.3,9.5 14.3,5.2 C14.3,5.1 14.3,4.9 14.3,4.8 C15,4.3 15.6,3.7 16,3 Z"
        id="Path"
        fillRule="nonzero"
      ></path>
    </g>
  )
}

function Facebook(props) {
  return (
    <g
      id="share-facebook"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g>
        <rect
          id="Rectangle"
          fillOpacity="0"
          fill="#FFFFFF"
          x="0"
          y="0"
          width="16"
          height="16"
        ></rect>
        <g
          id="Group"
          transform="translate(3.000000, 0.000000)"
          fillRule="nonzero"
        >
          <path
            fill={props.color}
            d="M3.02293,16 L3,9 L0,9 L0,6 L3,6 L3,4 C3,1.3008 4.67151,0 7.07938,0 C8.23277,0 9.22406,0.08587 9.51294,0.12425 L9.51294,2.94507 L7.84296,2.94583 C6.53343,2.94583 6.27987,3.5681 6.27987,4.48124 L6.27987,6 L10,6 L9,9 L6.27986,9 L6.27986,16 L3.02293,16 Z"
            id="Path"
          ></path>
        </g>
      </g>
    </g>
  )
}

export default Icon
