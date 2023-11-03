import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from 'src/common/jwtcommon.module';
import { User, UserSchema } from './Schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTStrategy } from 'src/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JWTStrategy],
  exports:[JWTStrategy,PassportModule]
})
export class AuthModule {}
