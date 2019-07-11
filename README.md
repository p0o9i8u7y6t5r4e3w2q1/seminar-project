# 公告

* 現在到處都是漏洞，尤其controller、service，請小心，我修改就好，你們儘量不要動到
* 你們寫好可以傳給我，或直接commit都可以

# 架構作法(參考nestjs)

* 自己隨手畫的，參考參考就好，說不定很多錯

![img](framework.jpg)

# 目前架構待完成

* [ ] route沒有設定

* [ ] 細部邏輯沒考慮到

  > ClassScheduleManger, EquipmentManager, ...
  >
  > 一堆一定要實作的function沒有列到

* [ ] function參數

  > 有些考慮用dto來替代多個參數

* [ ] function 回傳型別

  > 因為不確定要如何回傳，先不寫回傳型別(不寫不影響運作，但是一旦確定型別還是寫比較保險)

* [ ] controller and service

  > controller 要呼叫 service 來處理商業邏輯，

* [ ] servcie and repository

  > Service 利用 repository 來取、保存 各種 Model 物件

* [ ] entity 一些 function

  > 有些參數讀取或是保存時，需要經過特殊處理
  >
  > 要參考typeorm的文檔修改

# 功能進度

- [ ] 帳號管理 

  - [ ] 帳號申請（助教）-- UserController.signupTA

  - [ ] 查看個人資料 -- UserController.findOne

  - [ ] 修改個人資料 -- UserController.update(?)

  - [ ] 修改密碼 -- UserController.updatePassword(?) 

    > 有需要跟修改個人資料合併嗎?

- [ ] 教室可借用時段 -- Schedule.findClassroomWeekSchedule

- [ ] 設備教室借用申請

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

    - 課程代碼（無關學期）

      > 或許課程也需要CRUD?

    - 選課序號

    - 上課教室

    - 上課老師

    - 課程時段

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