import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor() {}

    /**
     * 登入
     */
    @Post()
    login() {
        // TODO implement here
    }

    /**
     * 登出
     */
    @Get()
    logout() {
        // TODO implement here
    }

    /**
     * 註冊助教
     */
    @Post()
    signupTA() {
        // TODO implement here
    }

    /**
     * 忘記密碼
     */
    @Post()
    forgetPassword() :  void {
        // TODO implement here
        return null;
    }

    /**
     * 更新個人資料
     */
    @Put()
    update() {
        // TODO implement here
    }

    /**
     * 驗證密碼
     */
    @Post()
    validatePassword() {
        // TODO implement here
    }

    /**
     * 更新密碼
     */
    @Post()
    updatePassword() {
        // TODO implement here
    }
    
    /**
     * 更新角色
     */
    @Put()
    setRole() {
        // TODO implement here
    }
}
