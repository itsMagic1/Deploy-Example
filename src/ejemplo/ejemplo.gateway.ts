import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { EjemploService } from './ejemplo.service';
import { CreateEjemploDto } from './dto/create-ejemplo.dto';
import { UpdateEjemploDto } from './dto/update-ejemplo.dto';

@WebSocketGateway()
export class EjemploGateway {
  constructor(private readonly ejemploService: EjemploService) {}

  @SubscribeMessage('createEjemplo')
  create(@MessageBody() createEjemploDto: CreateEjemploDto) {
    console.log(createEjemploDto);
    return this.ejemploService.create(createEjemploDto);
  }

  @SubscribeMessage('findAllEjemplo')
  findAll() {
    return this.ejemploService.findAll();
  }

  @SubscribeMessage('findOneEjemplo')
  findOne(@MessageBody() id: number) {
    return this.ejemploService.findOne(id);
  }

  @SubscribeMessage('updateEjemplo')
  update(@MessageBody() updateEjemploDto: UpdateEjemploDto) {
    return this.ejemploService.update(updateEjemploDto.id, updateEjemploDto);
  }

  @SubscribeMessage('removeEjemplo')
  remove(@MessageBody() id: number) {
    return this.ejemploService.remove(id);
  }
}
