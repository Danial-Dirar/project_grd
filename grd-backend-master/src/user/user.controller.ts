import { Body, Controller, Get, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }

    @Post("/register")
        @UsePipes(new ValidationPipe())
        async register(@Body() data:UserDto): Promise<UserEntity> {
            const mod= await this.userService.register(data);
            console.log(mod);
            if (mod== null) {
                throw new NotFoundException({
                    message: "User not found"
                });
            }
            else {
                return this.userService.register(data);
            }
        }
    
    @Post('/login')
    async login(@Body() data:UserDto): Promise<UserEntity> {
        const user= await this.userService.login(data);
        if (user== null) {
            throw new NotFoundException({
                message: "User not found"
            });
        }
        else {
            return this.userService.login(data);
        }
    }

    @Post("/forgot")
    async forgot(@Body() data:UserDto): Promise<UserEntity> {
        const user= await this.userService.forgotPassword(data);
        if (user== null) {
            throw new NotFoundException({
                message: "User not found"
            });
        }
        else {
            return this.userService.forgotPassword(data);
        }
    }

    
}
