-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 
-- 伺服器版本: 5.7.11
-- PHP 版本： 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `seminar-project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `alternatecard`
--

CREATE TABLE `alternatecard` (
  `id` char(6) NOT NULL,
  `card_uid` char(8) DEFAULT NULL,
  `card_name` varchar(32) NOT NULL,
  `room_id` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表的匯出資料 `alternatecard`
--

INSERT INTO `alternatecard` (`id`, `card_uid`, `room_id`, `card_name`) VALUES
('61101A', 'ROOM101A', '61101', '61101備用卡A'),
('61102A', 'ROOM102A', '61102', '61102備用卡A'),
('61103A', 'ROOM103A', '61103', '61103備用卡A'),
('61104A', 'ROOM104A', '61104', '61104備用卡A'),
('61104B', 'ROOM104B', '61104', '61104備用卡B'),
('61200A', 'ROOM200A', '61200', '61200備用卡A'),
('61201A', 'ROOM201A', '61201', '61201備用卡A'),
('61202A', 'ROOM202A', '61202', '61202備用卡A'),
('61204A', 'ROOM204A', '61204', '61204備用卡A'),
('61206A', 'ROOM206A', '61206', '61206備用卡A'),
('61208A', 'ROOM208A', '61208', '61208備用卡A'),
('61210A', 'ROOM210A', '61210', '61210備用卡A'),
('61306A', 'ROOM306A', '61306', '61306備用卡A'),
('61321A', 'ROOM321A', '61321', '61321備用卡A');

--
-- 資料表結構 `authorization`
--

CREATE TABLE `authorization` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `authorization`
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
  `create_time` datetime(6) NOT NULL,
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
  `room_id` char(5) NOT NULL
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
-- 資料表的匯出資料 `classroom`
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
-- 資料表的匯出資料 `course`
--

INSERT INTO `course` (`id`, `name`) VALUES
('H320300', '計算機程式及應用'),
('H335700', 'VBA巨集開發與應用'),
('H344900', '雲端行動應用');

-- --------------------------------------------------------

--
-- 資料表結構 `enrollment`
--

CREATE TABLE `enrollment` (
  `sc_id` varchar(12) NOT NULL,
  `stud_id` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `enrollment`
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
-- 資料表的匯出資料 `equipment`
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
  `create_time` datetime(6) NOT NULL,
  `person_id` varchar(9) NOT NULL,
  `sc_id` varchar(12) NOT NULL,
  `date` date NOT NULL,
  `start_p_id` char(1) NOT NULL,
  `end_p_id` char(1) NOT NULL,
  `progress` tinyint(4) NOT NULL
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
-- 資料表的匯出資料 `role`
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
-- 資料表的匯出資料 `role_auth`
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
-- 資料表的匯出資料 `schedule`
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
(107, 2, 1, '3', '61201', '1072H335700');

-- --------------------------------------------------------

--
-- 資料表結構 `schedule_change`
--

CREATE TABLE `schedule_change` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) NOT NULL,
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
-- 資料表的匯出資料 `semester`
--

INSERT INTO `semester` (`year`, `semester`, `start_date`, `end_date`, `cou_start_date`, `cou_end_date`) VALUES
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
-- 資料表的匯出資料 `semester_course`
--

INSERT INTO `semester_course` (`id`, `year`, `semester`, `cou_id`, `cou_no`, `tch_id`, `room_id`, `time`) VALUES
('1071H344900', 107, 1, 'H344900', '', 'z1000022', '61201', '[2]6~8'),
('1072H320300', 107, 2, 'H320300', '', 'z1000022', '61101', '[1]2~3,[3]2'),
('1072H335700', 107, 2, 'H335700', '', 'z1000020', '61201', '[1]1~3');

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
-- 資料表的匯出資料 `staff`
--

INSERT INTO `staff` (`id`, `card_uid`, `name`) VALUES
('z0000001', 'ADMIN001', '游志琦'),
('z0000002', 'ADMIN002', '陳賢豪');

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
-- 資料表的匯出資料 `student`
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
-- 資料表的匯出資料 `ta`
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
-- 資料表的匯出資料 `teacher`
--

INSERT INTO `teacher` (`id`, `card_uid`, `name`) VALUES
('z1000001', 'TCH00001', '高強'),
('z1000002', 'TCH00002', '王惠嘉'),
('z1000003', 'TCH00003', '利德江'),
('z1000004', 'TCH00004', '林清河'),
('z1000005', 'TCH00005', '陳梁軒'),
('z1000006', 'TCH00006', '呂執中'),
('z1000007', 'TCH00007', '王泰裕'),
('z1000008', 'TCH00008', '李賢得'),
('z1000009', 'TCH00009', '謝中奇'),
('z1000010', 'TCH00010', '黃宇翔'),
('z1000011', 'TCH00011', '李昇暾'),
('z1000012', 'TCH00012', '翁慈宗'),
('z1000013', 'TCH00013', '王逸琳'),
('z1000014', 'TCH00014', '王維聰'),
('z1000015', 'TCH00015', '蔡青志'),
('z1000016', 'TCH00016', '張秀雲'),
('z1000017', 'TCH00017', '謝佩璇'),
('z1000018', 'TCH00018', '林明毅'),
('z1000019', 'TCH00019', '胡政宏'),
('z1000020', 'TCH00020', '吳政翰'),
('z1000021', 'TCH00021', '張裕清'),
('z1000022', 'TCH00022', '劉任修');

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
-- 資料表的匯出資料 `user`
--

INSERT INTO `user` (`id`, `password`, `name`, `email`, `role_id`) VALUES
('D54051365', '0000', '賈柱轎', 'D54051365@mail.ncku.edu.tw', 1),
('z0000001', '0000', '游志琦', 'grace54@mail.ncku.edu.tw', 4),
('z0000002', '0000', '陳賢豪', 'em53100@email.ncku.edu.tw', 4),
('z1000002', '0000', '王惠嘉', 'hcwang@mail.ncku.edu.tw', 3),
('z1000022', '0000', '劉任修', 'rsliu@mail.ncku.edu.tw', 2);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `alternatecard`
--
ALTER TABLE `alternatecard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

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
  ADD KEY `booking_equipment_ibfk_2` (`equip_id`),
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
  ADD KEY `schedule_ibfk_1` (`room_id`),
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
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `booking_form`
--
ALTER TABLE `booking_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用資料表 AUTO_INCREMENT `card_record`
--
ALTER TABLE `card_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用資料表 AUTO_INCREMENT `makeup_course_form`
--
ALTER TABLE `makeup_course_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用資料表 AUTO_INCREMENT `schedule_change`
--
ALTER TABLE `schedule_change`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
