import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  buildMessage,
  isPhoneNumber,
} from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const IsValidPhoneNumber = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const bodyArgs = args.object as any;
          const countryCode = bodyArgs.countryCode;
          const phoneNumber = parsePhoneNumberFromString(
            `${countryCode}${value}`,
          );
          if (countryCode && value && phoneNumber !== undefined) {
            return isPhoneNumber(value, phoneNumber?.country);
          }
          return false;
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return `${eachPrefix}${propertyName} must be a valid in the specified region`;
        }, validationOptions),
      },
    });
  };
};

export default IsValidPhoneNumber;
