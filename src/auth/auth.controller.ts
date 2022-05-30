import { Body, Controller, Param, Post, Put, UseGuards, ValidationPipe, Res, Get, Req } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { GetUser } from './get-user.decorator';
import { UserProfileDto } from './dto/auth-user.dto';
import { Request, Response } from 'express';
import { NONAME } from 'dns';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //join
    @Post('join')
    join(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
        return this.authService.join(authDto);
    }

    //login
    @Post('login')
    async login(
        @Body(ValidationPipe) authLoginDto: AuthLoginDto,
        @Res() res: Response
        ): Promise<Response> {
            const jwt = await this.authService.login(authLoginDto);
            res.setHeader('Authorization', 'Bearer '+jwt.accessToken);
            res.cookie('jwt',jwt.accessToken, {
                httpOnly: true,
                //Mark cross-site cookies as Secure to allow setting them in cross-site contexts
                secure: true,
                //Indicate whether a cookie is intended to be set in a cross-site context by specifying its SameSite attribute
                sameSite: 'none',
                maxAge: 3600 * 1000 * 2
            });
        return res.send({
            message: 'success'
        });
    }

    //updateUserProfile
    @Put(':email')
    @UseGuards(JwtAuthGuard)
    updateProfile(
        @Param('email') email: string,
        @Body(ValidationPipe) userProfileDto: UserProfileDto,
        @GetUser() authDto: AuthDto): Promise<void> {
            console.log('user:',authDto)
            return this.authService.updateUserProfile(email, userProfileDto, authDto);
        }


    //jwt token strategy test
    @Post('testjwt')
    @UseGuards(JwtAuthGuard)
    testjwt(@GetUser() authDto: AuthDto) {
        console.log('user:',authDto)
    }


    //cookie-jwt test
    @Get('cookie')
    getCookies(
        @Req() req: Request,
        @Res() res: Response,): any {
            const jwt = req.cookies['jwt'];
            return res.send({
                message: 'cookie exist'
            });
        }
}
