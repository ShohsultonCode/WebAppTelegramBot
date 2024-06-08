import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';




@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('/profile')
  // async profile(@Req() req: any): Promise<Object> {
  //   return this.usersService.getProfile(req);
  // }

}
