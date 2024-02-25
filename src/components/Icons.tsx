import { LucideProps } from "lucide-react";

export const Icons = {
  search: (props: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 18.5L22 22M21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21C16.7467 21 21 16.7467 21 11.5Z"
        stroke="#141718"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5588 19.5488C17.5654 16.8918 15.0036 15 12 15C8.99638 15 6.4346 16.8918 5.44117 19.5488M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33285 17.7154 5.44117 19.5488M18.5588 19.5488C16.8031 21.0756 14.5095 22 12 22C9.49052 22 7.19694 21.0756 5.44117 19.5488M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
        stroke="#141718"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  ),
  CartIcon: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7V6"
        stroke="#141718"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.6115 3H8.38851C6.43316 3 4.7644 4.41365 4.44294 6.3424L2.77627 16.3424C2.36992 18.7805 4.25009 21 6.72185 21H17.2782C19.7499 21 21.6301 18.7805 21.2237 16.3424L19.5571 6.3424C19.2356 4.41365 17.5669 3 15.6115 3Z"
        stroke="#141718"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16666 10H15.8333"
        stroke="#141718"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8333 15L15.8333 10"
        stroke="#141718"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8333 5L15.8333 10"
        stroke="#141718"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  Favorite: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.577 5.76422C10.2546 6.07365 9.74545 6.07365 9.42301 5.76422L8.84601 5.2105C8.17065 4.56239 7.25829 4.16667 6.25001 4.16667C4.17894 4.16667 2.50001 5.8456 2.50001 7.91667C2.50001 9.90219 3.57483 11.5417 5.12647 12.8888C6.67944 14.237 8.53618 15.1312 9.64555 15.5876C9.87751 15.683 10.1225 15.683 10.3545 15.5876C11.4638 15.1312 13.3206 14.237 14.8735 12.8888C16.4252 11.5417 17.5 9.90218 17.5 7.91667C17.5 5.8456 15.8211 4.16667 13.75 4.16667C12.7417 4.16667 11.8294 4.56239 11.154 5.2105L10.577 5.76422ZM10 4.00798C9.02676 3.074 7.70542 2.5 6.25001 2.5C3.25847 2.5 0.833344 4.92512 0.833344 7.91667C0.833344 13.2235 6.64196 16.1542 9.0115 17.1289C9.64965 17.3914 10.3504 17.3914 10.9885 17.1289C13.3581 16.1542 19.1667 13.2235 19.1667 7.91667C19.1667 4.92512 16.7416 2.5 13.75 2.5C12.2946 2.5 10.9733 3.074 10 4.00798Z"
        fill="#6C7275"
      />
    </svg>
  ),
};
