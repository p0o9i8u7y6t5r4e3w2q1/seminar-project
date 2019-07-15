//角色
export enum RoleType {
  TA = 1,
  Teacher = 2,
  DeptHead = 3,
  Staff = 4,
}

//節次
export enum Period {
  p0 = '0',
  p1 = '1',
  p2 = '2',
  p3 = '3',
  p4 = '4',
  p5 = '5',
  p6 = '6',
  p7 = '7',
  p8 = '8',
  pA = 'A',
  pB = 'B',
  pC = 'C',
  pD = 'D',
  pE = 'E',
}

//星期
export enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

//設備教室申請進度 RoomReserving的Progress
export enum BookingProgress {
  Rejected = 0,
  Approved = 1,
  Pending = 2,
  StaffApproved = 3,
  DeptApproved = 4,
}

//補課申請狀態
export enum MakeupCourseProgress {
  Rejected = 0,
  Approved = 1,
  Pending = 2,
}

//課程異動，新增或刪除
export enum ScheduleChangeType {
  Deleted = 0,
  Added = 1,
}

//設備狀態
export enum EquipmentStatus {
  InRepair = 0,
  Borrowed = 1,
  Available = 2,
}

export enum EquipmemtType {
  Projector = 'A',
  Pointer = 'B',
  ProjectorScreen = 'C',
  PlugAdapter = 'D',
  ExtensionCord = 'D',
  Laptop = 'E',
  SingleLens = 'F',
}

//教室狀態
export enum RoomStatus {
  Empty = 0,
  SuspendedClass = 1,
  NormalClass = 2,
  MakeupClass = 3,
  Reserved = 4,
  MakeupClassAppli_Pending = 5,
  ReserveAppli_Pending = 6,
}

//嗶卡成功或失敗
export enum SwipeStudentIDCard {
  Failed = 0,
  Success_TurnOn = 1,
  Success_TurnOff = 2,
}
