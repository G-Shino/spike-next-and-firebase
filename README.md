# spike-next-and-firebase

## ベース next+typescript

```
yarn init -y
yarn add react react-dom next
yarn add  -D typescript @types/node @types/react @types/react-dom
mkdir src/pages src/components src/styles src/constants
```

## package.json に script を追加

yarn コマンドで操作するため

```
・・・・・・
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
・・・・・・
```

## yarn dev をやる

tsconfig.json と next-env.d.ts が生成される。　後者はいじることはない<br/>
tsconfig.json の中身をお好みのルールで書き換える<br/>
ただし、実際のトランスコンパイル自体は next では babel を使用しているらしい<br/>
型チェック自体は tsc を利用している。

```
{
  "compilerOptions": {
    "target": "es5", //どのjsのバージョンで出力するか
    "lib": ["dom", "dom.iterable", "esnext"], //コンパイルする際に使用する組み込みライブラリ PromiseとかsetTimeOutとか使うため
    "module": "esnext", //出力するjsのモジュールの仕組みとして何を使用するか export defaultとかのイメージ
    "moduleResolution": "node", //どのようにしてmoduleを解決するか importの参照手順の違い
    "allowJs": true, //trueにすると.jsも.jsxもどちらもコンパイル対象になる
    "noEmit": true, //babelでコンパイル処理するのでファイルは出力しないようにする
    "skipLibCheck": false, //trueで型宣言ファイルの型チェックをスルーする ライブラリで不十分な型定義があるときとかにtrueにすると良さそう
    "strict": true, //以下のコメント全てがtrueになる。
    // --noImplicitAny：暗黙的なanyをエラー
    // --noImplicitthis：使用しているthisが暗黙的にanyなときエラー
    // --alwaysStrict：use Strictを全てのファイルの先頭に付与　潜在的な問題をエラーに（withの利用禁止・evalの変数スコープの厳格化など）
    // --strictBindCallApply：bind call applyの厳密な型チェック
    // --strictNullChecks：nullableなプロパティの呼び出しをエラーに
    // --strictFunctionTypes：関数の引数の型チェックの挙動 trueでcontravariantlyを弾く 継承関係で親子の代入についてのルール
    // --strictPropertyInitialization：インスタンス変数の初期化が行われているかのチェック
    "noUnusedLocals": true, //宣言されたが未使用な変数をエラーにする
    "noUnusedParameters": true, //定義されたが未使用な関数をエラーにする
    "noImplicitReturns": true, //明示的なreturnがない場合エラーにする
    "noFallthroughCasesInSwitch": true, //switchでbreakやreturnの入れ忘れをエラーにする
    "forceConsistentCasingInFileNames": true, //ファイルの大文字小文字の違いをエラー
    "esModuleInterop": true, //CommonJSモジュールとESモジュール間の相互運用性を,すべてのインポート用に名前空間オブジェクトを作成することで可能する
    "resolveJsonModule": true, //型適宜せずともjsonをモジュールとして扱えるようになる
    "isolatedModules": true, //全てのファイルが単一になるようにコンパイルする　すべてのファイルがexportをもつ必要がでてくる
    "jsx": "preserve", //jsxをどのように変換するか
    "sourceMap": true //.mapファイルを出力するか デバッガーツールで変換前のソースを表示するために必要
  },
  "exclude": ["node_modules"], //コンパイルから除外するファイルの指定
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"] //コンパイル対象の指定
}
```

コピペ用

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "sourceMap": true
  },
  "exclude": ["node_modules"],
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

link:

- https://qiita.com/ryokkkke/items/390647a7c26933940470
- https://azriton.github.io/2017/09/10/TypeScript%E3%81%AEtsconfig.json%E3%82%92%E8%80%83%E3%81%88%E3%82%8B-%E3%82%B3%E3%83%B3%E3%83%91%E3%82%A4%E3%83%AB%E3%83%BB%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E7%B7%A8/
  https://medium.com/@tommedema/typescript-confusion-tsconfig-json-module-moduleresolution-target-lib-explained-65db2c44b491

## css 系の追加

CSS in JS として emotion を使用。styled-component は next だと設定が面倒。<br/>
styled -> styled component 的な使用が可能<br/>
core -> css という書き方が可能

```
yarn add @emotion/styled @emotion/core
yarn add -D @emotion/babel-preset-css-prop babel-plugin-emotion
```

.babelrc の作成
plugin: es6 のそれぞれの仕様に対して変換してくれるもの<br/>
preset: plugin を集めたもの。<br/>
next/babel -> next が用意してくれている preset。 react env typescript とか入っている。<br/>
@emotion/babel-preset-css-prop -> css の書き方をしたとき jsx pragma を不要にしてくれる<br/>
emotion -> babel-plugin-emotion styled を使用可能にしてくれる<br/>

```
{
  "presets": ["next/babel", "@emotion/babel-preset-css-prop"],
  "plugins": ["emotion"]
}

```

link:
https://qiita.com/tetsutaroendo/items/8e3351bc4bfbb419f662#emotion

## eslint と prettier の追加

vscode での自動フォーマット導入のため<br/>
Eslint -> 構文チェックツール。<br/>
Prettier -> コード整形ツール。esling --fix より優れており、手軽で確実に整形できる。ただし構文チェックをもたない。<br/>
基本的なセットを導入　-> eslint と pretttier のコンフリクト解決　+ prettier を eslint ルールで使用する ライブラリ -> typescript 用のライブラリ

```
yarn add -D eslint prettier eslint-plugin-react
yarn add -D eslint-config-prettier eslint-plugin-prettier
yarn add -D @types-eslint/parser @types-eslint/eslint-plugin
```

.eslintrc.json を作成する 中身は精査できていない。

```
{
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:prettier/recommended",
      "prettier/@typescript-eslint"
  ],
  "plugins": [
      "@typescript-eslint",
      "react"
  ],
  "parser": "@typescript-eslint/parser",
  "env": {
      "browser": true,
      "node": true,
      "es6": true
  },
  "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  },
  "rules": {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off"
  }
}
```

VSCode の拡張に ESLint と Prettier をインストール<br/>
(+ vscode-styled-components をインストールすると CSS In JS がやりやすくなる)<br/>
ctrl + , でセッティング画面。eslint で検索 -> Edit in settings.json で設定。<br/>
場合によってはプロジェクトごとに setting.json を使用するのもあり。

```
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "eslint.alwaysShowStatus": true,
    "eslint.lintTask.enable": true,
    "window.zoomLevel": 0,
}
```

自分の設定 カラーモードや保存時の自動フォーマット、タブサイズの設定等が加わっている。

```
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "eslint.alwaysShowStatus": true,
    "eslint.lintTask.enable": true,
    "eslint.format.enable": true,
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
    "workbench.colorTheme": "Default High Contrast",
    "window.zoomLevel": 0,
    "editor.tabSize": 2,
}

```

link:
https://qiita.com/matkatsu8/items/f0a592f713e68a8d95b7

## .gitignore

```
.next
node_modules
yarn-error.log
```

## その他

emotion-reset global の css に加えることで使用<br/>
`yarn add emotion-reset`

font awesome の使用<br/>
`yarn add @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core`<br/>
普段のクラスを大文字でつなげたものを icon に渡す

```
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
///////
<FontAwesomeIcon icon={faPaperPlane} size="2x" />
```

なぜかスタイルが崩壊していたので以下で対応<br/>
nextjs との相性が悪いよう。fontawesom の style を global style に追加すると治る

```
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
/////
const globalCSS = css`
  ${dom.css()}
////////
```

react-spring css アニメーションを hook ののりで管理できる 物理に基づいた動き方をするのでとても自然。<br/>
v8 は型に問題がるので、v9 を利用。ただし unstable なので注意<br/>
うまくいかないときは package.json で`"react-spring": "9.0.0-beta.34",`にしてみること。
`yarn add react-spring@next`

react-gesture react-spring とともに使う。ドラッグアンドドロップとか簡単に書ける。動き系。<br/>
`yarn add react-use-gesture`

react-three-fiber three を react で使う　階層構造で組み立てていく感じ(react-spring から持ってくることもできるっぽい)<br/>
yarn add react-three-fiber<br/>
orbitcontrol や loader を入れる時は別途 three を追加して、dynamicimport する必要がある<br/>
これは SSR の環境で es6 の構文が使えないことに起因するっぽい

```
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });
/////
////
const Controls: React.FC<ControlProps> = (props) => {
/////
export default Controls;
```

```
import dynamic from "next/dynamic";
const Controls = dynamic(() => import("上のファイルへのパス"), {
  ssr: false,
});
```

axios 　 API 叩くときに使用　重宝する<br/>
`yarn add axios`

direnv ディレクトリごとに環境変数を設定してくれるツール cli で使用する<br/>
fish の場合

```
brew install direnv
set -x EDITOR vim
eval (direnv hook fish)
```

`.envrc`を作成し、中に環境変数の定義を書き込む -> `direnv allow`で有効化
あんま使わなさそう
webpack の dotenv が内臓されているみたいなので、next.config.js で管理する

firebase 　 google の BaaS<br/>
ライブラリをインストール config を設定して有効化 そののち利用<br/>
`yarn add firebase`
