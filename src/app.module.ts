import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [SharedModule, DatabaseModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
