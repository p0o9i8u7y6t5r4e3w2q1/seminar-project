export const TimeRegExp = new RegExp(
  /\[[0-6]\][0-9A-EN](\-[0-9A-EN])?(,\[[0-6]\][0-9A-EN](-[0-9A-EN]))*/,
);

/* ---- Enum ---- */
// 權限
export enum Auth {
  LOGIN = 0,
  COURSE_CHANGE = 1,
  TA_SETTING = 2,
  CHECK_BOOKING = 3,
  CHECK_MAKEUP = 4,
  MEMEBER_MANAGEMENT = 5,
  SEMESTER_COURSE = 6,
  CARD_RECORD = 7,
}

// 角色
export enum RoleType {
  TA = 1,
  Teacher = 2,
  DeptHead = 3,
  Staff = 4,
}

// 星期
export enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// 審核人的審核進度
export enum PersonCheckStatus {
  Rejected = 0,
  Approved = 1,
  UnChecked = 2,
}

// 申請進度
export enum FormProgress {
  Rejected = 0,
  Approved = 1,
  Pending = 2,
  DeptHeadApproved = 3,
  StaffApproved = 4,
}

// // 設備教室申請進度 RoomReserving的Progress
// export enum BookingProgress {
//   Rejected = 0,
//   Approved = 1,
//   Pending = 2,
//   StaffApproved = 3,
//   DeptApproved = 4,
// }
//
// // 補課申請狀態
// export enum MakeupCourseProgress {
//   Rejected = 0,
//   Approved = 1,
//   Pending = 2,
// }

// 課程異動，新增或刪除
export enum ScheduleChangeType {
  Deleted = 0,
  Added = 1,
}

// 設備狀態
export enum EquipmentStatus {
  Available = 0,
  Borrowed = 1,
  InRepair = 2,
}

export enum EquipmemtType {
  Projector = 'A',
  Microphone = 'B',
  MiniMic = 'C', // 小蜜蜂麥克風
  PresentationRemote = 'D', // 簡報筆
  ProjectionScreen = 'E', // 投影屏幕
  ExtensionCord = 'F', // 延長線
  Laptop = 'G',
}

// 教室狀態
export enum RoomStatus {
  Empty = 0,
  SuspendedCourse = 1,
  NormalCourse = 2,
  MakeupCourse = 3,
  Reserved = 4,
  Pending = 5,
}

// 嗶卡成功或失敗
export enum SwipeCardResult {
  Failed = 0,
  Success_TurnOn = 1,
  Success_TurnOff = 2,
}

/* ---- Array ---- */

export const FormPendingProgress: number[] = [
  FormProgress.Pending,
  FormProgress.StaffApproved,
  FormProgress.DeptHeadApproved,
];

export const FormCheckedProgress: number[] = [
  FormProgress.Rejected,
  FormProgress.Approved,
];

// 教室空閒狀態
export const RoomEmptyStatus: number[] = [
  RoomStatus.Empty,
  RoomStatus.SuspendedCourse,
  RoomStatus.Pending,
];

export const RoomOccupyStatus: number[] = [
  RoomStatus.NormalCourse,
  RoomStatus.MakeupCourse,
  RoomStatus.Reserved,
];

// 節次
export const Period: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  'N',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
];
