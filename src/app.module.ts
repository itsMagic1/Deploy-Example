import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OwnerModule } from './Owner/owner.module';
import { CarModule } from './Car/car.module';
import { AgencyModule } from './Agency/agency.module';
import { EjemploModule } from './ejemplo/ejemplo.module';

@Module({
  imports: [
    // Cargar variables de entorno según NODE_ENV (.env.development, .env.production, etc.)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    // Configuración de TypeORM con variables dinámicas
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: 'postgresql://usuario:pass@localhost:5432/db',
        // host: config.get<string>('HOST'),
        // port: config.get<number>('PORTDB'),
        // username: config.get<string>('USERNAMEDB'),
        // password: config.get<string>('PASSWORD'),
        // database: config.get<string>('DATABASE'),
        synchronize: config.get<string>('SYNCHRONIZESYNC') === 'true',
        autoLoadEntities: true,
      }),
    }),

    OwnerModule,
    CarModule,
    AgencyModule,
    EjemploModule,
  ],
})
export class AppModule {}
