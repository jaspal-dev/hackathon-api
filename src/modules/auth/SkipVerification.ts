import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_SKIP_VARIFICATION = 'isSkipVerification';
export const SkipVerification = (): CustomDecorator<string> =>
  SetMetadata(IS_SKIP_VARIFICATION, true);
