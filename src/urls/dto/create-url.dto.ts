import { PickType } from "@nestjs/mapped-types";
import { Url } from "../entities/url.entity";

export class CreateUrlDto extends PickType(Url, ['name'] as const) { }