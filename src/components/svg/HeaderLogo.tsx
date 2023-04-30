import * as React from "react";
import { SVGProps } from "react";
const HeaderLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={250}
    height={93}
    viewBox="0 0 250 93"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M138.495 30.4347C138.852 30.5669 139.164 30.8753 139.297 31.2278C139.475 31.6244 139.431 32.065 139.297 32.3735C138.898 33.2076 138.056 34.84 137.207 36.4862C136.352 38.1446 135.49 39.817 135.065 40.7015C132.615 45.8129 130.566 50.043 128.517 53.9646C122.102 66.3465 114.218 80.2265 101.789 87.6292C98.181 89.7443 93.7709 91.2865 89.6726 91.8153C88.4253 91.9915 87.1335 92.0796 85.8862 92.0796C82.7679 92.0796 80.1842 91.5509 77.8233 90.4933C73.1905 88.4224 69.5822 84.2363 68.5576 78.5962C66.7312 68.6819 72.255 59.2082 81.9661 55.595C86.5989 53.8765 91.5881 54.5815 94.6618 57.3575C96.7555 59.2963 97.5573 61.9842 96.7555 64.7162C96.7109 64.9365 96.4882 65.0246 96.3546 64.9805C96.2209 64.9365 96.0873 64.8043 96.1319 64.628C96.4437 62.513 95.9982 60.7064 94.84 59.4285C93.5482 58.0185 91.4099 57.3135 88.8708 57.4457C84.4607 57.666 80.2733 60.486 77.3778 65.2009C73.9923 70.7529 73.0568 77.9352 75.2841 82.7382C77.1105 86.6158 80.1397 88.8189 84.4162 89.7883C90.4299 91.1543 98.181 89.2596 103.527 85.1176C112.694 78.0301 119.106 64.7854 124.137 54.3908L124.152 54.3612L124.909 52.7309C125.221 52.0699 125.443 51.409 125.577 51.0124C121.033 54.89 114.708 58.4151 108.783 58.4151C106.511 58.4151 104.328 57.9304 102.324 56.7406C98.3146 54.3612 96.4437 49.5142 96.9337 42.7725C97.3792 36.912 99.5619 30.6991 101.433 26.8655C107.625 14.2633 116.757 5.18625 127.136 1.30865C131.635 -0.365763 137.872 -0.762335 141.658 2.1018C143.217 3.29151 144.153 5.14218 144.42 7.47755C144.821 11.0026 143.529 14.9243 141.079 17.7884C140.946 17.9206 140.767 17.9206 140.678 17.8325C140.545 17.7444 140.5 17.5681 140.589 17.4359C144.509 12.1042 144.643 5.3625 140.678 3.15932C136.224 0.691763 129.943 3.29151 127.092 4.78968C116.089 10.6061 109.095 22.9439 105.13 32.2413C103.17 36.8239 99.0274 48.0601 102.146 53.8324C103.126 55.6391 104.774 56.7406 107.001 57.1813C109.718 57.666 112.569 57.1813 115.688 55.6831C123.929 52.0258 130.343 40.349 135.6 29.3772C135.644 29.3331 135.734 29.289 135.778 29.3331L138.495 30.4347ZM248.706 12.3692L229.551 45.0643L228.66 46.8269C225.987 51.4536 225.007 54.7583 226.031 55.5074C229.15 57.7547 234.317 51.2773 236.812 47.4878C242.068 39.3801 243.895 34.8857 243.895 34.8857L244.117 35.106C244.295 35.2822 244.34 35.5907 244.251 35.811C243.716 36.9566 241.934 40.658 237.034 48.281C233.827 53.2602 229.15 58.019 225.23 56.4328C223.581 55.7718 222.824 54.3618 222.913 52.3348C220.73 54.8024 218.414 56.3006 216.008 56.6971C214.494 56.9615 212.667 56.6971 211.643 54.1414C211.42 53.6567 211.287 52.8636 211.242 51.762C208.168 55.3752 204.204 57.8428 201.085 56.3446C200.195 55.904 199.615 55.1549 199.393 54.2296C198.992 52.3789 200.016 50.1317 201.041 47.9285C201.108 47.7743 201.186 47.6092 201.263 47.4441L201.264 47.4439C201.342 47.2786 201.42 47.1133 201.486 46.9591C201.887 46.1219 202.288 45.2847 202.734 44.4475C202.89 44.117 203.057 43.7865 203.224 43.456C203.391 43.1256 203.558 42.7951 203.714 42.4646C203.73 42.433 203.746 42.3999 203.762 42.3655C203.786 42.3136 203.811 42.2585 203.838 42.2003C203.892 42.0814 203.952 41.9492 204.025 41.8036L204.047 41.762C204.583 40.7472 205.403 39.1919 205.184 38.3226C205.05 37.8379 204.827 37.5735 204.426 37.4413C202.912 37.0007 199.482 39.5123 198.724 40.2174C194.739 43.9921 192.408 49.0843 189.926 54.5059C189.8 54.7802 189.674 55.0553 189.548 55.3312L189.147 56.2565C189.102 56.3446 189.058 56.3887 188.969 56.3446L187.009 55.6396C186.697 55.5515 186.519 55.3312 186.385 55.0668C186.251 54.8024 186.251 54.494 186.385 54.1855L187.454 51.762C184.603 55.199 181.129 57.7106 178.144 56.4768C176.496 55.8159 175.739 54.4058 175.828 52.3789C173.645 54.8465 171.328 56.3446 168.923 56.7412C167.408 57.0056 165.582 56.7412 164.557 54.1855C164.335 53.6127 164.156 52.5111 164.201 51.057C161.038 55.0227 156.762 57.9309 153.465 56.3006C152.574 55.8599 151.995 55.1108 151.773 54.1855C150.926 51.0129 154.134 45.8575 156.227 42.5527C156.294 42.4426 156.372 42.3214 156.45 42.2002C156.528 42.079 156.606 41.9579 156.673 41.8477L157.831 39.997C156.717 40.7902 155.604 41.4071 154.579 41.8036C152.53 42.5527 149.857 42.9052 147.585 42.5527L139.255 55.4193C138.899 55.904 138.631 56.1243 138.275 55.8599C138.275 55.8599 138.23 55.8159 138.23 55.7718V55.6396L146.338 43.1256L146.783 42.3765C144.601 41.8477 142.641 40.4377 141.883 38.7192C140.725 35.9432 141.75 32.9028 144.467 31.0521C146.561 29.6421 149.367 29.554 151.193 31.0962C153.465 33.035 152.263 35.3263 149.545 39.5123L148.565 41.0546C149.144 41.2749 149.768 41.4071 150.392 41.4511C154.134 41.7596 156.049 40.7461 158.633 38.1904C159.301 37.5295 161.172 34.7975 161.172 34.7535C161.216 34.7094 161.306 34.6653 161.35 34.7094L163.845 35.8991C164.023 35.9873 164.156 36.1194 164.201 36.2957C164.246 36.472 164.246 36.6923 164.112 36.8685C163.176 38.3226 160.103 43.3459 158.187 46.6506C155.96 50.5723 154.713 53.8771 155.247 55.0227C155.782 56.3006 158.766 55.5074 161.172 53.2602C162.241 52.2467 163.31 51.1451 164.246 49.8673C164.468 48.0166 165.047 45.7694 166.339 43.3459L166.38 43.2687C167.884 40.4233 169.588 37.2017 174.135 35.0619C176.095 34.1366 178.144 34.0925 179.614 34.9297C180.817 35.5907 181.53 36.7804 181.708 38.3226C181.752 38.4989 181.752 38.7192 181.752 38.8954C181.886 38.5871 182.064 38.3228 182.242 38.0584L182.242 38.0582C182.599 37.5295 184.291 34.8416 184.291 34.8416C184.336 34.7975 184.425 34.7535 184.47 34.7975C184.559 34.7975 186.43 35.5466 187.142 35.9432C187.321 36.0313 187.454 36.1635 187.499 36.3398C187.543 36.516 187.499 36.7363 187.41 36.9126C186.474 38.4107 183.401 43.434 181.485 46.7388C178.812 51.3654 177.832 54.6702 178.857 55.4193C181.574 57.4462 185.895 52.6874 188.612 48.9419L190.35 45.0203L194.849 34.8416C194.893 34.7975 194.983 34.7535 195.027 34.7975C195.027 34.7975 196.586 35.5466 197.566 35.9872C198.012 36.2076 198.234 36.7363 198.012 37.221C197.726 37.8899 197.09 39.2195 196.487 40.4822L196.486 40.4839L196.485 40.4861L196.484 40.4878C196.055 41.386 195.643 42.2498 195.383 42.8171C198.413 38.6311 202.288 35.3263 204.872 34.9738C207.233 34.6653 208.302 35.4585 208.792 36.1635C209.772 37.6176 209.46 40.1733 207.901 42.8171C207.322 43.8306 206.297 45.7253 205.807 46.6506C203.58 50.5723 202.333 53.8771 202.867 55.0227C203.402 56.3006 206.386 55.5074 208.792 53.2602C209.638 52.467 210.485 51.6298 211.242 50.7045C211.331 48.7216 211.91 46.1659 213.38 43.3459L213.421 43.2688C214.925 40.4234 216.629 37.2017 221.176 35.0619C223.136 34.1366 225.185 34.0925 226.655 34.9297C227.858 35.5907 228.571 36.7804 228.749 38.3226C228.793 38.4988 228.793 38.719 228.793 38.8953V38.8954C233.649 21.6225 241.044 5.89181 244.875 4.43772C248.706 2.98362 251.868 6.94934 248.706 12.3692ZM244.028 13.2945C246.745 8.57969 246.656 6.37651 245.721 6.06807C241.667 4.74616 232.312 28.3642 229.907 37.6176C230.796 36.079 232.38 33.3601 234.217 30.2083L234.235 30.178L234.238 30.1726L234.243 30.1643C237.556 24.4776 241.683 17.3966 244.028 13.2945ZM145.982 34.0925C145.091 35.4585 144.512 37.3973 146.204 39.3801C146.605 39.8648 147.184 40.3055 147.808 40.6139L149.011 38.6751C150.169 36.9126 151.728 34.0044 149.679 32.8587C148.432 32.1978 146.783 32.8147 145.982 34.0925ZM176.719 45.505C176.808 45.2406 176.986 44.8881 177.209 44.4475C177.272 44.319 177.34 44.182 177.412 44.0377C178.499 41.8555 180.425 37.9875 179.881 36.2516C179.703 35.8551 179.48 35.5907 179.08 35.4144C178.812 35.2822 178.59 35.2382 178.322 35.2382C175.872 35.2382 172.665 40.4377 171.551 42.3324L171.328 42.729C168.522 47.3116 165.582 53.4364 166.607 55.3312C166.829 55.7718 167.23 55.9921 167.809 56.0362C169.636 55.9921 172.977 53.7449 176.719 45.505ZM224.249 44.4477L224.25 44.4475C224.364 44.2166 224.494 43.9605 224.633 43.6851C225.745 41.4907 227.476 38.0722 226.922 36.4279C226.744 36.0313 226.521 35.7669 226.121 35.5907C225.853 35.4585 225.63 35.4144 225.363 35.4144C222.913 35.4144 219.661 40.4377 218.548 42.3324L218.325 42.729C215.563 47.3116 212.757 53.3483 213.781 55.243C214.004 55.6837 214.405 55.904 214.984 55.9481C216.81 55.904 220.018 53.7449 223.76 45.505C223.849 45.241 224.026 44.8891 224.249 44.4493L224.249 44.4483L224.249 44.4477ZM82.2301 45.2837L81.651 44.9753C78.8446 49.6901 74.3454 55.859 68.5544 55.859C66.1044 55.859 64.4116 53.5236 65.6589 50.3951C66.2825 48.8088 67.5298 47.3547 67.5298 47.3547C67.5298 47.3547 75.1027 47.575 79.5128 43.8296C83.9675 40.0842 81.9629 35.2813 77.8646 35.061C74.3454 34.8847 69.9799 37.176 65.1689 43.9618C64.8571 44.3583 64.6344 44.7989 64.4116 45.2396L64.4116 45.2396C63.387 47.0903 62.8079 49.0291 62.7634 50.7917C62.0061 51.717 61.1597 52.5542 60.3133 53.3473C57.9078 55.5946 54.9232 56.3877 54.3887 55.1099C53.8541 53.9642 55.1014 50.6595 57.3287 46.7378C57.8187 45.8125 58.8433 43.9177 59.4224 42.9043C60.9815 40.2605 61.2933 37.7048 60.3133 36.2507C59.8233 35.5457 58.7542 34.7525 56.3932 35.061C53.8096 35.4135 49.3549 39.1589 46.3703 43.4771C46.5877 43.001 47.7469 40.5118 49.1856 37.4223L49.1858 37.4218L49.1881 37.4168C51.8766 31.6435 55.5396 23.7777 55.8587 23.0316C56.0814 22.5469 55.8587 22.0181 55.4132 21.7978C54.4332 21.3572 52.8741 20.6081 52.8741 20.6081C52.8295 20.564 52.7404 20.6081 52.6959 20.6522L41.8711 45.0634L37.8619 54.1405C37.7283 54.4489 37.7283 54.7574 37.8619 55.0218C37.9956 55.2861 38.1738 55.5065 38.4856 55.5946L40.4456 56.2996C40.5347 56.3437 40.5793 56.2996 40.6238 56.2115L41.0247 55.2861C43.653 49.5579 46.1476 44.1381 50.2904 40.1723C51.0477 39.4673 54.3441 36.9557 55.9032 37.3963C56.3042 37.5285 56.5269 37.7929 56.6605 38.2776C56.8802 39.1469 56.0597 40.7021 55.5243 41.7169L55.5243 41.7169L55.5023 41.7586C55.4287 41.9042 55.3687 42.0363 55.3147 42.1552C55.2706 42.2522 55.2305 42.3403 55.1905 42.4196C55.0346 42.7501 54.8675 43.0805 54.7005 43.411C54.5334 43.7415 54.3664 44.072 54.2105 44.4024C53.765 45.2396 53.3641 46.0768 52.9632 46.914L52.9632 46.9141C52.8964 47.0682 52.8184 47.2334 52.7405 47.3986L52.7404 47.3988L52.7404 47.3989C52.6624 47.5641 52.5845 47.7293 52.5177 47.8835C51.4931 50.0866 50.4686 52.3339 50.8695 54.1846C51.0922 55.1099 51.6713 55.859 52.5623 56.2996C55.6805 57.8418 59.6897 55.2861 62.7634 51.6729C62.7857 51.8052 62.8079 51.9484 62.8302 52.0917C62.8525 52.2348 62.8747 52.378 62.897 52.5101C63.4316 54.6252 64.7234 56.7843 68.2426 56.7843C76.2164 56.7843 82.2301 45.2837 82.2301 45.2837ZM73.4545 39.5114C75.9491 36.9557 77.7755 35.6338 79.1119 35.9422C80.9828 36.3829 79.0674 40.5248 77.0182 42.8161C74.3454 45.7684 71.5836 46.6937 67.7971 46.6937C69.9353 43.6093 71.8954 41.0536 73.4545 39.5114ZM70.7842 14.5278C66.4187 14.4837 58.4003 13.7787 49.4465 12.0162C45.6155 16.2463 42.8091 23.6049 37.9535 38.0577C32.608 53.9206 22.3177 57.666 11.1811 57.2695C4.67737 57.0491 0.356371 52.2903 0 46.9145C0 46.7383 0.133639 46.6061 0.311825 46.6061C0.49001 46.6061 0.668196 46.7823 0.668196 46.9586C0.890928 49.9108 2.94006 56.5645 11.7157 56.5645C21.115 56.5645 27.7969 49.8227 33.1871 34.5767L35.2362 29.4653C38.4881 20.7408 42.9427 15.1887 47.4419 11.6196L45.0364 11.0908C40.0027 9.94517 35.7262 9.5486 31.7616 9.94517C32.9643 12.1483 33.5434 14.9684 33.3207 18.6257C32.6971 29.4213 22.4514 40.2169 13.6757 39.0712C4.9001 37.9255 6.32559 25.4115 15.5021 16.5106C19.6004 12.5449 24.4114 9.72485 29.7124 8.13856C28.0642 6.42008 25.6587 5.05411 22.0059 4.08471L22.095 3.46782C25.6142 4.43722 28.4206 5.80319 30.3806 7.96231C36.7508 6.19976 43.7891 6.24383 51.0056 8.22669C51.2397 8.27814 51.4737 8.3446 51.6989 8.40855C51.8595 8.45414 52.0155 8.49846 52.1638 8.53513C54.2575 7.43354 56.3066 6.68446 58.1776 6.1557C64.7705 4.34909 68.9133 4.65754 73.6797 5.80319C77.8225 6.81665 79.9608 9.0639 79.8717 10.8264C79.738 13.1618 77.0653 14.6159 70.7842 14.5278ZM73.2788 6.46415C67.1314 4.96598 62.0531 5.84726 57.8658 7.1251C56.173 7.6098 54.703 8.18263 53.3666 8.97577C54.7069 9.38824 55.9565 9.81166 57.1751 10.2246C61.4239 11.6642 65.2952 12.976 71.3188 13.2499C74.3034 13.3821 78.9362 13.1177 79.0698 10.6502C79.1589 8.88764 75.9516 7.08104 73.2788 6.46415ZM15.7249 36.163C24.3223 37.2646 32.608 25.3674 32.6971 18.2732C32.7416 15.0565 32.3852 12.2805 31.0043 10.0774C26.3715 10.6502 22.1841 12.4568 17.8186 15.6294C9.62202 21.578 7.17197 35.0614 15.7249 36.163Z"
      fill="#311514"
    />
  </svg>
);
export default HeaderLogo;