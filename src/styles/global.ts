import { css } from "@emotion/core";
import emotionReset from "emotion-reset";

const globalCSS = css`
  ${emotionReset}
  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Jost", "YuGothic", "Yu Gothic", "游ゴシック", "Meiryo",
      "メイリオ", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
      -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  }

  ul,
  ol {
    list-style: none;
  }
`;

export default globalCSS;
