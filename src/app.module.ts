import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/jwtcommon.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/"),
    AuthModule,CommonModule,],
  //controllers: [AppController, AuthController],
  providers: [],
  
})
export class AppModule {}

