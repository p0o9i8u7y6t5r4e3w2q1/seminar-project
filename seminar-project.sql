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
-- 資料庫： `test`
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
  `create_time` datetime NOT NULL,
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
('H320700', '資料庫管理'),
('H335700', 'VBA巨集開發與應用');

-- --------------------------------------------------------

--
-- 資料表結構 `enrollment`
--

CREATE TABLE `enrollment` (
  `sc_id` char(9) NOT NULL,
  `stud_id` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `enrollment`
--

INSERT INTO `enrollment` (`sc_id`, `stud_id`) VALUES
('1072H3007', 'H34051128'),
('1072H3115', 'H34051128'),
('1072H3007', 'H34054087'),
('1072H3115', 'H34055041');

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
('B01', '麥克風01', 0, 'B'),
('B02', '麥克風02', 0, 'B'),
('C01', '小蜜蜂01', 0, 'C');

-- --------------------------------------------------------

--
-- 資料表結構 `makeup_course_form`
--

CREATE TABLE `makeup_course_form` (
  `id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `person_id` varchar(9) NOT NULL,
  `sc_id` char(9) NOT NULL,
  `room_id` char(5) NOT NULL,
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
(3, 1),
(4, 1),
(2, 2),
(3, 2),
(4, 2),
(3, 3),
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
  `room_id` char(5) NOT NULL,
  `p_id` char(1) NOT NULL,
  `weekday` tinyint(4) NOT NULL,
  `sc_id` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `schedule_change`
--

CREATE TABLE `schedule_change` (
  `id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `room_id` char(5) NOT NULL,
  `date` date NOT NULL,
  `p_id` char(1) NOT NULL,
  `person_id` varchar(9) NOT NULL,
  `sc_id` char(9) DEFAULT NULL,
  `form_id` char(8) DEFAULT NULL,
  `type` tinyint(4) NOT NULL
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
(107, 2, '2019-02-01', '2019-07-31', '2019-02-18', '2019-07-21');

-- --------------------------------------------------------

--
-- 資料表結構 `semester_course`
--

CREATE TABLE `semester_course` (
  `id` char(9) NOT NULL,
  `year` tinyint(4) NOT NULL,
  `semester` tinyint(4) NOT NULL,
  `dept` char(2) NOT NULL,
  `serial` smallint(6) NOT NULL,
  `cou_id` char(7) NOT NULL,
  `tch_id` char(8) NOT NULL,
  `room_id` char(5) NOT NULL,
  `time` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `semester_course`
--

INSERT INTO `semester_course` (`id`, `year`, `semester`, `dept`, `serial`, `cou_id`, `tch_id`, `room_id`, `time`) VALUES
('1072H3007', 107, 2, 'H3', 7, 'H320300', 'z1000022', '61101', '[1]2-3,[3]2'),
('1072H3115', 107, 2, 'H3', 115, 'H335700', 'z1000020', '61201', '[1]1-3');

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
('z0000001', NULL, '游志琦'),
('z0000002', NULL, '陳賢豪');

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
('D54051365', NULL, '賈柱轎'),
('H34051128', NULL, '黃懿'),
('H34054087', NULL, '蔡函璇'),
('H34055041', NULL, '林佳妤'),
('H34056039', NULL, '趙新宜');

-- --------------------------------------------------------

--
-- 資料表結構 `ta`
--

CREATE TABLE `ta` (
  `stud_id` char(9) NOT NULL,
  `sc_id` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `ta`
--

INSERT INTO `ta` (`stud_id`, `sc_id`) VALUES
('D54051365', '1072H3007');

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
('z1000001', NULL, '高強'),
('z1000002', NULL, '王惠嘉'),
('z1000003', NULL, '利德江'),
('z1000004', NULL, '林清河'),
('z1000005', NULL, '陳梁軒'),
('z1000006', NULL, '呂執中'),
('z1000007', NULL, '王泰裕'),
('z1000008', NULL, '李賢得'),
('z1000009', NULL, '謝中奇'),
('z1000010', NULL, '黃宇翔'),
('z1000011', NULL, '李昇暾'),
('z1000012', NULL, '翁慈宗'),
('z1000013', NULL, '王逸琳'),
('z1000014', NULL, '王維聰'),
('z1000015', NULL, '蔡青志'),
('z1000016', NULL, '張秀雲'),
('z1000017', NULL, '謝佩璇'),
('z1000018', NULL, '林明毅'),
('z1000019', NULL, '胡政宏'),
('z1000020', NULL, '吳政翰'),
('z1000021', NULL, '張裕清'),
('z1000022', NULL, '劉任修');

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
  ADD KEY `booking_equipment_ibfk_2` (`equip_id`);

--
-- 資料表索引 `booking_form`
--
ALTER TABLE `booking_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `start_p_id` (`start_p_id`),
  ADD KEY `end_p_id` (`end_p_id`),
  ADD KEY `room_id` (`room_id`);

--
-- 資料表索引 `card_record`
--
ALTER TABLE `card_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

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
  ADD KEY `stud_id` (`stud_id`);

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
  ADD KEY `start_p_id` (`start_p_id`),
  ADD KEY `end_p_id` (`end_p_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `sc_id` (`sc_id`);

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
  ADD KEY `auth_id` (`auth_id`);

--
-- 資料表索引 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`room_id`,`p_id`,`weekday`),
  ADD KEY `sc_id` (`sc_id`),
  ADD KEY `p_id` (`p_id`);

--
-- 資料表索引 `schedule_change`
--
ALTER TABLE `schedule_change`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `sc_id` (`sc_id`);

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
  ADD KEY `room_id` (`room_id`),
  ADD KEY `cou_id` (`cou_id`,`tch_id`),
  ADD KEY `tch_id` (`tch_id`);

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
  ADD KEY `sc_id` (`sc_id`);

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
  ADD KEY `role_id` (`role_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `booking_form`
--
ALTER TABLE `booking_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `card_record`
--
ALTER TABLE `card_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `makeup_course_form`
--
ALTER TABLE `makeup_course_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `schedule_change`
--
ALTER TABLE `schedule_change`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `alternatecard`
--
ALTER TABLE `alternatecard`
  ADD CONSTRAINT `alternatecard_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的 Constraints `booking_equipment`
--
ALTER TABLE `booking_equipment`
  ADD CONSTRAINT `booking_equipment_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `booking_form` (`id`),
  ADD CONSTRAINT `booking_equipment_ibfk_2` FOREIGN KEY (`equip_id`) REFERENCES `equipment` (`id`);

--
-- 資料表的 Constraints `booking_form`
--
ALTER TABLE `booking_form`
  ADD CONSTRAINT `booking_form_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的 Constraints `card_record`
--
ALTER TABLE `card_record`
  ADD CONSTRAINT `card_record_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的 Constraints `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`),
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`stud_id`) REFERENCES `student` (`id`);

--
-- 資料表的 Constraints `makeup_course_form`
--
ALTER TABLE `makeup_course_form`
  ADD CONSTRAINT `makeup_course_form_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`),
  ADD CONSTRAINT `makeup_course_form_ibfk_2` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`);

--
-- 資料表的 Constraints `role_auth`
--
ALTER TABLE `role_auth`
  ADD CONSTRAINT `role_auth_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `role_auth_ibfk_2` FOREIGN KEY (`auth_id`) REFERENCES `authorization` (`id`);

--
-- 資料表的 Constraints `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`);

--
-- 資料表的 Constraints `schedule_change`
--
ALTER TABLE `schedule_change`
  ADD CONSTRAINT `schedule_change_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`),
  ADD CONSTRAINT `schedule_change_ibfk_2` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`);

--
-- 資料表的 Constraints `semester_course`
--
ALTER TABLE `semester_course`
  ADD CONSTRAINT `semester_course_ibfk_1` FOREIGN KEY (`cou_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `semester_course_ibfk_2` FOREIGN KEY (`tch_id`) REFERENCES `teacher` (`id`),
  ADD CONSTRAINT `semester_course_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `classroom` (`id`);

--
-- 資料表的 Constraints `ta`
--
ALTER TABLE `ta`
  ADD CONSTRAINT `ta_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `ta_ibfk_2` FOREIGN KEY (`sc_id`) REFERENCES `semester_course` (`id`);

--
-- 資料表的 Constraints `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
