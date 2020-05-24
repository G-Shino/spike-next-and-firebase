# spike-next-and-firebase
## ベース next+typescript
```
yarn init -y
yarn add react react-dom next
yarn add  -D typescript @types/node @types/react @types/react-dom
mkdir src/pages src/components src/styles src/constants
```

## package.jsonにscriptを追加
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

## yarn devをやる
tsconfig.json と next-env.d.tsが生成される。　後者はいじることはない<br/>
tsconfig.jsonの中身をお好みのルールで書き換える<br/>
ただし、実際のトランスコンパイル自体はnextではbabelを使用しているらしい<br/>
型チェック自体はtscを利用している。
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


## css系の追加
CSS in JSとしてemotionを使用。styled-componentはnextだと設定が面倒。<br/>
styled -> styled component的な使用が可能<br/>
core -> cssという書き方が可能
```
yarn add @emotion/styled @emotion/core
yarn add -D @emotion/babel-preset-css-prop babel-plugin-emotion
```

.babelrcの作成
plugin: es6のそれぞれの仕様に対して変換してくれるもの<br/>
preset: pluginを集めたもの。<br/>
next/babel -> nextが用意してくれているpreset。 react env typescriptとか入っている。<br/>
@emotion/babel-preset-css-prop -> cssの書き方をしたときjsx pragmaを不要にしてくれる<br/>
emotion -> babel-plugin-emotion styledを使用可能にしてくれる<br/>
```
{
  "presets": ["next/babel", "@emotion/babel-preset-css-prop"],
  "plugins": ["emotion"]
}

```
link:
https://qiita.com/tetsutaroendo/items/8e3351bc4bfbb419f662#emotion

## eslintとprettierの追加
vscodeでの自動フォーマット導入のため<br/>
Eslint -> 構文チェックツール。<br/>
Prettier -> コード整形ツール。esling --fixより優れており、手軽で確実に整形できる。ただし構文チェックをもたない。<br/>
基本的なセットを導入　-> eslintとpretttierのコンフリクト解決　+ prettierをeslintルールで使用する ライブラリ -> typescript用のライブラリ
```
yarn add -D eslint prettier eslint-plugin-react
yarn add -D eslint-config-prettier eslint-plugin-prettier
yarn add -D @types-eslint/parser @types-eslint/eslint-plugin
```

.eslintrc.jsonを作成する 中身は精査できていない。
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

VSCodeの拡張にESLintとPrettierをインストール<br/>
(+ vscode-styled-componentsをインストールするとCSS In JSがやりやすくなる)<br/>
ctrl + , でセッティング画面。eslintで検索 -> Edit in settings.jsonで設定。<br/>
場合によってはプロジェクトごとにsetting.jsonを使用するのもあり。
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
emotion-reset globalのcssに加えることで使用<br/>
`yarn add emotion-reset`

font awesomeの使用<br/>
`yarn add @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core`<br/>
普段のクラスを大文字でつなげたものをiconに渡す
```
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
///////
<FontAwesomeIcon icon={faPaperPlane} size="2x" />
```
なぜかスタイルが崩壊していたので以下で対応<br/>
nextjsとの相性が悪いよう。fontawesomのstyleをglobal styleに追加すると治る
```
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
/////
const globalCSS = css`
  ${dom.css()}
////////
```

react-spring cssアニメーションをhookののりで管理できる 物理に基づいた動き方をするのでとても自然。<br/>
v8は型に問題がるので、v9を利用。ただしunstableなので注意<br/>
うまくいかないときはpackage.jsonで`"react-spring": "9.0.0-beta.34",`にしてみること。
`yarn add react-spring@next`

react-gesture react-springとともに使う。ドラッグアンドドロップとか簡単に書ける。動き系。<br/>
`yarn add react-use-gesture`

react-three-fiber threeをreactで使う　階層構造で組み立てていく感じ(react-springから持ってくることもできるっぽい)<br/>
yarn add react-three-fiber<br/>
orbitcontrolやloaderを入れる時は別途threeを追加して、dynamicimportする必要がある<br/>
これはSSRの環境でes6の構文が使えないことに起因するっぽい

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

axios　API叩くときに使用　重宝する<br/>
`yarn add axios`

direnv ディレクトリごとに環境変数を設定してくれるツール  cliで使用する<br/>
fishの場合
```
brew install direnv
set -x EDITOR vim
eval (direnv hook fish)
```

`.envrc`を作成し、中に環境変数の定義を書き込む -> `direnv allow`で有効化

firebase　googleのBaaS<br/>
ライブラリをインストール configを設定して有効化 そののち利用<br/>
`yarn add firebase`
