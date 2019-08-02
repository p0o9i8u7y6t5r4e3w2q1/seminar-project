# 📢公告

### 8/2

* 修改semester course 資料
* 新增semester course repository來簡化save過程
  * 因為自定義的id無法讓save正確運作 (save 是靠id來查詢資料庫有無存在資料，不存在就insert，存在就更新 )
* 增加課程爬蟲，是為了方便測試，可 import 108學年度第一學期的 課程

### 8/1

* 去除setter getter，避免使用typeorm api時，得到不預期的結果
* 去除DatePeriod （因為都沒用到）

<details>
<summary><strong>...其他公告...</strong></summary>

### 7/28

* 更新 SemesterCourseModule，目前已經可以運作🎉🎉🎉    (當然還有要修改部份，但可以玩玩)
  * 想玩請讀下面"運作方法"的說明
  * semester course module加了很多不必要的console訊息，之後會刪除
* ScheduleChange 新增一個 成員 personID, 停課保存執行人id，補課申請成功保存申請人id
* SemesterCourse 還是在資料庫內增加 year, semester, dept, serial

### 7/26

* BookingForm, MakeupCourseForm 的流水號為成員 formID，目前是八位數，兩碼英文加上申請序號，

  > `BFxxxxxx`, or `MFxxxxxx`

* model修正、資料庫樣板更新(沒有新增測試資料)

* ScheduleUtil修改完畢

### 7/24

* 已修正只回傳第一行結果的bug，目前model已經可以運作

### 7/23

* ~~typeorm目前可以運作，但不知謂何都永遠回傳資料表第一行的結果    `bug`~~
* 請注意，我將ScheduleUtil和constant-manager移到util資料夾
* 因為typeorm可接受的寫法，setter, getter改成依照typescript的標準寫法
* 我有改一些常數，如Period現在是以Array形式呈現

## 舊的公告

* 現在到處都是漏洞，尤其controller、service，請小心
* 你們寫好可以傳給我，或直接commit都可以

</details>

# 🎡架構作法(參考nestjs)

* 自己隨手畫的，參考參考就好，說不定很多錯

![img](framework.jpg)

# 🚀運作方式

## 前置作業

#### 安裝依賴包

1. 下載此project程式碼，可以直接下載或是用 git 下載

2. 在此project根目錄執行 `npm install` 安裝依賴包

   > 注意：每次我更新檔案，可能新增一些依賴包，所以最好更新後再安裝一遍依賴包

#### 資料庫匯入

1. 建立一個 seminar-project 的資料庫

   > 名字可以隨意改，但測試時ormconfig.json必須做相應調整
   >
   
2. 匯入 seminar-project.sql 即可使用

* seminar-project.sql 資料填得不多，沒有每一個table都填

#### ormconfig.json設定

* https://typeorm.io/#/using-ormconfig
* 記得 username、password、database可能需要修改

## 開始運作

1. 啟動好mysql（或 phpmyadmin)
2. project根目錄下執行 `npm run start`
3. 可以開始玩了🎉 ，出現任何問題，可以問我

## 要運作自己部份

* 設定 route (自己查)
* 在app module裡面將要測試的module解除註解，即可依上面方法開始運作

# 📁檔案結構

- model/    -- 放置基本的Class
  - entity/    -- 放置會存在資料庫的class
  - common/    -- 放置其他的Class
  - repository/    -- 放置自定義的Repository
- module/   -- 放置功能性區分的controller與service
- util/    -- 放置一些輔助性class，這些Class不需要建立物件即可使用
  - constant-manager    -- 常數區域
- ormconfig.json    -- 資料庫設定
- seminar-project.sql    -- 目前的資料庫樣板，資料填得不多

# 👩🏻‍💻 目前架構待完成

* [ ] nestjs架構相關

  > 可參考 https://github.com/lujakob/nestjs-realworld-example-app

  * [ ] controller and service

    > controller 要呼叫 service 來處理商業邏輯

  * [ ] servcie and repository

    > Service 利用 repository 來取、保存 各種 Model 物件

  * [ ] route沒有設定

  * [ ] pipe

  * [ ] guard

* [ ] Model

  * [x] 初步可以與typeorm運作

  * [x] 讓typeorm可以回傳正確的結果 (目前永遠回傳資料表第一行的結果)  `bug`

  * [ ] 流水號的規定

  * [x] 依序確認entity是否有bug

  * [x] IRoomSchedule interface的實做

    > 用來處理Schedule, ScheduleChange, 兩個Form, 轉換成 ClassroomDateSchedule的規定
    >
    > 不全部寫在ClassroomDateSchedule是為了讓我自己覺得code好看

  * [ ] entity 一些 function

    * [ ] 有些參數讀取或是保存時，需要經過特殊處理

* [ ] Util

  * [x] ScheduleUtil 的更正

* [ ] 細部邏輯沒考慮到

  > ClassScheduleManger, EquipmentManager, ...
  >
  > 一堆一定要實作的function沒有列到

# 🧾功能進度

- [ ] 帳號管理 

  - [ ] 帳號申請（助教）-- UserController.signupTA

  - [ ] 查看個人資料 -- UserController.findOne

  - [ ] 修改個人資料 -- UserController.update(?)

  - [ ] 修改密碼 -- UserController.updatePassword(?) 

    > 有需要跟修改個人資料合併嗎?

- [ ] 教室可借用時段 -- Schedule.findClassroomWeekSchedule

- [ ] 設備教室借用申請
  <details>
  <summary>所需資料</summary>
  
  - 系內人、系外人
  - 申請者id（系內人）
  - 申請者姓名（系外人）
  - 申請者email
  - 申請者Phone
  - 借用日期
  - 借用時段區間
  - 借用教室
  - 借用設備
    - 類別
    - 設備名
  - 總金額（系外人）
  
  </details>
  
  - [ ] 查詢可借用設備 -- ?
  - [ ] 新增申請 -- BookingController.create
  - [ ] 查詢申請進度 -- BookingController.findOne
  - [ ] 刪除待審核申請 -- BookingController.remove

- [ ] 課程管理

  - [ ] 補課
    - [ ] 補課申請 -- CourseChangeController.createMakeupCourseForm
    - [ ] 查看補課申請 -- CourseChangeController.findMakeupCourseForm
    - [ ] 刪除補課申請 -- ?
  - [ ] 停課
    - [ ] 設定停課 -- CourseChangeController.cancealCourse
    - [ ] 取消停課 -- ?
  - [ ] 助教管理
    - [ ] 加入助教 -- CourseChangeController.addTA
    - [ ] 刪除助教 -- CourseChnageController.removeTA

- [ ] 審核

  - [ ] 借用申請
    - [ ] 查看待審核借用申請 -- BookingController.findOnPending
      - [ ] 審核其中一個申請 -- BookingController.findOnPending
    - [ ] 查看已審核申請 -- BookingController.findOnPending
  - [ ] 補課申請
    - [ ] 查看待審核借用申請 -- CourseChangeController.findOnPending
      - [ ] 審核其中一個申請 -- CourseChangeController.checkMakeupCourse
    - [ ] 查看已審核申請 -- CourseChangeController.findChecked

- [ ] 學期管理

  - [ ] 學期

    - [ ] 新增學期 -- ? 
    - [ ] 修改學期 -- ?

  - [ ] 學期課程

    <details>
    <summary>所需資料</summary>

    - 課程代碼（無關學期）
      
      > 或許課程也需要CRUD?
    - 選課序號
    - 上課教室
    - 上課老師
    - 課程時段

    </details>

    - [ ] 爬蟲導入資料 -- ?

    - [ ] 新增學期課程 -- SemesterCourseController.create

    - [ ] 查看所有課程 -- SemesterCourseController.findAll

    - [ ] 修改學期課程 -- SemesterCourseController.update

    - [ ] 刪除學期課程 -- SemesterCourseController.delete

  - [ ] 選課學生

    - [ ] 加入選課學生 -- ?
    - [ ] 刪除選課學生 -- ?

- [ ] 角色管理

  - [ ] 轉換角色權限（系主任、教授）-- UserController.setRole

    > i.e. 指派系主任

- [ ] 刷卡紀錄

  - [ ] 依教室、時間範圍找出所有刷卡紀錄 -- CardController.findRecord

- [ ] api 功能

  - [ ] 刷卡權限判定 -- CardController.checkAuthorization
  - [ ] 保存刷卡紀錄 -- CardController.saveRecord