import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRespository: Repository<UserEntity>,
    ) {}
    getHello(): string {
        return 'Hello World!';
    }

    async register(data:UserDto): Promise<UserEntity> {
        /*const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
        return this.userRespository.save(data);*/
        return this.userRespository.save({...data,status:'active',role:'Researcher'});
    }

    async login(data:UserDto): Promise<any> {
        const userData= await this.userRespository.findOneBy({email:data.email});
        if (userData != null) {
            //const match : boolean = await bcrypt.compare(data.password, userData.password);
            const match : boolean = data.password == userData.password;
            console.log("Match - "+match)
            if( match){
                return userData;
            }else{
                return null;
            }
        }
    }

    async forgotPassword(data:UserDto): Promise<any> {
        const userData= await this.userRespository.findOneBy({email:data.email});
        if (userData != null) {
            //const match : boolean = await bcrypt.compare(data.password, userData.password);
            const match : boolean = data.email == userData.email;
            if( match){
                await this.userRespository.update({email:data.email},{password:data.password});
                return {message:"Password updated"};
            }else{
                return null;
            }
        }
    }
}

