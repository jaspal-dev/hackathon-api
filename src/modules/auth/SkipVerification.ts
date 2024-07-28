import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_SKIP_VARIFICATION = 'isSkipVerification';
export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_SKIP_VARIFICATION, true);
