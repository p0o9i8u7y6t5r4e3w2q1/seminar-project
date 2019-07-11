import { Column, PrimaryColumn } from 'typeorm';

export class Semester {

    @PrimaryColumn()
    year: number;

    @PrimaryColumn()
    semester: number;

    @Column()
    semStartDate: Date;

    @Column()
    semEndDate: Date;

    @Column()
    courseStartDate: Date;

    @Column()
    courseEndDate: Date;

    /**
     * 確認日期是否在一般上課日期內
     * @param date 
     * @return
     */
    isInCourseDay(date: Date) :  boolean {
        // TODO implement here
        return null;
    }

    /**
     * 確認日期是否在學期範圍內
     * @param date 
     * @return
     */
    isInSemester(date: Date) :  boolean {
        // TODO implement here
        return null;
    }

}
