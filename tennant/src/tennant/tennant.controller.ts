import { HttpService } from '@nestjs/axios';
import { Headers } from '@nestjs/common';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Response } from 'express';
import { catchError, finalize, firstValueFrom, Observable, Subject, Subscriber, take } from 'rxjs';

@Controller('tennant')
export class TennantController {
  constructor(private httpService: HttpService) {}

  @Get('/test')
  async testExternalAuthorization(
    @Headers() headers,
    @Res({ passthrough: true }) res: Response,
  ) {
      try{
        const response: AxiosResponse | undefined = await firstValueFrom(
            this.httpService
              .post(
                'http://localhost:3000/authorization/verify',
                {},
                {
                  headers: {
                    Authorization: headers.authorization,
                  },
                },
            ),
            {
                defaultValue: undefined
            });
                    
            if (response.status === 200) {
              return {
                message: 'Tennant action AUTHORIZED',
              };
            }
      }
      catch(exception) {
        return {
            message: 'Tennant action NOT AUTHORIZED',
          };
      }    
  }
}
