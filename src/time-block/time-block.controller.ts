import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TimeBlockDto } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@UsePipes(new ValidationPipe())
@Controller('time-block')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId);
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
		return this.timeBlockService.create(dto, userId);
	}

	@HttpCode(200)
	@Patch('update-order')
	@Auth()
	updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(updateOrderDto.ids);
	}

	@HttpCode(200)
	@Patch(':id')
	@Auth()
	async update(
		@Body() dto: TimeBlockDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string,
	) {
		return this.timeBlockService.update(dto, id, userId);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.timeBlockService.delete(id, userId);
	}
}
