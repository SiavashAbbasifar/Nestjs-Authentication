import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [ConfigModule.forRoot(),AuthModule,JwtModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
  
})
export class AppModule {}
