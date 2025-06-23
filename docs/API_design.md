# 🗂️API設計書

家計簿アプリのユーザーの入力情報を管理するためのRESTful APIです。

## 1. API概要
- **ベースURL:** `http://あとで記載`
- **認証:** 
- **データ形式:** JSON
- **バージョン:** v1
- **リソース:** 
| リソース名          | 説明      |
| -------------- | ------- |
| **expenses**   | 家計簿データ  |
| **categories** | カテゴリデータ |
| **budgets**    | 予算データ   |
| -------------- | ------- |

## 2. エンドポイント一覧

### 2-1. 家計簿データ管理
- エンドポイント: 
- メソッド: `GET`,`POST`, `PUT`, `DELETE`
- 説明: 家計簿データを参照・登録・修正・削除
#### 📥 リクエスト例:
``` 
GET /api/expenses/
```
#### 📤 レスポンス例:
``` 
{
"id": "1",
"date": "2025-06-01",
"type": "支出",
"category": "娯楽費",
"amount": "1000",
"memo": "ランチ"
}
```
#### 📤 バリデーションエラー:
```
{
  "error": "Bad request",
  "message": "amountは必須です"
}
```
#### 📤 ID未検出時:
```
{
  "error": "Not found",
  "message": "指定したIDのデータは存在しません"
}
```
#### 📤 認証エラー時:
```
{
  "error": "Unauthorized",
  "message": "認証トークンが無効です"
}
```



### 2-2. カテゴリデータ管理
- エンドポイント: 
- メソッド: `GET`,`POST`, `PUT`, `DELETE`
- 説明: カテゴリデータを参照・登録・修正・削除
#### 📥 リクエスト例:
``` 
GET /api/categories/
```
#### 📤 レスポンス例:
``` 
[
  {"id": 1, "name": "食費"},
  {"id": 2, "name": "日用品"},
  ...
]
```
#### 📤 バリデーションエラー:
```
{
  "error": "Bad request",
  "message": "nameは必須です"
}
```
#### 📤 重複登録エラー:
```
{
  "error": "Conflict",
  "message": "このカテゴリ名は既に存在します"
}
```
### 2-3. 予算データ管理
- エンドポイント: 
- メソッド: `GET`,`POST`, `PUT`, `DELETE`
- 説明: 予算データを参照・登録・修正・削除
#### 📥 リクエスト例:
``` 
GET /api/budgets/
```
#### 📤 レスポンス例:
``` 
{ 
"id": 1, 
"year": 2025, 
"month": 6, 
"category": "食費", 
"amount": 50000 
}
```
#### 📤 バリデーションエラー:
```
{
  "error": "Bad request",
  "message": "amountは必須です"
}
```

## 3. 認証
- **方式:** Firebase Authentication (Token認証)
- **ヘッダー:**

```
Authorization: Bearer <Firebase Token>
```

## 4. ステータスコード
- `200 OK`: 正常終了
- `201 Created`: リソース作成
- `400 Bad Request`: リクエストエラー
- `401 Unauthorized`: 認証エラー
- `404 Not Found`: リソース未検出
