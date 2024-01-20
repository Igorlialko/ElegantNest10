import {applyDecorators} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
import {PaginatedDto} from "./pagination.dto";

export const ApiPaginatedResponse = <TModel extends Function>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          {$ref: getSchemaPath(PaginatedDto)},
          {
            properties: {
              results: {
                type: 'array',
                items: {$ref: getSchemaPath(model)},
              },
            },
          },
        ],
      },
    }),
  );
};