import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class SemesterCourse {

    @PrimaryColumn()
    id: string;

    @Column()
    courseId: string;

    @Column()
    year: number;
    
    @Column()
    semester: number;

    /**
     * 開課系所
     */
    @Column()
    dept: string;

    /**
     * 開課序號
     */
    @Column()
    serial: number;

    /**
     * 課程時間
     */
    @Column()
    time: string;

    @Column()
    teacherId: string;

    @Column()
    classroomId: string;

    @Column()
    roomId: string;
}
