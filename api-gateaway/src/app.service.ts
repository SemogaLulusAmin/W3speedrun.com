import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { AxiosError } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  private readonly serviceMap = {
    auth: 'http://localhost:3000',
    game: 'http://localhost:3001',
    run: 'http://localhost:3002',
  };

  async proxyRequest(servicePrefix: string, req: Request, targetPath?: string) {
    const targetBase = this.serviceMap[servicePrefix];

    if (!targetBase) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    
    const path = targetPath || req.originalUrl;
    const url = `${targetBase}${path}`;

    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method: req.method,
          url,
          data: req.body,
          headers: {
            Authorization: req.headers.authorization, 
            'Content-Type': req.headers['content-type'] || 'application/json',
          },
        }),
      );

      return { status: response.status, data: response.data };
    } catch (err) {
      const error = err as AxiosError;
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data = error.response?.data || { message: 'Gateway Error' };
      throw new HttpException(data, status);
    }
  }

}