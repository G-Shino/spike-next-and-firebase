import { css } from "@emotion/core";
import emotionReset from "emotion-reset";
import { Color } from "./../constants/Color";
import { FontSize } from "./../constants/Font";

const globalCSS = css`
  ${emotionReset}
  html {
    font-size: 62.5%;
  }

  body {
    background-color: ${Color.BASE_COLOR};
    color: ${Color.FONT_COLOR};
    font-size: ${FontSize.BASE};
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
