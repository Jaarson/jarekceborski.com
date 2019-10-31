import React from 'react';

const IconMap = {
  "arrowRight": ArrowRight,
}

const Icon = function(props) {
  const { name, color="black", size=16, ...rest } = props;
  const Drawing = IconMap[name] ? IconMap[name] : null;

  return (
    <svg
      width={size}
      height={size}
      {...rest}
      viewBox="0 0 16 16"
    >
      <Drawing color={color} />
    </svg>
  );
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
                    <rect
                      id="Rectangle"
                      x="0"
                      y="0"
                      width="16"
                      height="16"
                    ></rect>
                    <g
                      id="Group"
                      transform="translate(5.000000, 2.000000)"
                      stroke={props.color}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline
                        id="Path"
                        points="0.5 0.5 6 6 0.5 11.5"
                      ></polyline>
                    </g>
                  </g>
                </g>
  )
}


export default Icon;
