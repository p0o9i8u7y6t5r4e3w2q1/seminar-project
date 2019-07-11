import { Controller, Get, Put, Post } from '@nestjs/common';

@Controller('semester-course')
export class SemesterCourseController {

    /**
     * 新增學期課程
     */
    @Post()
    create() {
        // TODO implement here
    }

    /**
     * 查詢所偶學期課程
     */
    @Get()
    findAll() {
        // TODO implement here
    }

    /**
     * 更新學期課程
     */
    @Put()
    update() {
        // TODO implement here
    }


    /**
     * 刪除一個學期課程
     */
    @Delete()
    delete() {
        // TODO implement here
    }

}
