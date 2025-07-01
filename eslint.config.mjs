import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  // 全てのファイルに共通で適用する設定
  {
    ignores: ['node_modules/', 'build/', 'src/generated/'], // 除外フォルダ
  },

  // .js, .mjs ファイルに適用する設定 (型情報を使わない)
  {
    files: ['**/*.js', '**/*.mjs'],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // .ts ファイルにだけ適用する設定 (型情報を使う)
  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, // 型情報が必要な推奨ルール
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Prettierとの競合ルールを無効化（最後に書く）
  eslintConfigPrettier,
)
