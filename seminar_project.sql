--
-- 資料庫： `seminar_project`
--

CREATE DATABASE IF NOT EXISTS `seminar-project` DEFAULT CHARACTER SET utf8;
USE `seminar-project` ;

-- --------------------------------------------------------

--
-- 資料表結構 `alternatecard`
--

CREATE TABLE `alternatecard` (
  `id` char(6) NOT NULL,
  `card_uid` char(8) DEFAULT NULL,
  `card_name` varchar(32) NOT NULL,
  `room_id` char(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `alternatecard`
--

INSERT INTO `alternatecard` (`id`, `card_uid`, `card_name`, `room_id`) VALUES
('61101A', 'ROOM101A', '61101備用卡A', '61101'),
('61102A', 'ROOM102A', '61102備用卡A', '61102'),
('61103A', 'ROOM103A', '61103備用卡A', '61103'),
('61104A', 'ROOM104A', '61104備用卡A', '61104'),
('61104B', 'ROOM104B', '61104備用卡B', '61104'),
('61200A', 'ROOM200A', '61200備用卡A', '61200'),
('61201A', 'ROOM201A', '61201備用卡A', '61201'),
('61202A', 'ROOM202A', '61202備用卡A', '61202'),
('61204A', 'ROOM204A', '61204備用卡A', '61204'),
('61206A', 'ROOM206A', '61206備用卡A', '61206'),
('61208A', 'ROOM208A', '61208備用卡A', '61208'),
('61210A', 'ROOM210A', '61210備用卡A', '61210'),
('61306A', 'ROOM306A', '61306備用卡A', '61306'),
('61321A', 'ROOM321A', '61321備用卡A', '61321');

-- --------------------------------------------------------

--
-- 資料表結構 `authorization`
--

CREATE TABLE `authorization` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `authorization`
--

INSERT INTO `authorization` (`id`, `name`) VALUES
(1, '新增、刪除臨時課程時間'),
(2, '編輯課程助教'),
(3, '借用審核'),
(4, '補課審核'),
(5, '管理成員'),
(6, '編輯學期課程'),
(7, '刷卡紀錄查詢');

-- --------------------------------------------------------

--
-- 資料表結構 `booking_equipment`
--

CREATE TABLE `booking_equipment` (
  `form_id` int(11) NOT NULL,
  `equip_id` char(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `booking_form`
--

CREATE TABLE `booking_form` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `is_iim_member` tinyint(4) NOT NULL,
  `applicant_id` varchar(9) DEFAULT NULL,
  `applicant_name` varchar(32) DEFAULT NULL,
  `applicant_email` varchar(64) NOT NULL,
  `reason` varchar(32) NOT NULL,
  `room_id` char(5) NOT NULL,
  `date` date NOT NULL,
  `start_p_id` char(1) NOT NULL,
  `end_p_id` char(1) NOT NULL,
  `depthead_check` tinyint(4) NOT NULL,
  `staff_check` tinyint(4) NOT NULL,
  `progress` tinyint(4) NOT NULL,
  `total_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `card_record`
--

CREATE TABLE `card_record` (
  `id` int(11) NOT NULL,
  `card_uid` char(8) NOT NULL,
  `record_time` datetime NOT NULL,
  `room_id` char(5) NOT NULL,
  `swipe_result` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `classroom`
--

CREATE TABLE `classroom` (
  `id` char(5) NOT NULL,
  `type` varchar(32) NOT NULL,
  `capacity` smallint(6) NOT NULL,
  `price` int(11) NOT NULL COMMENT '半日價'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `classroom`
--

INSERT INTO `classroom` (`id`, `type`, `capacity`, `price`) VALUES
('61000', '貴賓室', 12, 4000),
('61101', '教室', 102, 1500),
('61102', '小階梯教室', 78, 3000),
('61103', '多功能教室', 63, 3000),
('61104', '教室', 68, 1500),
('61200', '階梯講堂', 136, 6000),
('61201', '電腦教室', 45, 5000),
('61202', '教室', 24, 1000),
('61204', '教室', 35, 1000),
('61206', '多功能講堂', 38, 4000),
('61208', '教室', 56, 1500),
('61210', '教室', 21, 1000),
('61306', '大型會議室', 30, 5000),
('61321', '小型會議室', 12, 3000);

-- --------------------------------------------------------

--
-- 資料表結構 `course`
--

CREATE TABLE `course` (
  `id` char(7) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `course`
--

INSERT INTO `course` (`id`, `name`) VALUES
('H311100', '計算機概論'),
('H318300', '工業管理概論'),
('H320100', '管理學'),
('H320300', '計算機程式及應用'),
('H321110', '統計學（一）'),
('H321200', '設施規劃'),
('H321500', '線性代數'),
('H330300', '隨機過程'),
('H330400', '系統分析與設計'),
('H330500', '生產與作業管理'),
('H331100', '決策方法'),
('H333401', '資料結構'),
('H335100', '資訊安全與倫理'),
('H335700', 'VBA巨集開發與應用'),
('H337100', '人因工程學'),
('H337300', '機率論'),
('H343401', '組織行為'),
('H343500', '策略管理'),
('H344700', '醫療品質管理'),
('H344900', '雲端行動應用'),
('H347100', '財務管理'),
('R311100', '不確定決策方法'),
('R350031', '專題討論（三）'),
('R351200', '經驗模式方法'),
('R352800', '庫存系統'),
('R353100', '類神經網路應用'),
('R354500', '產業電子化策略'),
('R354600', '多變量分析與應用'),
('R355800', '資料探勘'),
('R358900', '品質經營管理'),
('R359800', '進階VBA巨集開發與應用'),
('R360500', '決策方法'),
('R363600', '可靠度管理'),
('R363700', '供應鏈管理'),
('R364200', '工業管理專題'),
('R370100', '數學規劃'),
('R370700', '最佳化模式及應用'),
('R370900', '實體性人因工程'),
('R380303', '專題討論'),
('R380400', '知識工程'),
('R381210', '專題討論（一）'),
('R381231', '專題討論（三）'),
('R384700', '組織行為'),
('R750600', '網路管理'),
('R751500', '系統動力學與管理'),
('R770200', '網路安全');

-- --------------------------------------------------------

--
-- 資料表結構 `enrollment`
--

CREATE TABLE `enrollment` (
  `sc_id` varchar(12) NOT NULL,
  `stud_id` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `enrollment`
--

INSERT INTO `enrollment` (`sc_id`, `stud_id`) VALUES
('1072H320300', 'H34051128'),
('1072H335700', 'H34051128'),
('1072H320300', 'H34054087'),
('1072H335700', 'H34055041');

-- --------------------------------------------------------

--
-- 資料表結構 `equipment`
--

CREATE TABLE `equipment` (
  `id` char(3) NOT NULL,
  `name` varchar(32) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `type` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `equipment`
--

INSERT INTO `equipment` (`id`, `name`, `status`, `type`) VALUES
('A01', '投影機01', 0, 'A'),
('A02', '投影機02', 0, 'A'),
('A03', '投影機03', 0, 'A'),
('A04', '投影機04', 0, 'A'),
('A05', '投影機05', 0, 'A'),
('B01', '麥克風01', 0, 'B'),
('B02', '麥克風02', 0, 'B'),
('B03', '麥克風03', 0, 'B'),
('C01', '小蜜蜂01', 0, 'C'),
('C02', '小蜜蜂02', 0, 'C'),
('C03', '小蜜蜂03', 0, 'C'),
('D01', '簡報筆01', 0, 'D'),
('D02', '簡報筆02', 0, 'D'),
('E01', '投影幕01', 0, 'E'),
('E02', '投影幕02', 0, 'E'),
('F01', '延長線01', 0, 'F'),
('F02', '延長線02', 0, 'F'),
('G01', '筆電01', 0, 'G'),
('G02', '筆電02', 0, 'G'),
('G03', '筆電03', 0, 'G');

-- --------------------------------------------------------

--
-- 資料表結構 `makeup_course_form`
--

CREATE TABLE `makeup_course_form` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `person_id` varchar(9) NOT NULL,
  `sc_id` varchar(12) NOT NULL,
  `date` date NOT NULL,
  `start_p_id` char(1) NOT NULL,
  `end_p_id` char(1) NOT NULL,
  `progress` tinyint(4) NOT NULL,
  `room_id` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, '助教	'),
(2, '教授'),
(3, '系主任'),
(4, '系辦公室');

-- --------------------------------------------------------

--
-- 資料表結構 `role_auth`
--

CREATE TABLE `role_auth` (
  `role_id` int(11) NOT NULL,
  `auth_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `role_auth`
--

INSERT INTO `role_auth` (`role_id`, `auth_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7);

-- --------------------------------------------------------

--
-- 資料表結構 `schedule`
--

CREATE TABLE `schedule` (
  `year` tinyint(4) NOT NULL,
  `semester` tinyint(4) NOT NULL,
  `weekday` tinyint(4) NOT NULL,
  `p_id` char(1) NOT NULL,
  `room_id` char(5) NOT NULL,
  `sc_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `schedule`
--

INSERT INTO `schedule` (`year`, `semester`, `weekday`, `p_id`, `room_id`, `sc_id`) VALUES
(107, 1, 3, '6', '61201', '1071H344900'),
(107, 1, 3, '7', '61201', '1071H344900'),
(107, 1, 3, '8', '61201', '1071H344900'),
(107, 2, 1, '2', '61101', '1072H320300'),
(107, 2, 3, '2', '61101', '1072H320300'),
(107, 2, 1, '3', '61101', '1072H320300'),
(107, 2, 1, '1', '61201', '1072H335700'),
(107, 2, 1, '2', '61201', '1072H335700'),
(107, 2, 1, '3', '61201', '1072H335700'),
(108, 1, 1, '2', '61101', '1081H311100'),
(108, 1, 3, '2', '61101', '1081H311100'),
(108, 1, 1, '3', '61101', '1081H311100'),
(108, 1, 4, '2', '61101', '1081H318300'),
(108, 1, 2, '3', '61101', '1081H318300'),
(108, 1, 2, '4', '61101', '1081H318300'),
(108, 1, 1, '2', '61200', '1081H320100'),
(108, 1, 3, '2', '61200', '1081H320100'),
(108, 1, 1, '3', '61200', '1081H320100'),
(108, 1, 2, '1', '61101', '1081H321110'),
(108, 1, 4, '3', '61101', '1081H321110'),
(108, 1, 4, '4', '61101', '1081H321110'),
(108, 1, 4, '2', '61202', '1081H321200'),
(108, 1, 2, '3', '61202', '1081H321200'),
(108, 1, 2, '4', '61202', '1081H321200'),
(108, 1, 1, '5', '61103', '1081H321500'),
(108, 1, 1, '6', '61103', '1081H321500'),
(108, 1, 3, '7', '61103', '1081H321500'),
(108, 1, 2, '1', '61104', '1081H330300'),
(108, 1, 4, '3', '61104', '1081H330300'),
(108, 1, 4, '4', '61104', '1081H330300'),
(108, 1, 5, '1', '61101', '1081H330400'),
(108, 1, 3, '5', '61101', '1081H330400'),
(108, 1, 3, '6', '61101', '1081H330400'),
(108, 1, 4, '2', '61104', '1081H330500'),
(108, 1, 2, '3', '61104', '1081H330500'),
(108, 1, 2, '4', '61104', '1081H330500'),
(108, 1, 2, '2', '61104', '1081H331100'),
(108, 1, 5, '3', '61104', '1081H331100'),
(108, 1, 5, '4', '61104', '1081H331100'),
(108, 1, 5, '2', '61102', '1081H333401'),
(108, 1, 3, '3', '61102', '1081H333401'),
(108, 1, 3, '4', '61102', '1081H333401'),
(108, 1, 1, '2', '61103', '1081H335100'),
(108, 1, 3, '2', '61103', '1081H335100'),
(108, 1, 1, '3', '61103', '1081H335100'),
(108, 1, 2, '2', '61103', '1081H337100'),
(108, 1, 5, '3', '61103', '1081H337100'),
(108, 1, 5, '4', '61103', '1081H337100'),
(108, 1, 2, '5', '61103', '1081H337300'),
(108, 1, 2, '6', '61103', '1081H337300'),
(108, 1, 5, '8', '61103', '1081H337300'),
(108, 1, 1, '5', '61101', '1081H343401'),
(108, 1, 1, '6', '61101', '1081H343401'),
(108, 1, 3, '7', '61101', '1081H343401'),
(108, 1, 4, '2', '61103', '1081H343500'),
(108, 1, 4, '3', '61103', '1081H343500'),
(108, 1, 4, '4', '61103', '1081H343500'),
(108, 1, 2, '1', '61102', '1081H344700'),
(108, 1, 4, '3', '61102', '1081H344700'),
(108, 1, 4, '4', '61102', '1081H344700'),
(108, 1, 2, '6', '61201', '1081H344900'),
(108, 1, 2, '7', '61201', '1081H344900'),
(108, 1, 2, '8', '61201', '1081H344900'),
(108, 1, 5, '2', '61104', '1081H347100'),
(108, 1, 3, '3', '61104', '1081H347100'),
(108, 1, 3, '4', '61104', '1081H347100'),
(108, 1, 5, '2', '61208', '1081R311100'),
(108, 1, 2, '3', '61208', '1081R311100'),
(108, 1, 2, '4', '61208', '1081R311100'),
(108, 1, 4, '7', '61200', '1081R350031'),
(108, 1, 4, '8', '61200', '1081R350031'),
(108, 1, 2, '6', '61208', '1081R351200'),
(108, 1, 2, '7', '61208', '1081R351200'),
(108, 1, 2, '8', '61208', '1081R351200'),
(108, 1, 4, '3', '61202', '1081R352800'),
(108, 1, 2, '6', '61202', '1081R352800'),
(108, 1, 2, '7', '61202', '1081R352800'),
(108, 1, 2, '2', '61206', '1081R353100'),
(108, 1, 4, '3', '61206', '1081R353100'),
(108, 1, 4, '4', '61206', '1081R353100'),
(108, 1, 1, '6', '61206', '1081R354500'),
(108, 1, 1, '7', '61206', '1081R354500'),
(108, 1, 1, '8', '61206', '1081R354500'),
(108, 1, 1, '1', '61201', '1081R3546001'),
(108, 1, 1, '2', '61201', '1081R3546001'),
(108, 1, 1, '3', '61201', '1081R3546001'),
(108, 1, 3, 'B', '61201', '1081R3546002'),
(108, 1, 3, 'C', '61201', '1081R3546002'),
(108, 1, 3, 'D', '61201', '1081R3546002'),
(108, 1, 1, '5', '61204', '1081R355800'),
(108, 1, 1, '6', '61204', '1081R355800'),
(108, 1, 3, '7', '61204', '1081R355800'),
(108, 1, 3, '6', '61208', '1081R358900'),
(108, 1, 3, '7', '61208', '1081R358900'),
(108, 1, 3, '8', '61208', '1081R358900'),
(108, 1, 2, 'B', '61201', '1081R359800'),
(108, 1, 2, 'C', '61201', '1081R359800'),
(108, 1, 2, 'D', '61201', '1081R359800'),
(108, 1, 4, 'B', '61206', '1081R360500'),
(108, 1, 4, 'C', '61206', '1081R360500'),
(108, 1, 4, 'D', '61206', '1081R360500'),
(108, 1, 4, '2', '61206', '1081R363600'),
(108, 1, 2, '3', '61206', '1081R363600'),
(108, 1, 2, '4', '61206', '1081R363600'),
(108, 1, 1, '6', '61208', '1081R363700'),
(108, 1, 1, '7', '61208', '1081R363700'),
(108, 1, 1, '8', '61208', '1081R363700'),
(108, 1, 5, 'B', '61208', '1081R364200'),
(108, 1, 5, 'C', '61208', '1081R364200'),
(108, 1, 5, 'D', '61208', '1081R364200'),
(108, 1, 2, '1', '61204', '1081R370100'),
(108, 1, 4, '3', '61204', '1081R370100'),
(108, 1, 4, '4', '61204', '1081R370100'),
(108, 1, 3, '5', '61206', '1081R370700'),
(108, 1, 3, '6', '61206', '1081R370700'),
(108, 1, 3, 'N', '61206', '1081R370700'),
(108, 1, 2, '5', '61206', '1081R370900'),
(108, 1, 5, '5', '61206', '1081R370900'),
(108, 1, 5, '6', '61206', '1081R370900'),
(108, 1, 4, '6', '61202', '1081R380303'),
(108, 1, 2, '3', '61204', '1081R3804001'),
(108, 1, 3, '3', '61204', '1081R3804001'),
(108, 1, 2, '4', '61204', '1081R3804001'),
(108, 1, 3, 'B', '61206', '1081R3804002'),
(108, 1, 3, 'C', '61206', '1081R3804002'),
(108, 1, 3, 'D', '61206', '1081R3804002'),
(108, 1, 4, '5', '61102', '1081R3812101'),
(108, 1, 4, '5', '61202', '1081R3812103'),
(108, 1, 4, '5', '61206', '1081R381231'),
(108, 1, 5, '6', '61208', '1081R384700'),
(108, 1, 5, '7', '61208', '1081R384700'),
(108, 1, 5, '8', '61208', '1081R384700'),
(108, 1, 2, '1', '61208', '1081R750600'),
(108, 1, 4, '3', '61208', '1081R750600'),
(108, 1, 4, '4', '61208', '1081R750600'),
(108, 1, 1, '1', '61204', '1081R7515001'),
(108, 1, 1, '2', '61204', '1081R7515001'),
(108, 1, 1, '3', '61204', '1081R7515001'),
(108, 1, 2, 'B', '61206', '1081R7515002'),
(108, 1, 2, 'C', '61206', '1081R7515002'),
(108, 1, 2, 'D', '61206', '1081R7515002'),
(108, 1, 1, '5', '61202', '1081R770200'),
(108, 1, 1, '6', '61202', '1081R770200'),
(108, 1, 3, '7', '61202', '1081R770200');

-- --------------------------------------------------------

--
-- 資料表結構 `schedule_change`
--

CREATE TABLE `schedule_change` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `room_id` char(5) NOT NULL,
  `date` date NOT NULL,
  `start_p_id` char(1) NOT NULL,
  `end_p_id` char(1) NOT NULL,
  `sc_id` varchar(12) DEFAULT NULL,
  `form_id` char(8) DEFAULT NULL,
  `type` tinyint(4) NOT NULL,
  `person_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `semester`
--

CREATE TABLE `semester` (
  `year` tinyint(4) NOT NULL,
  `semester` tinyint(1) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `cou_start_date` date NOT NULL,
  `cou_end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `semester`
--

INSERT INTO `semester` (`year`, `semester`, `start_date`, `end_date`, `cou_start_date`, `cou_end_date`) VALUES
(107, 1, '2018-08-01', '2019-01-31', '2018-09-10', '2019-01-11'),
(107, 2, '2019-02-01', '2019-07-31', '2019-02-18', '2019-07-21'),
(108, 1, '2019-08-01', '2020-01-31', '2019-09-09', '2020-01-10');

-- --------------------------------------------------------

--
-- 資料表結構 `semester_course`
--

CREATE TABLE `semester_course` (
  `id` varchar(12) NOT NULL,
  `year` tinyint(4) NOT NULL,
  `semester` tinyint(4) NOT NULL,
  `cou_id` char(7) NOT NULL,
  `cou_no` varchar(1) NOT NULL,
  `tch_id` char(8) DEFAULT NULL,
  `room_id` char(5) DEFAULT NULL,
  `time` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `semester_course`
--

INSERT INTO `semester_course` (`id`, `year`, `semester`, `cou_id`, `cou_no`, `tch_id`, `room_id`, `time`) VALUES
('1071H344900', 107, 1, 'H344900', '', '11100022', '61201', '[2]6~8'),
('1072H320300', 107, 2, 'H320300', '', '11100022', '61101', '[1]2~3,[3]2'),
('1072H335700', 107, 2, 'H335700', '', '11100020', '61201', '[1]1~3'),
('1081H311100', 108, 1, 'H311100', '', '11100011', '61101', '[1]2~3,[3]2'),
('1081H318300', 108, 1, 'H318300', '', '11100020', '61101', '[2]3~4,[4]2'),
('1081H320100', 108, 1, 'H320100', '', '11100003', '61200', '[1]2~3,[3]2'),
('1081H321110', 108, 1, 'H321110', '', '11100009', '61101', '[2]1,[4]3~4'),
('1081H321200', 108, 1, 'H321200', '', '11100008', '61202', '[2]3~4,[4]2'),
('1081H321500', 108, 1, 'H321500', '', '11100019', '61103', '[1]5~6,[3]7'),
('1081H330300', 108, 1, 'H330300', '', '11100001', '61104', '[2]1,[4]3~4'),
('1081H330400', 108, 1, 'H330400', '', '11100014', '61101', '[3]5~6,[5]1'),
('1081H330500', 108, 1, 'H330500', '', '11100007', '61104', '[2]3~4,[4]2'),
('1081H331100', 108, 1, 'H331100', '', '11100005', '61104', '[2]2,[5]3~4'),
('1081H333401', 108, 1, 'H333401', '', '11100013', '61102', '[3]3~4,[5]2'),
('1081H335100', 108, 1, 'H335100', '', '11100012', '61103', '[1]2~3,[3]2'),
('1081H337100', 108, 1, 'H337100', '', '11100018', '61103', '[2]2,[5]3~4'),
('1081H337300', 108, 1, 'H337300', '', '11100015', '61103', '[2]5~6,[5]8'),
('1081H343401', 108, 1, 'H343401', '', '11100010', '61101', '[1]5~6,[3]7'),
('1081H343500', 108, 1, 'H343500', '', '11100004', '61103', '[4]2~4'),
('1081H344700', 108, 1, 'H344700', '', '11100006', '61102', '[2]1,[4]3~4'),
('1081H344900', 108, 1, 'H344900', '', '11100022', '61201', '[2]6~8'),
('1081H347100', 108, 1, 'H347100', '', '11100016', '61104', '[3]3~4,[5]2'),
('1081R311100', 108, 1, 'R311100', '', '11100005', '61208', '[2]3~4,[5]2'),
('1081R350031', 108, 1, 'R350031', '', '11100016', '61200', '[4]7~8'),
('1081R351200', 108, 1, 'R351200', '', '11100021', '61208', '[2]6~8'),
('1081R352800', 108, 1, 'R352800', '', '11100008', '61202', '[2]6~7,[4]3'),
('1081R353100', 108, 1, 'R353100', '', '11100007', '61206', '[2]2,[4]3~4'),
('1081R354500', 108, 1, 'R354500', '', '11100006', '61206', '[1]6~8'),
('1081R3546001', 108, 1, 'R354600', '1', '11100019', '61201', '[1]1~3'),
('1081R3546002', 108, 1, 'R354600', '2', '11100019', '61201', '[3]B~D'),
('1081R355800', 108, 1, 'R355800', '', '11100012', '61204', '[1]5~6,[3]7'),
('1081R358900', 108, 1, 'R358900', '', '11100004', '61208', '[3]6~8'),
('1081R359800', 108, 1, 'R359800', '', '11100020', '61201', '[2]B~D'),
('1081R360500', 108, 1, 'R360500', '', '11100015', '61206', '[4]B~D'),
('1081R363600', 108, 1, 'R363600', '', '11100009', '61206', '[2]3~4,[4]2'),
('1081R363700', 108, 1, 'R363700', '', '11100020', '61208', '[1]6~8'),
('1081R364200', 108, 1, 'R364200', '', '11100002', '61208', '[5]B~D'),
('1081R370100', 108, 1, 'R370100', '', '11100016', '61204', '[2]1,[4]3~4'),
('1081R370700', 108, 1, 'R370700', '', '11100013', '61206', '[3]N~6'),
('1081R370900', 108, 1, 'R370900', '', '11100018', '61206', '[2]5,[5]5~6'),
('1081R380303', 108, 1, 'R380303', '', '11100002', '61202', '[4]6'),
('1081R3804001', 108, 1, 'R380400', '1', '11100011', '61204', '[2]3~4,[3]3'),
('1081R3804002', 108, 1, 'R380400', '2', '11100011', '61206', '[3]B~D'),
('1081R3812101', 108, 1, 'R381210', '1', '11100021', '61102', '[4]5'),
('1081R3812102', 108, 1, 'R381210', '2', '11100015', '61206', '[4]5'),
('1081R3812103', 108, 1, 'R381210', '3', '11100020', '61202', '[4]5'),
('1081R381231', 108, 1, 'R381231', '', '11100015', '61206', '[4]5'),
('1081R384700', 108, 1, 'R384700', '', '11100003', '61208', '[5]6~8'),
('1081R750600', 108, 1, 'R750600', '', '11100002', '61208', '[2]1,[4]3~4'),
('1081R7515001', 108, 1, 'R751500', '1', '11100014', '61204', '[1]1~3'),
('1081R7515002', 108, 1, 'R751500', '2', '11100014', '61206', '[2]B~D'),
('1081R770200', 108, 1, 'R770200', '', '11100022', '61202', '[1]5~6,[3]7');

-- --------------------------------------------------------

--
-- 資料表結構 `staff`
--

CREATE TABLE `staff` (
  `id` char(8) NOT NULL,
  `card_uid` char(8) DEFAULT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `staff`
--

INSERT INTO `staff` (`id`, `card_uid`, `name`) VALUES
('99900001', 'ADMIN001', '游志琦'),
('99900002', 'ADMIN002', '陳賢豪');

-- --------------------------------------------------------

--
-- 資料表結構 `student`
--

CREATE TABLE `student` (
  `id` char(9) NOT NULL,
  `card_uid` char(8) DEFAULT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `student`
--

INSERT INTO `student` (`id`, `card_uid`, `name`) VALUES
('D54051365', 'STUD1365', '賈柱轎'),
('H34051128', 'STUD1128', '黃懿'),
('H34054087', 'STUD4087', '蔡函璇'),
('H34055041', 'STUD5041', '林佳妤'),
('H34056039', 'STUD6039', '趙新宜');

-- --------------------------------------------------------

--
-- 資料表結構 `ta`
--

CREATE TABLE `ta` (
  `stud_id` char(9) NOT NULL,
  `sc_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `ta`
--

INSERT INTO `ta` (`stud_id`, `sc_id`) VALUES
('D54051365', '1072H320300');

-- --------------------------------------------------------

--
-- 資料表結構 `teacher`
--

CREATE TABLE `teacher` (
  `id` char(8) NOT NULL,
  `card_uid` char(8) DEFAULT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `teacher`
--

INSERT INTO `teacher` (`id`, `card_uid`, `name`) VALUES
('11100001', 'TCH00001', '高強'),
('11100002', 'TCH00002', '王惠嘉'),
('11100003', 'TCH00003', '利德江'),
('11100004', 'TCH00004', '林清河'),
('11100005', 'TCH00005', '陳梁軒'),
('11100006', 'TCH00006', '呂執中'),
('11100007', 'TCH00007', '王泰裕'),
('11100008', 'TCH00008', '李賢得'),
('11100009', 'TCH00009', '謝中奇'),
('11100010', 'TCH00010', '黃宇翔'),
('11100011', 'TCH00011', '李昇暾'),
('11100012', 'TCH00012', '翁慈宗'),
('11100013', 'TCH00013', '王逸琳'),
('11100014', 'TCH00014', '王維聰'),
('11100015', 'TCH00015', '蔡青志'),
('11100016', 'TCH00016', '張秀雲'),
('11100017', 'TCH00017', '謝佩璇'),
('11100018', 'TCH00018', '林明毅'),
('11100019', 'TCH00019', '胡政宏'),
('11100020', 'TCH00020', '吳政翰'),
('11100021', 'TCH00021', '張裕清'),
('11100022', 'TCH00022', '劉任修');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` varchar(9) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `password`, `name`, `email`, `role_id`) VALUES
('11100002', '0000', '王惠嘉', 'hcwang@mail.ncku.edu.tw', 3),
('11100001', '0000', '高強', 'ckao@mail.ncku.edu.tw', 2),
('11100003', '0000', '利德江', 'lidc@mail.ncku.edu.tw', 2),
('11100004', '0000', '林清河', 'linn@mail.ncku.edu.tw', 2),
('11100005', '0000', '陳梁軒', 'lhchen@mail.ncku.edu.tw', 2),
('11100006', '0000', '呂執中', 'jlyu@mail.ncku.edu.tw', 2),
('11100007', '0000', '王泰裕', 'tywang@mail.ncku.edu.tw', 2),
('11100008', '0000', '李賢得', 'sdlee@mail.ncku.edu.tw', 2),
('11100009', '0000', '謝中奇', 'jcchsieh@mail.ncku.edu.tw', 2),
('11100010', '0000', '黃宇翔', 'yshuang@mail.ncku.edu.tw', 2),
('11100011', '0000', '李昇暾', 'stli@mail.ncku.edu.tw', 2),
('11100012', '0000', '翁慈宗', 'tzutsung@mail.ncku.edu.tw', 2),
('11100013', '0000', '王逸琳', 'ilinwang@mail.ncku.edu.tw', 2),
('11100014', '0000', '王維聰', 'wtwang@mail.ncku.edu.tw', 2),
('11100015', '0000', '蔡青志', 'sctsai@mail.ncku.edu.tw', 2),
('11100016', '0000', '張秀雲', 'shiowyun@mail.ncku.edu.tw', 2),
('11100017', '0000', '謝佩璇', 'peihsuan@mail.ncku.edu.tw', 2),
('11100018', '0000', '林明毅', 'brandonl@mail.ncku.edu.tw', 2),
('11100019', '0000', '胡政宏', 'chhu@mail.ncku.edu.tw', 2),
('11100020', '0000', '吳政翰', 'wuchan@mail.ncku.edu.tw', 2),
('11100021', '0000', '張裕清', 'ycchang@mail.ncku.edu.tw', 2),
('11100022', '0000', '劉任修', 'rsliu@mail.ncku.edu.tw', 2),
('99900001', '0000', '游志琦', 'grace54@mail.ncku.edu.tw', 4),
('99900002', '0000', '陳賢豪', 'em53100@email.ncku.edu.tw', 4),
('D54051365', '0000', '賈柱轎', 'D54051365@mail.ncku.edu.tw', 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `alternatecard`
--
ALTER TABLE `alternatecard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f3edfd03c7b3ecdb6068b3fd15d` (`room_id`);

--
-- 資料表索引 `authorization`
--
ALTER TABLE `authorization`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `booking_equipment`
--
ALTER TABLE `booking_equipment`
  ADD PRIMARY KEY (`form_id`,`equip_id`),
  ADD KEY `IDX_80a6e7c4eca4baa566b56dccc4` (`form_id`),
  ADD KEY `IDX_352d399b6ec329b18f67640207` (`equip_id`);

--
-- 資料表索引 `booking_form`
--
ALTER TABLE `booking_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5b9f1dfb73e40922cea0b92a8a3` (`room_id`);

--
-- 資料表索引 `card_record`
--
ALTER TABLE `card_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ecec44d72829d5e206d364ce39c` (`room_id`);

--
-- 資料表索引 `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`sc_id`,`stud_id`),
  ADD KEY `IDX_1c2d36f07931a192f77137c457` (`sc_id`),
  ADD KEY `IDX_461f704e7c13e793abaf69374b` (`stud_id`);

--
-- 資料表索引 `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `makeup_course_form`
--
ALTER TABLE `makeup_course_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_adf57ac0d8017ab9116b92bd387` (`sc_id`);

--
-- 資料表索引 `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `role_auth`
--
ALTER TABLE `role_auth`
  ADD PRIMARY KEY (`role_id`,`auth_id`),
  ADD KEY `IDX_9e4be4f69e3cd7390336686be0` (`role_id`),
  ADD KEY `IDX_5f30e348ec703c557f1256f333` (`auth_id`);

--
-- 資料表索引 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`year`,`semester`,`room_id`,`p_id`,`weekday`),
  ADD KEY `FK_017c44638c80d285dd42221f460` (`room_id`),
  ADD KEY `FK_76b6353f7dbd941dbb74296265a` (`sc_id`);

--
-- 資料表索引 `schedule_change`
--
ALTER TABLE `schedule_change`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d726966004c4aab14971eba5a2a` (`room_id`),
  ADD KEY `FK_3ec11cbe90769775e82a3edd75f` (`sc_id`);

--
-- 資料表索引 `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`year`,`semester`);

--
-- 資料表索引 `semester_course`
--
ALTER TABLE `semester_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4217fe14088e4af00c0f0150dba` (`cou_id`),
  ADD KEY `FK_c1f8edaf8f142e422ae7b760d0a` (`tch_id`),
  ADD KEY `FK_529a5cb015c6018e9f1a35a4073` (`room_id`);

--
-- 資料表索引 `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `ta`
--
ALTER TABLE `ta`
  ADD PRIMARY KEY (`stud_id`,`sc_id`),
  ADD KEY `IDX_a46883fcfd5b924f31bff0f65f` (`stud_id`),
  ADD KEY `IDX_769a8dce3c295f83b50a432ea2` (`sc_id`);

--
-- 資料表索引 `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_fb2e442d14add3cefbdf33c4561` (`role_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `booking_form`
--
ALTER TABLE `booking_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `card_record`
--
ALTER TABLE `card_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `makeup_course_form`
--
ALTER TABLE `makeup_course_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `schedule_change`
--
ALTER TABLE `schedule_change`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `alternatecard`
--
ALTER TABLE `alternatecard`
  ADD CONSTRAINT `FK_f3edfd03c7b3ecdb6068b3fd15d` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的限制式 `booking_equipment`
--
ALTER TABLE `booking_equipment`
  ADD CONSTRAINT `FK_352d399b6ec329b18f676402072` FOREIGN KEY (`equip_id`) REFERENCES `equipment` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_80a6e7c4eca4baa566b56dccc45` FOREIGN KEY (`form_id`) REFERENCES `booking_form` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `booking_form`
--
ALTER TABLE `booking_form`
  ADD CONSTRAINT `FK_5b9f1dfb73e40922cea0b92a8a3` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的限制式 `card_record`
--
ALTER TABLE `card_record`
  ADD CONSTRAINT `FK_ecec44d72829d5e206d364ce39c` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的限制式 `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `FK_1c2d36f07931a192f77137c4578` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_461f704e7c13e793abaf69374b5` FOREIGN KEY (`stud_id`) REFERENCES `student` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `makeup_course_form`
--
ALTER TABLE `makeup_course_form`
  ADD CONSTRAINT `FK_adf57ac0d8017ab9116b92bd387` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`);

--
-- 資料表的限制式 `role_auth`
--
ALTER TABLE `role_auth`
  ADD CONSTRAINT `FK_5f30e348ec703c557f1256f333a` FOREIGN KEY (`auth_id`) REFERENCES `authorization` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_9e4be4f69e3cd7390336686be0f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `FK_017c44638c80d285dd42221f460` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`),
  ADD CONSTRAINT `FK_76b6353f7dbd941dbb74296265a` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `schedule_change`
--
ALTER TABLE `schedule_change`
  ADD CONSTRAINT `FK_3ec11cbe90769775e82a3edd75f` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`),
  ADD CONSTRAINT `FK_d726966004c4aab14971eba5a2a` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的限制式 `semester_course`
--
ALTER TABLE `semester_course`
  ADD CONSTRAINT `FK_4217fe14088e4af00c0f0150dba` FOREIGN KEY (`cou_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `FK_529a5cb015c6018e9f1a35a4073` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`),
  ADD CONSTRAINT `FK_c1f8edaf8f142e422ae7b760d0a` FOREIGN KEY (`tch_id`) REFERENCES `teacher` (`id`);

--
-- 資料表的限制式 `ta`
--
ALTER TABLE `ta`
  ADD CONSTRAINT `FK_769a8dce3c295f83b50a432ea27` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_a46883fcfd5b924f31bff0f65f0` FOREIGN KEY (`stud_id`) REFERENCES `student` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_fb2e442d14add3cefbdf33c4561` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;
