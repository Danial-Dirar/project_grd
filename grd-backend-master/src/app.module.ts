import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { CommentEntity } from './comment/comment.entity';
import { CommentModule } from './comment/comment.module';
import { RiverModule } from './river/river.module';
import { RiverEntity } from './river/river.entity';
import { EnvEntity, FinancialEntity, GeographicalEntity } from './river/river-st.entity';

@Module({
  imports: [UserModule, CommentModule, RiverModule,
    TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "project_grd",
      entities:[UserEntity, CommentEntity, RiverEntity, GeographicalEntity, FinancialEntity, EnvEntity],
      synchronize: true,
    }),TypeOrmModule.forFeature([])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
