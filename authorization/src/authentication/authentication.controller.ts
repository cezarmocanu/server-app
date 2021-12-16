import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import { Headers } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { LoginUserDTO } from './dto/login.dto copy';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(
    @Body() body: RegisterUserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Object> {
    const user: User = await this.userService.fromRegisterUserDTO(body);
    const result: User | null = await this.userService.saveUser(user);

    if (!result) {
      throw new ConflictException();
    }

    res.status(HttpStatus.CREATED);

    return {
      message: 'Registered in succesfuly',
    };
  }

  @Post('/login')
  async login(
    @Body() body: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: User | null = await this.userService.findUserByEmail(
      body.email,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect: boolean =
      await this.userService.checkUserLoginPassword(body, user);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    res.status(HttpStatus.OK);
    return {
      message: 'Logged in succesfuly',
      token: this.authenticationService.signJwt({ role: 'user' }),
    };
  }

  @Post('/verify')
  verify(@Headers() headers, @Res({ passthrough: true }) res: Response) {
    if (!this.authenticationService.authorizeRequest(headers)){
      return new UnauthorizedException();
    }
    
    res.status(HttpStatus.OK);
    return {
      message: 'Authorized',
    };
  }
}
