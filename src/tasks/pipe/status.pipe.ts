import { BadRequestException, PipeTransform } from '@nestjs/common';

export class updateValidationPipe implements PipeTransform {
    private taskStatus = ['DONE', 'PANDING', 'OPEN'];
    transform(value: any) {
        value.status = value.status.toUpperCase();
        if (value.status) {
            if (!this.taskStatus.includes(value.status)) {
                throw new BadRequestException(`${value.status} is not vaild status`);
            }
        }

        if (value.description === '') {
            throw new BadRequestException(`description must be not empty`);
        }
        if (value.title === '') {
            throw new BadRequestException(`title must be not empty`);
        }

        return value;
    }
}
